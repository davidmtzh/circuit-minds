import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { AdminAuthService } from '../auth/admin-auth.service';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly adminAuth: AdminAuthService,
  ) {}

  @Get()
  async listStudents(@Headers('authorization') authorization: string) {
    await this.adminAuth.requireAdmin(authorization);

    const client = this.supabase.getClient();

    const { data, error } = await client
      .from('profiles')
      .select('id, role, full_name, email, created_at')
      .eq('role', 'student')
      .order('created_at', { ascending: true });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  }

  @Post('create')
  async createStudent(
    @Headers('authorization') authorization: string,
    @Body()
    body: {
      email?: string;
      password?: string;
      full_name?: string;
    },
  ) {
    await this.adminAuth.requireAdmin(authorization);

    if (!body?.email) {
      return { ok: false, error: 'email is required' };
    }

    if (!body?.password) {
      return { ok: false, error: 'password is required' };
    }

    if (!body?.full_name) {
      return { ok: false, error: 'full_name is required' };
    }

    const client = this.supabase.getClient();

    const { data: authData, error: authError } = await client.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true,
    });

    if (authError || !authData.user) {
      return { ok: false, error: authError?.message || 'Failed to create auth user' };
    }

    const user = authData.user;

    const { data: profile, error: profileError } = await client
      .from('profiles')
      .insert({
        id: user.id,
        role: 'student',
        full_name: body.full_name,
        email: body.email,
      })
      .select('id, role, full_name, email, created_at')
      .single();

    if (profileError) {
      await client.auth.admin.deleteUser(user.id);
      return { ok: false, error: profileError.message };
    }

    return { ok: true, data: profile };
  }
}