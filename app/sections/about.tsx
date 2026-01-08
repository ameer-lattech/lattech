// sections/About.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

type Step = {
  step: string;
  title: string;
  desc: string;
  variant: "audit" | "dev" | "omni" | "opt";
};

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" as any },
  show: { opacity: 1, y: 0, filter: "blur(0px)" as any },
};

const cardIn = {
  hidden: { opacity: 0, y: 26, scale: 0.98, filter: "blur(12px)" as any },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" as any },
};

export default function About() {
  const steps: Step[] = [
    {
      step: "Step 1",
      title: "Strategic Audit",
      desc: "We assess your brand's current digital presence, identify gaps, and discover opportunities to elevate your marketing impact.",
      variant: "audit",
    },
    {
      step: "Step 2",
      title: "Custom Campaign Development",
      desc: "Our team creates personalized, data-driven marketing strategies tailored to your target audience and business goals.",
      variant: "dev",
    },
    {
      step: "Step 3",
      title: "Omnichannel Integration",
      desc: "We seamlessly deploy your campaigns across all digital platforms, ensuring a consistent and engaging brand.",
      variant: "omni",
    },
    {
      step: "Step 4",
      title: "Continuous Optimization",
      desc: "We refine performance, analyze insights, and enhance automation for long-term growth.",
      variant: "opt",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-black px-6 py-24 font-sans md:py-28">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0.9)_60%,rgba(0,0,0,1)_100%)]" />
        <div className="absolute left-1/2 top-[-160px] h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.09),rgba(59,130,246,0.06)_40%,transparent_70%)] blur-3xl opacity-75" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md shadow-[0_14px_34px_rgba(0,0,0,0.6)]">
            Our Process
          </span>

          <h2 className="mt-8 text-4xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)] md:text-6xl">
            About Us
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/60 md:text-lg">
            At Lattech Solution, we specialize in providing businesses with enterprise-
            <br className="hidden md:block" />
            grade software solutions precisely tailored to their needs.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-2 md:gap-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={cardIn}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.08,
              }}
              className="group relative rounded-[26px] bg-white/[0.04] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.78)] ring-1 ring-white/10 md:p-8"
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[34px] bg-[radial-gradient(circle_at_40%_20%,rgba(255,255,255,0.08),transparent_60%)] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* top step pill */}
              <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/70">
                {s.step}
              </div>

              <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
                {s.title}
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/55 md:text-base md:leading-7">
                {s.desc}
              </p>

              {/* mock area */}
              <div className="mt-7 rounded-[18px] border border-white/10 bg-black/50 p-5">
                {s.variant === "audit" && <MockAudit />}
                {s.variant === "dev" && <MockCode />}
                {s.variant === "omni" && <MockOmni />}
                {s.variant === "opt" && <MockOptimize />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Mock: Audit ----------------------------- */
function MockAudit() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* left dial */}
      <div className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="relative h-28 w-28 rounded-full border border-white/10 bg-black/40">
          <div className="absolute inset-4 rounded-full border border-white/10 bg-black/60" />
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-1 w-10 -translate-y-1/2 origin-left rounded bg-purple-400/70"
            initial={{ rotate: -70 }}
            animate={{ rotate: [-70, 30, -50] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="absolute bottom-3 left-4 text-[11px] font-medium text-white/55">
          Analyzing current workflow..
        </div>
      </div>

      {/* right checks */}
      <div className="space-y-2">
        {[
          "System check",
          "Process check",
          "Speed check",
          "Manual work",
          "Repetative task",
        ].map((t, idx) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2"
          >
            <div className="flex items-center gap-2 text-xs text-white/65">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[10px]">
                ✓
              </span>
              {t}
            </div>
            <span className="h-2 w-2 rounded-full bg-white/25" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Mock: Code ------------------------------ */
function MockCode() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      {/* fake window bar */}
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <div className="ml-auto h-2.5 w-24 rounded bg-white/5" />
      </div>

      <div className="space-y-2 text-[11px] leading-5 text-white/55">
        <Line delay={0.0} text="def get_status(self):" />
        <Line delay={0.05} text='  return f"Status: {self.status}"' />
        <div className="h-2" />
        <Line delay={0.1} text="class AutomationTrigger:" />
        <Line delay={0.15} text="  def __init__(self, threshold):" />
        <Line delay={0.2} text="    self.threshold = threshold" />
        <Line delay={0.25} text='    self.status = "inactive"' />
      </div>
    </div>
  );
}

function Line({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-md bg-black/30 px-3 py-2"
    >
      <span className="text-purple-300/70">{text}</span>
    </motion.div>
  );
}

/* ----------------------------- Mock: Omni ------------------------------ */
function MockOmni() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-black/40 p-4">
          <motion.div
            className="h-12 w-12 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.9),rgba(59,130,246,0.35),rgba(0,0,0,0))] ring-1 ring-white/10"
            animate={{ rotate: [0, 6, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="text-[11px] text-white/55">Our solution</div>
        </div>

        <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-black/40 p-4">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/70"
            animate={{ rotate: [0, -6, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ◎
          </motion.div>
          <div className="text-[11px] text-white/55">Your stack</div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="mt-5 h-[2px] w-full rounded bg-white/10"
        initial={{ scaleX: 0.2, opacity: 0.4 }}
        animate={{ scaleX: [0.2, 1, 0.2], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

/* -------------------------- Mock: Optimization ------------------------- */
function MockOptimize() {
  const rows = [
    { title: "Chatbot system", sub: "Efficiency will increase by 20%", icon: "□" },
    { title: "Workflow system", sub: "Update available.", icon: "⚙" },
    { title: "Sales system", sub: "Up to date", icon: "✓" },
  ];

  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <motion.div
          key={r.title}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white/70">
              {r.icon}
            </div>
            <div>
              <div className="text-sm font-medium text-white/80">{r.title}</div>
              <div className="text-xs text-white/45">{r.sub}</div>
            </div>
          </div>

          {i === 0 ? (
            <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin" />
          ) : (
            <div className="h-2 w-2 rounded-full bg-white/25" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
