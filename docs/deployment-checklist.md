# Circuit Minds Deployment Checklist

## apps/web (Vercel)
- Root Directory: apps/web
- Framework: Next.js
- Env vars: none currently required

## apps/app (Vercel)
- Root Directory: apps/app
- Framework: Next.js
- Env vars:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - NEXT_PUBLIC_API_URL

## apps/api (Railway)
- Root Directory: apps/api
- Build command: pnpm build
- Start command: pnpm start:prod
- Env vars:
  - SUPABASE_URL
  - SUPABASE_SERVICE_ROLE_KEY
  - PORT

## Before production deploy
- Replace localhost CORS origin with deployed portal URL
- Set NEXT_PUBLIC_API_URL to Railway production URL
- Confirm admin can create student
- Confirm admin can create session
- Confirm admin can create enrollment
- Confirm student can log in and view classes
- Remove signup references from login flow
- Replace hero 3D placeholder with intro video
- Upload/finish lab recordings

## Planned production routing
- www.domain.com -> apps/web
- portal.domain.com -> apps/app
- api domain or Railway URL -> apps/api
