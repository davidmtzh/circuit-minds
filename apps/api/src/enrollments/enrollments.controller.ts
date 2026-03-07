import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get()
  async list(@Query('session_id') sessionId?: string) {
    const client = this.supabase.getClient();

    let q = client
      .from('enrollments')
      .select('id,session_id,student_id,created_at')
      .order('created_at', { ascending: true });

    if (sessionId) q = q.eq('session_id', Number(sessionId));

    const { data, error } = await q;
    if (error) return { ok: false, error: error.message };
    return { ok: true, data };
  }

  @Post()
  async enroll(@Body() body: { session_id?: number; student_id?: string }) {
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
}
