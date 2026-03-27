'use client'

import { motion } from 'framer-motion'

const headlineWords = [
  'Build',
  'Circuits.',
  'Explore',
  'Robotics.',
  'Think',
  'Like',
  'An',
  'Engineer.',
]

export default function CircuitHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(101,63,255,0.24),transparent_32%),radial-gradient(circle_at_20%_30%,rgba(0,176,255,0.16),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-[8%] top-[14%] h-2 w-2 rounded-full bg-cyan-300 blur-[1px]" />
        <div className="absolute left-[15%] top-[28%] h-1.5 w-1.5 rounded-full bg-violet-300 blur-[1px]" />
        <div className="absolute left-[74%] top-[18%] h-2 w-2 rounded-full bg-white/80 blur-[1px]" />
        <div className="absolute left-[82%] top-[30%] h-1.5 w-1.5 rounded-full bg-cyan-200 blur-[1px]" />
        <div className="absolute left-[68%] top-[46%] h-2 w-2 rounded-full bg-violet-300 blur-[2px]" />
        <div className="absolute left-[90%] top-[16%] h-1.5 w-1.5 rounded-full bg-white blur-[1px]" />
        <div className="absolute left-[10%] top-[60%] h-1.5 w-1.5 rounded-full bg-cyan-300 blur-[1px]" />
        <div className="absolute left-[35%] top-[18%] h-1 w-1 rounded-full bg-violet-400 blur-[1px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.08]" />

      <div className="absolute right-6 top-6 z-30">
        <a
          href="/login"
          className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 font-semibold text-white/90 backdrop-blur transition-transform duration-200 hover:scale-[1.02] hover:bg-white/10"
        >
          Login
        </a>
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:px-12">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur"
          >
            Circuit Minds • Hands-On Electronics & Robotics Courses
          </motion.div>

          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            {headlineWords.map((word, index) => (
              <motion.span
                key={word + index}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, delay: 0.08 * index }}
                className="mr-[0.22em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg"
          >
            A hands-on STEM learning experience where students explore electronics,
            robotics, and creative problem solving through structured lab-based
            courses designed to turn curiosity into real skills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#programs"
              style={{ color: '#060816' }}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white px-6 font-semibold shadow-sm transition-transform duration-200 hover:scale-[1.02]"
            >
              Explore Programs
            </a>

            <a
              href="#about"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 font-semibold text-white/90 backdrop-blur transition-transform duration-200 hover:scale-[1.02] hover:bg-white/10"
            >
              About Circuit Minds
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {[
              ['12 Labs', 'Per Course'],
              ['6 Weeks', 'Per Program'],
              ['Small', 'Class Sizes'],
            ].map(([title, subtitle]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
              >
                <p className="text-lg font-semibold">{title}</p>
                <p className="mt-1 text-sm text-white/60">{subtitle}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative aspect-[1.02/0.95] w-full max-w-[700px]"
          >
            <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_65%_18%,rgba(63,180,255,0.32),transparent_20%),radial-gradient(circle_at_32%_30%,rgba(125,88,255,0.28),transparent_25%),linear-gradient(135deg,#0b1024_0%,#090d1f_45%,#0d1330_100%)] shadow-[0_0_120px_rgba(88,84,255,0.18)]" />

            <div className="absolute inset-x-[12%] bottom-[6%] h-[12%] rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute inset-x-[7%] bottom-[10%] h-[8%] rounded-[999px] bg-black/50 blur-2xl" />

            <div className="absolute left-[10%] right-[10%] top-[10%] bottom-[12%] rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-[2px]" />

            <div className="absolute left-[24%] right-[24%] bottom-[18%] h-[5%] rounded-full bg-cyan-300/10 blur-xl" />
            <div className="absolute left-[26%] right-[26%] bottom-[20%] h-[1.3%] rounded-full bg-violet-300/25" />

            <div className="absolute left-[11%] top-[28%] h-[36%] w-[34%] rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,54,0.96),rgba(9,13,28,0.98))] shadow-[0_0_50px_rgba(95,85,255,0.15)]">
              <div className="absolute left-[12%] right-[12%] top-[10%] h-[18%] rounded-2xl bg-[#19325a]" />
              <div className="absolute left-[18%] right-[18%] top-[18%] h-[2%] rounded-full bg-cyan-300/40 blur-sm" />

              <div className="absolute left-[12%] right-[12%] top-[34%] h-[8%] rounded-full bg-violet-400/25 blur-md" />

              <div className="absolute left-[10%] right-[10%] bottom-[12%] h-[14%] rounded-2xl border border-white/5 bg-[#0c132b]" />

              <div className="absolute left-[14%] bottom-[16%] h-[8%] w-[20%] rounded-md border border-cyan-300/10 bg-[#161f43]" />

              <div className="absolute left-[40%] bottom-[17%] h-[6%] w-[8%] rounded-sm bg-[#1f2a55]" />
              <div className="absolute left-[51%] bottom-[17%] h-[6%] w-[8%] rounded-sm bg-[#1f2a55]" />
              <div className="absolute left-[62%] bottom-[17%] h-[6%] w-[8%] rounded-sm bg-[#1f2a55]" />

              <div className="absolute left-[18%] bottom-[28%] h-1.5 w-1.5 rounded-full bg-cyan-300" />
              <div className="absolute left-[24%] bottom-[28%] h-1.5 w-1.5 rounded-full bg-violet-300" />
              <div className="absolute left-[30%] bottom-[28%] h-1.5 w-1.5 rounded-full bg-cyan-200" />
            </div>

            <div className="absolute right-[11%] top-[28%] h-[38%] w-[36%] rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,24,54,0.96),rgba(9,13,28,0.98))] shadow-[0_0_60px_rgba(66,197,255,0.12)]">
              <div className="absolute left-[12%] right-[12%] top-[10%] h-[16%] rounded-2xl bg-[#17355d]" />
              <div className="absolute left-[16%] right-[16%] top-[20%] h-[2%] rounded-full bg-cyan-300/35 blur-md" />

              <div className="absolute left-[14%] top-[46%] h-[12%] w-[22%] rounded-lg bg-[#141a37]" />
              <div className="absolute left-[40%] top-[46%] h-[12%] w-[16%] rounded-lg bg-[#141a37]" />
              <div className="absolute right-[14%] top-[46%] h-[12%] w-[16%] rounded-lg bg-[#141a37]" />

              <div className="absolute left-[10%] right-[10%] bottom-[10%] h-[12%] rounded-2xl border border-white/5 bg-[#0d152d]" />

              <div className="absolute left-[18%] bottom-[15%] h-[6%] w-[28%] rounded-full bg-cyan-300/10" />
              <div className="absolute right-[18%] bottom-[15%] h-[6%] w-[18%] rounded-full bg-violet-300/10" />
            </div>

            <div className="absolute left-[28%] top-[34%] z-20">
              <div className="relative h-24 w-16">
                <div className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full bg-[#ffd7b2]" />
                <div className="absolute left-1/2 top-7 h-10 w-8 -translate-x-1/2 rounded-2xl bg-cyan-300/80" />
                <div className="absolute left-[6px] top-[40px] h-10 w-1.5 rounded-full bg-[#ffd7b2] rotate-[40deg]" />
                <div className="absolute right-[6px] top-[40px] h-9 w-1.5 rounded-full bg-[#ffd7b2] -rotate-[40deg]" />
                <div className="absolute left-[18px] bottom-0 h-9 w-1.5 rounded-full bg-violet-300 rotate-[6deg]" />
                <div className="absolute right-[18px] bottom-0 h-9 w-1.5 rounded-full bg-violet-300 -rotate-[6deg]" />
              </div>
            </div>

            <div className="absolute left-[33%] top-[43%] z-20 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_22px_rgba(103,215,255,0.85)]" />

            <motion.div
              animate={{
                opacity: [0.2, 1, 0.35, 0.8, 0.2],
                y: [0, -14, -24, -36, -52],
                x: [0, 6, -4, 4, -2],
                scale: [0.7, 1, 0.9, 1.1, 0.8],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute left-[34%] top-[36%] h-3 w-3 rounded-full bg-cyan-300 blur-[1px]"
            />

            <motion.div
              animate={{
                opacity: [0.1, 0.9, 0.4, 0.8, 0.1],
                y: [0, -10, -20, -28, -42],
                x: [0, -5, 4, -2, 3],
                scale: [0.8, 1, 1.15, 0.95, 0.75],
              }}
              transition={{
                duration: 2.7,
                repeat: Infinity,
                delay: 0.4,
                ease: 'easeOut',
              }}
              className="absolute left-[37%] top-[35%] h-2.5 w-2.5 rounded-full bg-violet-300 blur-[1px]"
            />

            <motion.div
              animate={{
                opacity: [0.15, 0.8, 0.25, 0.7, 0.15],
                y: [0, -8, -16, -26, -38],
                x: [0, 4, -3, 5, 0],
                scale: [0.75, 1, 0.85, 1.05, 0.8],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: 0.9,
                ease: 'easeOut',
              }}
              className="absolute left-[31%] top-[34%] h-2 w-2 rounded-full bg-white blur-[1px]"
            />

            <motion.div
              animate={{ x: [0, 110, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[17%] left-[35%] z-20"
            >
              <div className="relative h-16 w-10">
                <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(103,215,255,0.5)]" />
                <div className="absolute left-1/2 top-5 h-7 w-5 -translate-x-1/2 rounded-full bg-violet-300" />
                <div className="absolute left-[3px] top-[28px] h-8 w-1 rounded-full bg-violet-200 rotate-[22deg]" />
                <div className="absolute right-[3px] top-[28px] h-8 w-1 rounded-full bg-violet-200 -rotate-[22deg]" />
                <div className="absolute left-[10px] bottom-0 h-7 w-1 rounded-full bg-cyan-100 rotate-[8deg]" />
                <div className="absolute right-[10px] bottom-0 h-7 w-1 rounded-full bg-cyan-100 -rotate-[8deg]" />
              </div>
            </motion.div>

            <div className="absolute right-[9%] top-[14%] rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100 backdrop-blur">
              Future Lab
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}