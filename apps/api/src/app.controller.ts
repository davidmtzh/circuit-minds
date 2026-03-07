import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

@Controller()
export class AppController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get()
  getHello() {
    return 'Hello World!';
  }

  @Get('health')
  health() {
    return { ok: true };
  }

  @Get('db-ping')
  async dbPing() {
    const client = this.supabase.getClient();
    const { data, error } = await client.from('courses').select('id').limit(1);

    // If the table doesn't exist yet, you'll get an error — that's fine for now.
    return {
      ok: !error,
      error: error?.message ?? null,
      hint: error ? 'If this says "relation courses does not exist", create tables next.' : null,
      sample: data ?? null,
    };
  }
}
