import { Body, Controller, Get, Post } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get()
  async listCourses() {
    const client = this.supabase.getClient();
    const { data, error } = await client
      .from('courses')
      .select('id,title,description,created_at')
      .order('id', { ascending: true });

    if (error) return { ok: false, error: error.message };
    return { ok: true, data };
  }

  @Post()
  async createCourse(@Body() body: { title?: string; description?: string }) {
    if (!body?.title) return { ok: false, error: 'title is required' };

    const client = this.supabase.getClient();
    const { data, error } = await client
      .from('courses')
      .insert({ title: body.title, description: body.description ?? null })
      .select('id,title,description,created_at')
      .single();

    if (error) return { ok: false, error: error.message };
    return { ok: true, data };
  }
}
