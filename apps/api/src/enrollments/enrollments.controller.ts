import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { AdminAuthService } from '../auth/admin-auth.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly adminAuth: AdminAuthService,
  ) {}

  @Get()
  async list(
    @Headers('authorization') authorization: string,
    @Query('session_id') sessionId?: string,
    @Query('student_id') studentId?: string,
  ) {
    await this.adminAuth.requireAdmin(authorization);

    const client = this.supabase.getClient();

    let q = client
      .from('enrollments')
      .select(`
        id,
        session_id,
        student_id,
        created_at,
        profiles:student_id (
          id,
          full_name,
          email
        ),
        class_sessions:session_id (
          id,
          starts_at,
          ends_at,
          courses:course_id (
            id,
            title
          )
        )
      `)
      .order('created_at', { ascending: true });

    if (sessionId) q = q.eq('session_id', Number(sessionId));
    if (studentId) q = q.eq('student_id', studentId);

    const { data, error } = await q;

    if (error) return { ok: false, error: error.message };

    const formatted = (data ?? []).map((row: any) => {
      const student =
        row.profiles?.full_name ||
        row.profiles?.email ||
        'Unknown student';

      const courseTitle = row.class_sessions?.courses?.title || 'Unknown course';
      const startTime = row.class_sessions?.starts_at || '';

      return {
        id: row.id,
        session_id: row.session_id,
        student_id: row.student_id,
        student_name: student,
        course_title: courseTitle,
        session_label: `${courseTitle} - ${startTime}`.trim(),
        created_at: row.created_at,
      };
    });

    return { ok: true, data: formatted };
  }

  @Post()
  async enroll(
    @Headers('authorization') authorization: string,
    @Body() body: { session_id?: number; student_id?: string },
  ) {
    await this.adminAuth.requireAdmin(authorization);

    if (!body?.session_id) return { ok: false, error: 'session_id is required' };
    if (!body?.student_id) return { ok: false, error: 'student_id is required (uuid)' };

    const client = this.supabase.getClient();
    const { data, error } = await client
      .from('enrollments')
      .insert({ session_id: body.session_id, student_id: body.student_id })
      .select('id,session_id,student_id,created_at')
      .single();

    if (error) return { ok: false, error: error.message };
    return { ok: true, data };
  }

  @Delete(':id')
  async remove(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
  ) {
    await this.adminAuth.requireAdmin(authorization);

    const client = this.supabase.getClient();

    const { error } = await client
      .from('enrollments')
      .delete()
      .eq('id', Number(id));

    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }
}