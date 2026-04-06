import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '../dashboard/logout-button'

type TeacherCourseRow = {
  id: number
  title: string | null
  description: string | null
}

type TeacherSessionRow = {
  id: number
  course_id: number
  starts_at: string
  ends_at: string
  max_students: number
  teacher_id: string | null
  courses: TeacherCourseRow[] | null
}

export const dynamic = 'force-dynamic'

export default async function TeacherPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    redirect('/login')
  }

  if (profile.role !== 'teacher') {
    redirect('/dashboard')
  }

  const { data: sessions, error: sessionsError } = await supabase
    .from('class_sessions')
    .select(`
      id,
      course_id,
      starts_at,
      ends_at,
      max_students,
      teacher_id,
      courses (
        id,
        title,
        description
      )
    `)
    .eq('teacher_id', user.id)
    .order('starts_at', { ascending: true })

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto rounded-2xl border p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Welcome, {profile.full_name || user.email}
            </p>
          </div>

          <LogoutButton />
        </div>

        <div className="rounded-xl border p-4 mt-8">
          <h2 className="text-xl font-semibold mb-2">My Sessions</h2>
          <p className="text-sm text-gray-600 mb-4">
            These are the sessions currently assigned to you.
          </p>

          {sessionsError && (
            <p className="text-sm text-red-600">
              Error loading sessions: {sessionsError.message}
            </p>
          )}

          {!sessionsError && (!sessions || sessions.length === 0) && (
            <p className="text-sm text-gray-600">
              No sessions have been assigned to you yet.
            </p>
          )}

            {!sessionsError && sessions && sessions.length > 0 && (
      <div className="space-y-4">
        {(sessions as TeacherSessionRow[]).map((session) => {
          const course = session.courses?.[0] ?? null

          return (
            <div key={session.id} className="rounded-xl border p-4">
              <h3 className="text-lg font-semibold">
                {course?.title || `Session #${session.id}`}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {course?.description || 'No description available.'}
              </p>

              <div className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                <p>
                  <strong>Starts:</strong>{' '}
                  {session.starts_at
                    ? new Date(session.starts_at).toLocaleString()
                    : 'Not set'}
                </p>
                <p>
                  <strong>Ends:</strong>{' '}
                  {session.ends_at
                    ? new Date(session.ends_at).toLocaleString()
                    : 'Not set'}
                </p>
                <p>
                  <strong>Max students:</strong> {session.max_students ?? 'N/A'}
                </p>
                <p>
                  <strong>Session ID:</strong> {session.id}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    )}
        </div>
      </div>
    </main>
  )
}