"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, BarChart3, } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white">

      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[180px]" />
        <div className="absolute -left-24 bottom-0 h-[450px] w-[450px] rounded-full bg-violet-500/20 blur-[160px]" />
        <div className="absolute -right-24 top-44 h-[450px] w-[450px] rounded-full bg-sky-500/20 blur-[160px]" />
      </div>

      {/* Navbar */}
      <motion.nav initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-bold">
              C
            </div>

            <span className="text-2xl font-bold">
              ChaiForms
            </span>

          </Link>

          <div className="hidden items-center gap-8 text-slate-300 lg:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>

            <a href="#templates" className="transition hover:text-white">
              Templates
            </a>

            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>

            <Link href="/docs" className="transition hover:text-white">
              API Docs
            </Link>

          </div>

          <div className="flex items-center gap-3">

            <Link href="/login">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                Login
              </Button>
            </Link>

            <Link href="/signup">
              <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/30 hover:opacity-90">
                Get Started
              </Button>
            </Link>

          </div>

        </div>
      </motion.nav>

      {/* Hero */}
      <section className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">

        {/* Left */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            <Sparkles size={16} />
            Modern Form Builder SaaS
          </div>

          <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">

            Build Beautiful

            <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              Forms Effortlessly
            </span>

          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
            Create dynamic forms, collect responses, analyze submissions,
            publish public or unlisted forms and grow with a modern
            Typeform-style experience.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/30"
              >
                Start Building

                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/explore">
              <Button
                size="lg"
                variant="outline"
                className="border-white/10 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
              >
                Explore Forms
              </Button>
            </Link>

          </div>

          <div className="mt-12 flex flex-wrap gap-8">

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-indigo-400" />
              <span className="text-slate-300">
                Secure Authentication
              </span>
            </div>

            <div className="flex items-center gap-3">
              <BarChart3 className="text-sky-400" />
              <span className="text-slate-300">
                Live Analytics
              </span>
            </div>

          </div>

        </motion.div>

        {/* Right Card */}

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            y: [0, -12, 0],
          }}
          transition={{
            duration: 0.8,
            y: {
              repeat: Infinity,
              duration: 5,
            },
          }}
          className="w-full max-w-lg"
        >

          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h3 className="text-2xl font-bold">
                  Developer Survey
                </h3>

                <p className="text-slate-400">
                  Public • Published
                </p>

              </div>

              <div className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                LIVE
              </div>

            </div>

            <div className="space-y-5">

              <input
                placeholder="Full Name"
                className="w-full rounded-xl border border-white/10 bg-[#0F172A] p-4 outline-none"
              />

              <input
                placeholder="Email Address"
                className="w-full rounded-xl border border-white/10 bg-[#0F172A] p-4 outline-none"
              />

              <textarea
                rows={4}
                placeholder="Tell us about yourself..."
                className="w-full rounded-xl border border-white/10 bg-[#0F172A] p-4 outline-none"
              />

              <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                Submit Response
              </Button>

            </div>

          </div>

        </motion.div>

      </section>
            {/* ================= TRUSTED BY ================= */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            Trusted Worldwide
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            Used by Modern Teams
          </h2>

          <p className="mt-4 text-slate-400">
            Build forms trusted by developers, startups and communities.
          </p>

        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">

          {[
            "Google",
            "Microsoft",
            "OpenAI",
            "Netflix",
            "GitHub",
            "Vercel",
          ].map((company) => (

            <motion.div
              key={company}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] py-6 text-center text-lg font-semibold text-slate-300 backdrop-blur-xl transition hover:border-indigo-500/40 hover:text-white"
            >
              {company}
            </motion.div>

          ))}

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-24"
      >

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >

          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            Powerful Features
          </span>

          <h2 className="mt-6 text-5xl font-bold leading-tight">

            Everything You Need

            <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              To Build Better Forms
            </span>

          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Dynamic fields, analytics, themes, public sharing,
            email notifications and much more.
          </p>

        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {[
            {
              icon: "⚡",
              title: "Lightning Fast",
              desc: "Create beautiful forms within seconds.",
            },
            {
              icon: "🎨",
              title: "Beautiful Themes",
              desc: "Modern themes inspired by anime, movies and startups.",
            },
            {
              icon: "📊",
              title: "Analytics",
              desc: "Track responses, views and completion rate.",
            },
            {
              icon: "🌍",
              title: "Public & Unlisted",
              desc: "Share publicly or privately with direct links.",
            },
            {
              icon: "🔒",
              title: "Secure",
              desc: "Authentication, validation and protected dashboard.",
            },
            {
              icon: "📧",
              title: "Email Flow",
              desc: "Automatic confirmation and notification emails.",
            },
          ].map((feature, index) => (

            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:border-indigo-500/30"
            >

              <div className="mb-6 text-5xl">
                {feature.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="leading-8 text-slate-400">
                {feature.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* ================= TEMPLATES ================= */}

      <section
        id="templates"
        className="mx-auto max-w-7xl px-6 py-24"
      >

        <div className="mb-16 text-center">

          <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-300">
            Templates
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Ready To Use Templates
          </h2>

          <p className="mt-5 text-lg text-slate-400">
            Start with professionally designed templates.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {[
            {
              emoji: "🎬",
              title: "Movie Feedback",
              responses: "2.4K Responses",
            },
            {
              emoji: "🍥",
              title: "Anime Survey",
              responses: "1.8K Responses",
            },
            {
              emoji: "🎮",
              title: "Gaming Poll",
              responses: "5.3K Responses",
            },
            {
              emoji: "🚀",
              title: "Startup Waitlist",
              responses: "8.7K Responses",
            },
            {
              emoji: "💻",
              title: "Developer Survey",
              responses: "12K Responses",
            },
            {
              emoji: "🎉",
              title: "Event Registration",
              responses: "4.6K Responses",
            },
          ].map((template) => (

            <motion.div
              key={template.title}
              whileHover={{
                y: -10,
              }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
            >

              <div className="flex h-52 items-center justify-center bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-sky-500/20 text-8xl">
                {template.emoji}
              </div>

              <div className="space-y-4 p-8">

                <h3 className="text-2xl font-bold">
                  {template.title}
                </h3>

                <p className="text-slate-400">
                  {template.responses}
                </p>

                <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                  Use Template
                </Button>

              </div>

            </motion.div>

          ))}

        </div>

      </section>

            {/* ================= STATS ================= */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {[
            {
              number: "10K+",
              title: "Forms Created",
            },
            {
              number: "250K+",
              title: "Responses",
            },
            {
              number: "99.9%",
              title: "Uptime",
            },
            {
              number: "15K+",
              title: "Creators",
            },
          ].map((item) => (

            <motion.div
              key={item.title}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl"
            >

              <h2 className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-5xl font-extrabold text-transparent">
                {item.number}
              </h2>

              <p className="mt-4 text-slate-400">
                {item.title}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <motion.div
          whileInView={{
            opacity: [0, 1],
            y: [40, 0],
          }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 p-16 text-center"
        >

          <h2 className="text-5xl font-bold">

            Ready To Build

            <br />

            Beautiful Forms?

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">

            Create surveys, registrations, feedback forms and
            collect responses with ease.

          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link href="/signup">

              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                Get Started Free
              </Button>

            </Link>

            <Link href="/explore">

              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white/10"
              >
                Explore Templates
              </Button>

            </Link>

          </div>

        </motion.div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/10">

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">

          <div>

            <h2 className="text-2xl font-bold">
              ChaiForms
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Modern Form Builder powered by
              Next.js, tRPC, Drizzle ORM,
              Zod and Turborepo.
            </p>

          </div>

          <div>

            <h4 className="mb-5 font-semibold">
              Product
            </h4>

            <div className="space-y-3 text-slate-400">

              <p>Features</p>

              <p>Templates</p>

              <p>Explore</p>

              <p>Pricing</p>

            </div>

          </div>

          <div>

            <h4 className="mb-5 font-semibold">
              Resources
            </h4>

            <div className="space-y-3 text-slate-400">

              <p>API Docs</p>

              <p>GitHub</p>

              <p>Documentation</p>

              <p>Support</p>

            </div>

          </div>

          <div>

            <h4 className="mb-5 font-semibold">
              Company
            </h4>

            <div className="space-y-3 text-slate-400">

              <p>About</p>

              <p>Privacy</p>

              <p>Terms</p>

              <p>Contact</p>

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 py-6 text-center text-sm text-slate-500">

          © 2026 ChaiForms. Built with ❤️ using
          Next.js, tRPC, Drizzle ORM & Zod.

        </div>

      </footer>

    </main>
  );
}