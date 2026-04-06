import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '../dashboard/logout-button'

export const dynamic = 'force-dynamic'

type CourseRow = {
  id: number
  title: string | null
  description: string | null
}

type ClassSessionRow = {
  id: number
  course_id: number
  starts_at: string
  ends_at: string
  max_students: number
  courses: CourseRow[] | null
}

type EnrollmentRow = {
  id: number
  session_id: number
  student_id: string
  created_at: string
  class_sessions: ClassSessionRow[] | null
}

export default async function StudentPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    redirect('/login')
  }

  if (profile.role !== 'student') {
    redirect('/dashboard')
  }

  const { data: enrollments, error: enrollmentsError } = await supabase
    .from('enrollments')
    .select(`
      id,
      session_id,
      student_id,
      created_at,
      class_sessions (
        id,
        course_id,
        starts_at,
        ends_at,
        max_students,
        courses (
          id,
          title,
          description
        )
      )
    `)
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Classes</h1>
              <p className="mt-2 text-gray-600">
                Welcome, {profile.full_name || user.email}.
              </p>
            </div>

            <LogoutButton />
          </div>

          <section className="mt-8 rounded-xl border p-4">
            <h2 className="text-xl font-semibold mb-2">Current Enrollments</h2>
            <p className="text-sm text-gray-600 mb-4">
              Here are the class sessions you are currently enrolled in.
            </p>

            {enrollmentsError && (
              <p className="text-sm text-red-600">
                Error loading enrollments: {enrollmentsError.message}
              </p>
            )}

            {!enrollmentsError && (!enrollments || enrollments.length === 0) && (
              <p className="text-sm text-gray-600">
                You are not enrolled in any sessions yet.
              </p>
            )}

            {!enrollmentsError && enrollments && enrollments.length > 0 && (
              <div className="space-y-4">
                {(enrollments as EnrollmentRow[]).map((enrollment) => {
                  const session = enrollment.class_sessions?.[0] ?? null
                  const course = session?.courses?.[0] ?? null

                  return (
                    <div key={enrollment.id} className="rounded-xl border p-4">
                      <h3 className="text-lg font-semibold">
                        {course?.title || `Session #${enrollment.session_id}`}
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        {course?.description || 'No description available.'}
                      </p>

                      <div className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                        <p>
                          <strong>Starts:</strong>{' '}
                          {session?.starts_at
                            ? new Date(session.starts_at).toLocaleString()
                            : 'Not set'}
                        </p>
                        <p>
                          <strong>Ends:</strong>{' '}
                          {session?.ends_at
                            ? new Date(session.ends_at).toLocaleString()
                            : 'Not set'}
                        </p>
                        <p>
                          <strong>Max students:</strong>{' '}
                          {session?.max_students ?? 'N/A'}
                        </p>
                        <p>
                          <strong>Session ID:</strong> {enrollment.session_id}
                        </p>
                        <p>
                          <strong>Enrolled At:</strong>{' '}
                          {new Date(enrollment.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}