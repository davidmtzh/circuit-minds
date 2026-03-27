import { createClient } from '@/lib/supabase/server';
import LogoutButton from '../dashboard/logout-button';

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user!.id)
    .single();

  const tools = [
    {
      title: 'Create Student',
      description: 'Create student login accounts and view current student records.',
      href: '/admin/students',
    },
    {
      title: 'Manage Sessions',
      description: 'Create and review the recurring 6-week course cohorts.',
      href: '/admin/sessions',
    },
    {
      title: 'Manage Enrollments',
      description: 'Register students into available course sessions.',
      href: '/admin/enrollments',
    },
  ];

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto rounded-2xl border p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Welcome, {profile?.full_name || user?.email}
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="rounded-xl border p-5 shadow-sm transition hover:bg-gray-50"
            >
              <h2 className="text-lg font-semibold">{tool.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{tool.description}</p>
            </a>
          ))}
        </div>

        <div className="mt-8">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
