'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Student = {
  id: string;
  role: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
};

type ApiResponse<T> = {
  ok: boolean;
  data: T;
  error?: string;
};

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  async function fetchStudents() {
    if (!baseUrl) return;

    const headers = await getAuthHeaders();
    const res = await fetch(`${baseUrl}/students`, { headers });
    const json: ApiResponse<Student[]> = await res.json();

    if (!res.ok || !json.ok) {
      throw new Error(json.error || `HTTP ${res.status}`);
    }

    setStudents(json.data ?? []);
  }

  useEffect(() => {
    async function loadData() {
      try {
        if (!baseUrl) {
          setError('NEXT_PUBLIC_API_URL is not set');
          return;
        }

        await fetchStudents();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [baseUrl]);

  async function handleCreateStudent(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!baseUrl) {
      setError('NEXT_PUBLIC_API_URL is not set');
      return;
    }

    if (!fullName || !email || !password) {
      setError('Please complete all required fields.');
      return;
    }

    try {
      setSubmitting(true);

      const headers = await getAuthHeaders();
      const res = await fetch(`${baseUrl}/students/create`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || `HTTP ${res.status}`);
      }

      setMessage('Student created successfully.');
      setFullName('');
      setEmail('');
      setPassword('');
      await fetchStudents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Admin Students</h1>
      <p className="mt-2 text-gray-600">
        Create student accounts and review current student records.
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

      <form onSubmit={handleCreateStudent} className="mt-8 max-w-2xl space-y-6 rounded-xl border p-6 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Student full name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="student@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Temporary Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Temporary password"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg border bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {submitting ? 'Creating...' : 'Create Student'}
        </button>
      </form>

      <section className="mt-10 rounded-xl border p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Current Students</h2>

        {loading ? (
          <p className="mt-6">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="mt-6 text-gray-600">No students found.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Email</th>
                  <th className="py-3 pr-4">Role</th>
                  <th className="py-3 pr-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="py-3 pr-4">{student.full_name || 'No name'}</td>
                    <td className="py-3 pr-4">{student.email || 'No email'}</td>
                    <td className="py-3 pr-4">{student.role}</td>
                    <td className="py-3 pr-4">
                      {new Date(student.created_at).toLocaleString()}
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
