import Link from 'next/link';

function AcademyLogo() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.14)]">
        <svg
          viewBox="0 0 64 64"
          className="h-8 w-8 text-cyan-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M32 10L48 18V32C48 43 41 51 32 54C23 51 16 43 16 32V18L32 10Z"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M24 30L29 35L40 24"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div>
        <p className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Circuit Minds
        </p>
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
          Academy
        </p>
      </div>
    </div>
  );
}

export default function CircuitHero() {
  return (
    <section className="relative overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_24%),radial-gradient(circle_at_left_center,rgba(34,211,238,0.14),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.08]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-10 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <AcademyLogo />

          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            Student Login
          </Link>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">
              Hands-On STEM Academy
            </div>

            <h1 className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              Circuit Minds Academy
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              A premium, project-based learning experience where students build
              real technical confidence through electronics and game design.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/58">
              Designed for curious students who learn best by creating, testing,
              and building step by step in a structured academy environment.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#programs"
                  style={{ color: '#07111f' }}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 font-semibold shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition hover:scale-[1.02]"
                >
                  Explore Programs
                </a>
              <a
                href="#about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 font-semibold text-white/90 backdrop-blur transition hover:scale-[1.02] hover:bg-white/10"
              >
                About the Academy
              </a>
            </div>

<div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
  {[
    ['2 Programs', 'Focused tracks'],
    ['12 Labs', 'Per course'],
    ['Small Groups', 'Guided learning'],
  ].map(([title, subtitle]) => (
    <div
      key={title}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-cyan-300/30 hover:bg-white/[0.07] hover:shadow-[0_14px_40px_rgba(34,211,238,0.12)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-300/0 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-cyan-400/[0.05] group-hover:via-cyan-300/[0.03]" />

      <div className="relative z-10">
        <p className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-cyan-200">
          {title}
        </p>
        <p className="mt-1 text-sm text-white/60 transition-colors duration-300 group-hover:text-white/80">
          {subtitle}
        </p>
      </div>
    </div>
  ))}
</div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_80px_rgba(34,211,238,0.06)] backdrop-blur">
              <div className="rounded-[1.75rem] border border-cyan-400/15 bg-[linear-gradient(145deg,rgba(8,20,42,0.98),rgba(7,13,28,0.98))] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
                  Academy Snapshot
                </p>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm text-white/55">Primary Focus</p>
                    <p className="mt-2 text-xl font-semibold">
                      Electronics + Intro to Game Design
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-cyan-400/[0.08] p-5">
                      <p className="text-sm text-cyan-100/70">Course Structure</p>
                      <p className="mt-2 text-2xl font-bold text-white">
                        12 Labs
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-amber-400/[0.08] p-5">
                      <p className="text-sm text-amber-100/70">Learning Format</p>
                      <p className="mt-2 text-2xl font-bold text-white">
                        Guided Cohorts
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm text-white/55">Built For</p>
                    <p className="mt-2 text-base leading-7 text-white/78">
                      Students who want hands-on technical learning with real
                      projects, clear progression, and a more academy-style
                      experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}