'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.14),transparent_24%),radial-gradient(circle_at_left_center,rgba(34,211,238,0.14),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.08]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10 md:px-10 lg:px-12">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_80px_rgba(34,211,238,0.06)] backdrop-blur sm:p-10">
          <div className="mb-8 flex items-center gap-3">
            <Image
              src="/circuit-minds-logo.png"
              alt="Circuit Minds logo"
              width={64}
              height={64}
              className="h-14 w-14 object-contain drop-shadow-[0_0_18px_rgba(34,211,238,0.22)]"
              priority
            />

            <div>
              <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Circuit Minds
              </p>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">
                Academy
              </p>
            </div>
          </div>

          <div className="mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">
            Student Portal
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-3 text-base leading-7 text-white/65">
            Sign in to access your classes, materials, and academy dashboard.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/85">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/40 focus:bg-white/[0.06]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/85">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/40 focus:bg-white/[0.06]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-[#07111f] shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-cyan-300/80 transition hover:text-cyan-200"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}