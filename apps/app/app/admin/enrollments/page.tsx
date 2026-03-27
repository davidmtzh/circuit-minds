'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Student = {
  id: string;
  role: string;
  full_name: string | null;
  created_at: string;
};

type Session = {
  id: number;
  course_id: number;
  starts_at: string;
  ends_at: string;
  max_students: number;
  created_at: string;
};

type Enrollment = {
  id: number;
  session_id: number;
  student_id: string;
  student_name: string;
  course_title: string;
  session_label: string;
  created_at: string;
};

type ApiResponse<T> = {
  ok: boolean;
  data: T;
  error?: string;
};

export default function AdminEnrollmentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);
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

  async function fetchEnrollments() {
    try {
      if (!baseUrl) {
        setError('NEXT_PUBLIC_API_URL is not set');
        return;
      }

      setLoadingEnrollments(true);

      const headers = await getAuthHeaders();
      const res = await fetch(`${baseUrl}/enrollments`, {
        headers,
      });

      if (!res.ok) throw new Error(`Enrollments HTTP ${res.status}`);

      const json: ApiResponse<Enrollment[]> = await res.json();
      if (!json.ok) throw new Error(json.error || 'Failed to load enrollments');

      setEnrollments(json.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoadingEnrollments(false);
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        if (!baseUrl) {
          setError('NEXT_PUBLIC_API_URL is not set');
          return;
        }

        const headers = await getAuthHeaders();

        const [studentsRes, sessionsRes, enrollmentsRes] = await Promise.all([
          fetch(`${baseUrl}/students`, { headers }),
          fetch(`${baseUrl}/sessions`, { headers }),
          fetch(`${baseUrl}/enrollments`, { headers }),
        ]);

        if (!studentsRes.ok) throw new Error(`Students HTTP ${studentsRes.status}`);
        if (!sessionsRes.ok) throw new Error(`Sessions HTTP ${sessionsRes.status}`);
        if (!enrollmentsRes.ok) throw new Error(`Enrollments HTTP ${enrollmentsRes.status}`);

        const studentsJson: ApiResponse<Student[]> = await studentsRes.json();
        const sessionsJson: ApiResponse<Session[]> = await sessionsRes.json();
        const enrollmentsJson: ApiResponse<Enrollment[]> = await enrollmentsRes.json();

        if (!studentsJson.ok) throw new Error(studentsJson.error || 'Failed to load students');
        if (!sessionsJson.ok) throw new Error(sessionsJson.error || 'Failed to load sessions');
        if (!enrollmentsJson.ok) throw new Error(enrollmentsJson.error || 'Failed to load enrollments');

        setStudents(studentsJson.data ?? []);
        setSessions(sessionsJson.data ?? []);
        setEnrollments(enrollmentsJson.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoadingEnrollments(false);
      }
    }

    loadData();
  }, [baseUrl]);

  async function handleEnroll(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!baseUrl) {
      setError('NEXT_PUBLIC_API_URL is not set');
      return;
    }

    if (!selectedStudent || !selectedSession) {
      setError('Please select both a student and a session.');
      return;
    }

    try {
      setSubmitting(true);

      const headers = await getAuthHeaders();
      const res = await fetch(`${baseUrl}/enrollments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          student_id: selectedStudent,
          session_id: Number(selectedSession),
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || `HTTP ${res.status}`);
      }

      setMessage('Student enrolled successfully.');
      setSelectedStudent('');
      setSelectedSession('');
      await fetchEnrollments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRemoveEnrollment(id: number) {
    setMessage(null);
    setError(null);

    if (!baseUrl) {
      setError('NEXT_PUBLIC_API_URL is not set');
      return;
    }

    const confirmed = window.confirm('Remove this enrollment?');
    if (!confirmed) return;

    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${baseUrl}/enrollments/${id}`, {
        method: 'DELETE',
        headers,
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || `HTTP ${res.status}`);
      }

      setMessage('Enrollment removed successfully.');
      await fetchEnrollments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Admin Enrollment</h1>
      <p className="mt-2 text-gray-600">
        Register a student into a scheduled class session.
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

      <form onSubmit={handleEnroll} className="mt-8 max-w-xl space-y-6 rounded-xl border p-6 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-medium">Student</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.full_name || student.id}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Session</label>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select a session</option>
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                Session #{session.id} — Course {session.course_id} —{' '}
                {new Date(session.starts_at).toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg border bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {submitting ? 'Enrolling...' : 'Enroll Student'}
        </button>
      </form>

      <section className="mt-10 rounded-xl border p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Current Enrollments</h2>
        <p className="mt-2 text-sm text-gray-600">
          Review and manage current student enrollments.
        </p>

        {loadingEnrollments ? (
          <p className="mt-6">Loading enrollments...</p>
        ) : enrollments.length === 0 ? (
          <p className="mt-6 text-gray-600">No enrollments found.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 pr-4">Student</th>
                  <th className="py-3 pr-4">Course</th>
                  <th className="py-3 pr-4">Session</th>
                  <th className="py-3 pr-4">Enrolled At</th>
                  <th className="py-3 pr-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="border-b">
                    <td className="py-3 pr-4">{enrollment.student_name}</td>
                    <td className="py-3 pr-4">{enrollment.course_title}</td>
                    <td className="py-3 pr-4">{enrollment.session_label}</td>
                    <td className="py-3 pr-4">
                      {new Date(enrollment.created_at).toLocaleString()}
                    </td>
                    <td className="py-3 pr-4">
                      <button
                        type="button"
                        onClick={() => handleRemoveEnrollment(enrollment.id)}
                        className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </td>
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