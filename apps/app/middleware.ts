import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { updateSession } from './lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Refresh or synchronize the Supabase auth session for this request.
  // This helps keep the user's session cookies up to date.
  const response = await updateSession(request)

  // Create a Supabase server client using the request cookies.
  // This allows us to read the currently authenticated user inside middleware.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Read all cookies from the incoming request.
        getAll() {
          return request.cookies.getAll()
        },
        // No cookie updates are written here because session updates
        // are already handled inside updateSession().
        setAll() {},
      },
    }
  )

  // Ask Supabase for the current authenticated user, if one exists.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get the current request path so we can decide whether
  // the user should be allowed to continue or be redirected.
  const { pathname } = request.nextUrl

  // Pages meant for authentication only.
  // Logged-in users should not stay on these pages.
  const isAuthPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/auth')

  // Pages that require the user to be logged in.
  const isProtectedPage =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/student') ||
    pathname.startsWith('/teacher') ||
    pathname.startsWith('/admin')

  // If the user is not logged in and tries to access a protected page,
  // send them to the login page.
  if (!user && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If the user is already logged in and tries to visit a login/auth page,
  // send them to the dashboard instead.
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If no redirect is needed, continue with the updated session response.
  return response
}

export const config = {
  matcher: [
    // Run this middleware on all routes except:
    // - Next.js static files
    // - Next.js image optimization files
    // - favicon
    // - common image file requests
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}