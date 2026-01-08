// sections/Services.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

type Service = {
  badge: string;
  title: string;
  desc: string;
  chips: string[];
  layout: "textLeft" | "textRight";
  mock: "ai" | "email" | "project";
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" as any },
  show: { opacity: 1, y: 0, filter: "blur(0px)" as any },
};

const cardIn = {
  hidden: { opacity: 0, y: 28, scale: 0.98, filter: "blur(8px)" as any },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" as any },
};

const chipStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const chipAnim = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function Services() {
  const services: Service[] = [
    {
      badge: "AI Assistant",
      title: "Digital Marketing",
      desc: "Our digital marketing services are designed to amplify your brand’s reach, drive targeted traffic, and convert engagement into measurable growth.",
      chips: ["Summaries", "Scheduling", "Many more"],
      layout: "textLeft",
      mock: "ai",
    },
    {
      badge: "Sales & Marketing",
      title: "Marketing Analysis",
      desc: "With our best market research techniques, we provide data-driven insights to empower your business decisions and strategies.",
      chips: ["Leads", "Content", "Social post"],
      layout: "textRight",
      mock: "email",
    },
    {
      badge: "Custom Projects",
      title: "Graphic Designing",
      desc: "We transform your brand’s vision into compelling visual stories. Our creative team blends artistry with strategy to create designs that resonate with your audience.",
      chips: ["Strategy", "Custom AI", "Consulting"],
      layout: "textLeft",
      mock: "project",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-black px-6 py-24 font-sans md:py-28">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0.9)_60%,rgba(0,0,0,1)_100%)]" />
        <div className="absolute left-1/2 top-[-160px] h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.10),transparent_65%)] blur-3xl opacity-70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* heading */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md shadow-[0_14px_34px_rgba(0,0,0,0.6)]">
            Our Services
          </span>

          <h2 className="mt-8 text-4xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)] md:text-6xl">
            What we&apos;re Offering to
            <br />
            Our Customers
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
            We are committed to providing our customers with reliable
            <br className="hidden md:block" />
            software solutions that perfectly meet their demands.
          </p>
        </div>

        {/* blocks */}
        <div className="mt-16 space-y-24 md:mt-20 md:space-y-28">
          {services.map((s, idx) => (
            <ServiceBlock key={idx} service={s} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const textFirst = service.layout === "textLeft";

  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
      {/* TEXT */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        variants={fadeUp}
        className={[
          "text-center md:text-left",
          textFirst ? "md:order-1" : "md:order-2",
        ].join(" ")}
      >
        <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md shadow-[0_14px_34px_rgba(0,0,0,0.6)]">
          {service.badge}
        </span>

        <h3 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
          {service.title}
        </h3>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/60 md:mx-0 md:text-lg">
          {service.desc}
        </p>

        <motion.div
          variants={chipStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
        >
          {service.chips.map((c) => (
            <motion.span
              key={c}
              variants={chipAnim}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-md"
            >
              {c}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* MOCK CARD */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardIn}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={[textFirst ? "md:order-2" : "md:order-1"].join(" ")}
      >
        <MockWrap floatDelay={index * 0.12}>
          {service.mock === "ai" ? <MockAI /> : null}
          {service.mock === "email" ? <MockEmail /> : null}
          {service.mock === "project" ? <MockProject /> : null}
        </MockWrap>
      </motion.div>
    </div>
  );
}

/* -------------------------- Mock Card Shell -------------------------- */

function MockWrap({
  children,
  floatDelay,
}: {
  children: React.ReactNode;
  floatDelay?: number;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      {/* soft glow behind */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[36px] bg-[radial-gradient(circle_at_40%_20%,rgba(255,255,255,0.08),transparent_55%)] blur-2xl" />
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.10),transparent_60%)] blur-3xl opacity-70" />

      {/* outer card */}
      <div
        className="rounded-[28px] bg-white/[0.04] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.78)] ring-1 ring-white/10 will-change-transform"
        style={{
          animation: `floaty 6.5s ease-in-out ${floatDelay ?? 0}s infinite`,
        }}
      >
        {children}
      </div>

      {/* keyframes inline (no styled-jsx) */}
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -10px, 0); }
        }
      `}</style>
    </div>
  );
}

/* -------------------------- Mock: AI Assistant -------------------------- */

function MockAI() {
  return (
    <div className="rounded-[20px] bg-black/60 p-7 ring-1 ring-white/10">
      {/* logo orb */}
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center">
        <div className="relative h-12 w-12 rounded-full bg-[conic-gradient(from_180deg,rgba(168,85,247,0.85),rgba(59,130,246,0.55),rgba(168,85,247,0.85))] blur-[0px]" />
        <div className="absolute h-7 w-7 rounded-full bg-black/60" />
      </div>

      <div className="text-center">
        <div className="text-lg font-semibold text-white/90">
          What can I help with?
        </div>
        <div className="mt-2 text-xs leading-5 text-white/45">
          Whether you want help in customer handling or make
          <br />
          changes in your system just give me command
        </div>
      </div>

      {/* input */}
      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-white/35" />
          <div className="h-4 w-40 rounded bg-white/5" />
          <div className="ml-auto h-8 w-8 rounded-lg border border-white/10 bg-white/5" />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">
            + Add document
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["Analyze", "Generate Image", "research"].map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/45"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------- Mock: Email Sending -------------------------- */

function MockEmail() {
  return (
    <div className="rounded-[20px] bg-black/60 p-7 ring-1 ring-white/10">
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="text-sm font-medium text-white/80">E-mail Sending..</div>
        <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["LinkedIn", "IT services", "Founders"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white/10" />
            <div>
              <div className="text-sm font-medium text-white/80">
                Gorge Chapel
              </div>
              <div className="text-xs text-white/45">Founder</div>
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/60">
            Verified
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 opacity-55">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white/10" />
            <div>
              <div className="text-sm font-medium text-white/80">Mike Tylor</div>
              <div className="text-xs text-white/45">CTO</div>
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/60">
            Pending
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------- Mock: Custom Project -------------------------- */

function MockProject() {
  return (
    <div className="rounded-[20px] bg-black/60 p-7 ring-1 ring-white/10">
      <div className="text-sm font-semibold text-white/85">Hey David!</div>
      <div className="mt-1 text-xs text-white/45">
        Here is your Custom project &amp; schedule
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-white/70">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/35" />
          On going project :
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60">
              ▣
            </div>
            <div>
              <div className="text-sm font-medium text-white/80">
                Customer Support Chatbot
              </div>
              <div className="text-xs text-white/45">90% Finished</div>
            </div>
          </div>

          <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin" />
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs font-medium text-white/60">Schedule</div>
          <div className="mt-3 flex items-center justify-between gap-2 text-[11px] text-white/40">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <span
                key={d}
                className={[
                  "flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.02]",
                  d === "Th"
                    ? "bg-blue-600/25 text-white/75 border-blue-500/30"
                    : "",
                ].join(" ")}
              >
                {d}
              </span>
            ))}
          </div>

          <div className="mt-4 text-center text-[11px] text-white/35">
            No meeting today.
          </div>
        </div>
      </div>
    </div>
  );
}
