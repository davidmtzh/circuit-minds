import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { SupabaseService } from '../supabase/supabase.service'

@Injectable()
export class AdminAuthService {
  constructor(private readonly supabase: SupabaseService) {}

  async requireAdmin(authHeader?: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header')
    }

    const token = authHeader.replace('Bearer ', '').trim()
    const client = this.supabase.getClient()

    const {
      data: { user },
      error: userError,
    } = await client.auth.getUser(token)

    if (userError || !user) {
      throw new UnauthorizedException('Invalid or expired token')
    }

    const { data: profile, error: profileError } = await client
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      throw new UnauthorizedException('Profile not found')
    }

    if (profile.role !== 'admin') {
      throw new ForbiddenException('Admin access required')
    }

    return user
  }
}
