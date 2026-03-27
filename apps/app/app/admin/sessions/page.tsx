'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Course = {
  id: number;
  title: string;
  description?: string | null;
  created_at?: string;
};

type Session = {
  id: number;
  course_id: number;
  starts_at: string;
  ends_at: string;
  max_students: number;
  created_at: string;
};

type ApiResponse<T> = {
  ok: boolean;
  data: T;
  error?: string;
};

export default function AdminSessionsPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [courseId, setCourseId] = useState('');
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [maxStudents, setMaxStudents] = useState('8');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async function getAuthHeaders() {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token ?? ''}`,
    };
  }

  async function fetchSessions() {
    if (!baseUrl) return;

    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/sessions`, { headers });
    const json: ApiResponse<Session[]> = await res.json();

    if (!res.ok || !json.ok) {
      throw new Error(json.error || `HTTP ${res.status}`);
    }

    setSessions(json.data ?? []);
  }

  useEffect(() => {
    async function loadData() {
      try {
        if (!baseUrl) {
          setError('NEXT_PUBLIC_API_URL is not set');
          return;
        }

        const headers = await getAuthHeaders();

        const [coursesRes, sessionsRes] = await Promise.all([
          fetch(`${baseUrl}/courses`, { headers }),
          fetch(`${baseUrl}/sessions`, { headers }),
        ]);

        const coursesJson: ApiResponse<Course[]> = await coursesRes.json();
        const sessionsJson: ApiResponse<Session[]> = await sessionsRes.json();

        if (!coursesRes.ok || !coursesJson.ok) {
          throw new Error(coursesJson.error || `Courses HTTP ${coursesRes.status}`);
        }

        if (!sessionsRes.ok || !sessionsJson.ok) {
          throw new Error(sessionsJson.error || `Sessions HTTP ${sessionsRes.status}`);
        }

        setCourses(coursesJson.data ?? []);
        setSessions(sessionsJson.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [baseUrl]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!baseUrl) {
      setError('NEXT_PUBLIC_API_URL is not set');
      return;
    }

    if (!courseId || !startsAt || !endsAt) {
      setError('Please complete all required fields.');
      return;
    }

    try {
      setSubmitting(true);

      const headers = await getAuthHeaders();
      const res = await fetch(`${baseUrl}/sessions`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          course_id: Number(courseId),
          starts_at: startsAt,
          ends_at: endsAt,
          max_students: Number(maxStudents || '8'),
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || `HTTP ${res.status}`);
      }

      setMessage('Session created successfully.');
      setCourseId('');
      setStartsAt('');
      setEndsAt('');
      setMaxStudents('8');
      await fetchSessions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  }

  function getCourseTitle(id: number) {
    return courses.find((course) => course.id === id)?.title || `Course ${id}`;
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Admin Sessions</h1>
      <p className="mt-2 text-gray-600">
        Create and review recurring 6-week course cohorts.
      </p>

      {error && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          Error: {error}
        </div>
      )}

      {message && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 p-4 text-green-700">
          {message}
        </div>
      )}

      <form onSubmit={handleCreate} className="mt-8 max-w-2xl space-y-6 rounded-xl border p-6 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-medium">Course</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Start Date & Time</label>
          <input
            type="datetime-local"
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">End Date & Time</label>
          <input
            type="datetime-local"
            value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Max Students</label>
          <input
            type="number"
            min="1"
            value={maxStudents}
            onChange={(e) => setMaxStudents(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg border bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {submitting ? 'Creating...' : 'Create Session'}
        </button>
      </form>

      <section className="mt-10 rounded-xl border p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Current Sessions</h2>

        {loading ? (
          <p className="mt-6">Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p className="mt-6 text-gray-600">No sessions found.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 pr-4">Course</th>
                  <th className="py-3 pr-4">Starts</th>
                  <th className="py-3 pr-4">Ends</th>
                  <th className="py-3 pr-4">Max Students</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session.id} className="border-b">
                    <td className="py-3 pr-4">{getCourseTitle(session.course_id)}</td>
                    <td className="py-3 pr-4">
                      {new Date(session.starts_at).toLocaleString()}
                    </td>
                    <td className="py-3 pr-4">
                      {new Date(session.ends_at).toLocaleString()}
                    </td>
                    <td className="py-3 pr-4">{session.max_students}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
