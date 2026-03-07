'use client';

import { useEffect, useState } from 'react';

type HealthResponse = { ok: boolean };

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      setError('NEXT_PUBLIC_API_URL is not set');
      return;
    }

    fetch(`${baseUrl}/health`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as HealthResponse;
      })
      .then(setHealth)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Circuit Minds — App Portal</h1>

      <div className="mt-6 rounded-xl border p-4">
        <h2 className="text-xl font-semibold">API Connectivity Test</h2>

        {error && (
          <p className="mt-2 text-red-600">
            Error: {error}
          </p>
        )}

        {!error && !health && <p className="mt-2">Checking API...</p>}

        {health && (
          <p className="mt-2">
            API status: <span className="font-semibold">{health.ok ? 'OK ✅' : 'NOT OK ❌'}</span>
          </p>
        )}

        <p className="mt-2 text-sm opacity-70">
          Base URL: {process.env.NEXT_PUBLIC_API_URL}
        </p>
      </div>
    </main>
  );
}
