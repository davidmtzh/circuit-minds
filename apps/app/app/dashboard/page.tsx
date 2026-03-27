import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .maybeSingle()

  if (profileError) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto rounded-2xl border p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Dashboard Debug</h1>
          <p>Profile error: {profileError.message}</p>
          <p>User ID: {user.id}</p>
        </div>
      </main>
    )
  }

  if (!profile) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto rounded-2xl border p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Dashboard Debug</h1>
          <p>No profile found for this user.</p>
          <p>User ID: {user.id}</p>
        </div>
      </main>
    )
  }

  if (profile.role === 'admin') {
    redirect('/admin')
  }

  if (profile.role === 'teacher') {
    redirect('/teacher')
  }

  if (profile.role === 'student') {
    redirect('/student')
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto rounded-2xl border p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Dashboard Debug</h1>
        <p>Role was not recognized.</p>
        <p>User ID: {user.id}</p>
        <p>Role: {String(profile.role)}</p>
        <p>Name: {profile.full_name ?? 'No name'}</p>
      </div>
    </main>
  )
}