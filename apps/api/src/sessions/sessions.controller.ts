import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get()
  async list(@Query('course_id') courseId?: string) {
    const client = this.supabase.getClient();

    let q = client
      .from('class_sessions')
      .select('id,course_id,starts_at,ends_at,max_students,created_at')
      .order('starts_at', { ascending: true });

    if (courseId) q = q.eq('course_id', Number(courseId));

    const { data, error } = await q;
    if (error) return { ok: false, error: error.message };
    return { ok: true, data };
  }

  @Post()
  async create(@Body() body: {
    course_id?: number;
    starts_at?: string;
    ends_at?: string;
    max_students?: number;
  }) {
    if (!body?.course_id) return { ok: false, error: 'course_id is required' };
    if (!body?.starts_at) return { ok: false, error: 'starts_at is required' };
    if (!body?.ends_at) return { ok: false, error: 'ends_at is required' };

    const client = this.supabase.getClient();
    const { data, error } = await client
      .from('class_sessions')
      .insert({
        course_id: body.course_id,
        starts_at: body.starts_at,
        ends_at: body.ends_at,
        max_students: body.max_students ?? 8,
      })
      .select('id,course_id,starts_at,ends_at,max_students,created_at')
      .single();

    if (error) return { ok: false, error: error.message };
    return { ok: true, data };
  }
}
