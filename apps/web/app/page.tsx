import CircuitHero from '@/components/hero/CircuitHero';

const courses = [
  {
    title: 'Foundations of Electronics',
    subtitle: '10 Labs • 12 Weeks',
    description:
      'Students learn electronics by building real circuits with their own hands. They work through guided labs using breadboards, components, and simple systems that make the concepts easier to understand and remember.',
    badge: 'Hands-On Engineering',
    badgeClass: 'border-cyan-300/20 bg-cyan-300/12 text-cyan-100',
    surface:
      'bg-[linear-gradient(180deg,rgba(8,20,42,0.98),rgba(5,8,22,0.98))]',
    hoverText: 'group-hover:text-cyan-200',
    hoverButton:
      'group-hover:border-cyan-300/30 group-hover:bg-cyan-300/[0.08]',
    ringSweep:
      'bg-[conic-gradient(from_0deg,transparent_0deg,transparent_312deg,rgba(34,211,238,0.10)_324deg,rgba(34,211,238,0.55)_336deg,rgba(34,211,238,0.95)_348deg,rgba(125,211,252,1)_356deg,transparent_360deg)]',
    outerGlow: 'group-hover:shadow-[0_0_90px_rgba(34,211,238,0.18)]',
  },
  {
    title: 'Intro to Game Design',
    subtitle: '10 Labs • 12 Weeks',
    description:
      'Students create games while learning logic, creativity, and problem solving step by step. Each lab helps them build confidence by making something interactive they can actually play and improve.',
    badge: 'Creative Coding',
    badgeClass: 'border-amber-300/20 bg-amber-300/12 text-amber-100',
    surface:
      'bg-[linear-gradient(180deg,rgba(28,20,6,0.98),rgba(10,9,20,0.98))]',
    hoverText: 'group-hover:text-amber-100',
    hoverButton:
      'group-hover:border-amber-300/30 group-hover:bg-amber-300/[0.08]',
    ringSweep:
      'bg-[conic-gradient(from_0deg,transparent_0deg,transparent_312deg,rgba(245,158,11,0.10)_324deg,rgba(245,158,11,0.55)_336deg,rgba(245,158,11,0.95)_348deg,rgba(251,191,36,1)_356deg,transparent_360deg)]',
    outerGlow: 'group-hover:shadow-[0_0_100px_rgba(245,158,11,0.20)]',
  },
  {
    title: 'Building a Website with AI',
    subtitle: '10 Labs • 12 Weeks',
    description:
      'From deploying a game to creating a first portfolio, students learn how to build and publish a real website with AI as a tool. The focus is on understanding the process, making changes themselves, and seeing their ideas come to life online.',
    badge: 'Modern Web Building',
    badgeClass: 'border-violet-300/20 bg-violet-300/12 text-violet-100',
    surface:
      'bg-[linear-gradient(180deg,rgba(20,10,42,0.98),rgba(8,8,22,0.98))]',
    hoverText: 'group-hover:text-violet-100',
    hoverButton:
      'group-hover:border-violet-300/30 group-hover:bg-violet-300/[0.08]',
    ringSweep:
      'bg-[conic-gradient(from_0deg,transparent_0deg,transparent_312deg,rgba(168,85,247,0.10)_324deg,rgba(168,85,247,0.55)_336deg,rgba(168,85,247,0.95)_348deg,rgba(196,181,253,1)_356deg,transparent_360deg)]',
    outerGlow: 'group-hover:shadow-[0_0_100px_rgba(168,85,247,0.20)]',
  },
];

const programHighlights = [
  'Small class ratios',
  'Hands-on labs every week',
  'Recordings and readings included',
  'Learn at your pace or follow live',
];

const philosophyCards = [
  {
    title: 'Learn by doing',
    text: 'I believe students learn technology best when they build, test, and make mistakes with their own hands instead of only watching or memorizing.',
  },
  {
    title: 'Teaching that sticks',
    text: 'This academy is inspired by the teachers who made learning memorable, practical, and interesting, along with my own experience teaching kids of different ages and backgrounds.',
  },
  {
    title: 'Built on real teaching experience',
    text: 'My background includes teaching STEM, working in ABA, and helping students improve communication, social skills, and classroom readiness in ways that match their pace.',
  },
  {
    title: 'Small groups matter',
    text: 'Keeping classes small makes it easier to support each student, notice challenges early, and help them stay engaged without getting left behind.',
  },
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
            Courses built around real learning.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/65">
            Circuit Minds Academy focuses on hands-on learning, small groups,
            and clear guidance so students can build confidence through real
            projects, not just passive lessons.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.title}
              className={`group relative overflow-hidden rounded-[2.5rem] p-[1.5px] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] ${course.outerGlow}`}
            >
              <div className="absolute inset-0 rounded-[inherit] bg-white/10" />

              <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div
                  className={`absolute inset-[-35%] rounded-full ${course.ringSweep} group-hover:animate-[spin_3.8s_linear_infinite]`}
                />
              </div>

              <div className="absolute inset-[1.5px] rounded-[calc(2.5rem-1.5px)] bg-[#050816]" />

              <div
                className={`absolute inset-[1.5px] rounded-[calc(2.5rem-1.5px)] ${course.surface}`}
              />

              <div className="absolute inset-[1.5px] rounded-[calc(2.5rem-1.5px)] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_26%)] opacity-70" />

              <div className="relative z-10 flex min-h-[440px] flex-col rounded-[calc(2.5rem-1.5px)] p-8 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-[75%]">
                    <div
                      className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${course.badgeClass}`}
                    >
                      {course.badge}
                    </div>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80">
                    Course
                  </div>
                </div>

                <div className="mt-10">
                  <h3
                    className={`text-4xl font-black leading-tight tracking-[-0.03em] text-white transition-colors duration-300 sm:text-5xl ${course.hoverText}`}
                  >
                    {course.title}
                  </h3>

                  <p className="mt-4 text-lg font-semibold text-white/82">
                    {course.subtitle}
                  </p>

                  <p className="mt-6 max-w-xl text-lg leading-8 text-white/68 transition-colors duration-300 group-hover:text-white/78">
                    {course.description}
                  </p>
                </div>

                <div className="mt-auto pt-10">
                  <a
                    href="/login"
                    className={`inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/8 px-6 font-semibold text-white/92 backdrop-blur transition-all duration-300 hover:scale-[1.02] ${course.hoverButton}`}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </article>
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
            Built to support students as they learn.
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
            Students can follow along with the course week by week, or review
            recordings and readings at their own pace while continuing to build
            real projects and skills.
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
              Teaching Philosophy
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A learning approach shaped by real teaching experience.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {philosophyCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-white/68">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 to-violet-400/10 p-8 backdrop-blur sm:p-10">
            <p className="text-sm uppercase tracking-[0.24em] text-violet-200/80">
              Get Started
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to build and learn?
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/65">
              Explore the courses, choose the path that fits you best, and start
              learning through projects, labs, and guided practice.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#programs"
                style={{ color: '#07111f' }}
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 font-semibold shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition hover:scale-[1.02]"
              >
                View Courses
              </a>
              <a
                href="https://circuit-minds-app.vercel.app/"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 font-semibold text-white/90 backdrop-blur transition hover:scale-[1.02] hover:bg-white/10"
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