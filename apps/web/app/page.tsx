import CircuitHero from '@/components/hero/CircuitHero';

const courses = [
  {
    title: 'Electronics 101',
    description:
      'Students explore circuits, components, and hands-on electronics through guided lab projects designed to build confidence and technical intuition.',
  },
  {
    title: 'Robotics 101',
    description:
      'Students learn the foundations of robotics, logic, and problem solving by building and experimenting with structured lab-based projects.',
  },
];

const programHighlights = [
  '2 focused STEM courses',
  '12 guided labs per course',
  '6-week structured format',
  'Hands-on project-based learning',
];

export default function Home() {
  return (
    <main className="bg-[#050816] text-white">
      <CircuitHero />

      <section
        id="programs"
        className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-12"
      >
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
            Programs
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Structured STEM programs built around real projects.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/65">
            Circuit Minds offers a focused learning experience through two
            recurring hands-on courses. Each course runs in a 6-week format and
            includes 12 labs designed to help students build real skills in
            electronics, robotics, and technical problem solving.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur"
            >
              <h3 className="text-2xl font-semibold">{course.title}</h3>
              <p className="mt-4 text-white/65 leading-7">{course.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-12"
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur sm:p-10">
          <p className="text-sm uppercase tracking-[0.24em] text-violet-300/80">
            How It Works
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            A simple format designed for consistency and progress.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programHighlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-lg font-semibold">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/65">
            Instead of overwhelming students with too many paths at once,
            Circuit Minds focuses on repeatable, high-quality programs that can
            be taught clearly, improved over time, and delivered through a
            premium small-group learning experience.
          </p>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-7xl px-6 pb-28 md:px-10 lg:px-12"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur sm:p-10">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
              About
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A hands-on STEM academy built to make technical learning feel real.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/65">
              Circuit Minds is designed for students who learn best by building,
              experimenting, and seeing ideas come to life. The goal is not just
              to watch or memorize, but to create, troubleshoot, and think like
              real makers and future engineers.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 to-violet-400/10 p-8 backdrop-blur sm:p-10">
            <p className="text-sm uppercase tracking-[0.24em] text-violet-300/80">
              Get Started
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to explore Circuit Minds?
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/65">
              Learn more about the program, upcoming course availability, and
              how students can join the next cohort.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#programs"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 font-semibold text-[#060816] transition-transform duration-200 hover:scale-[1.02]"
              >
                View Programs
              </a>
              <a
                href="/login"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 font-semibold text-white/90 backdrop-blur transition-transform duration-200 hover:scale-[1.02] hover:bg-white/10"
              >
                Student Login
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}