"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type TabKey =
  | "Artificial intelligence"
  | "Blockchain"
  | "Big data"
  | "Computer vision"
  | "Mixed reality"
  | "Internet of things";

type Slide = {
  tab: TabKey;
  title: { pre: string; strong: string; post: string };
  body: string;
  cta1: string;
  cta2: string;
  image: string;
  imageAlt: string;
};

const TABS: TabKey[] = [
  "Artificial intelligence",
  "Blockchain",
  "Big data",
  "Computer vision",
  "Mixed reality",
  "Internet of things",
];

const SLIDES: Slide[] = [
  {
    tab: "Artificial intelligence",
    title: { pre: "Getting ", strong: "Started", post: " With Lattech Is Easier Than Ever" },
    body:
      "Our experts help mid-sized and large firms build, test, protect, manage, migrate and optimize digital solutions ensuring they’re always up and running and achieve the optimal TCO.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "AI city blocks",
  },
  {
    tab: "Artificial intelligence",
    title: { pre: "Build ", strong: "Smarter", post: " Operations With Practical AI" },
    body:
      "From data strategy to production models, we help teams ship AI that improves decisions, automation, and customer experiences—safely and reliably.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "AI server room",
  },

  {
    tab: "Blockchain",
    title: { pre: "Enterprise ", strong: "Blockchain", post: " Built For Real Use Cases" },
    body:
      "Design verifiable workflows, secure integrations, and governance-ready systems that scale beyond proofs of concept.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image:
      "https://images.unsplash.com/photo-1639322537231-2f206e06af84?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Blockchain network",
  },
  {
    tab: "Blockchain",
    title: { pre: "Make ", strong: "Trust", post: " A Feature Across Partners" },
    body:
      "We implement auditable ledgers and identity patterns to reduce disputes, improve transparency, and streamline settlement.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Blockchain abstract",
  },

  {
    tab: "Big data",
    title: { pre: "Turn ", strong: "Big Data", post: " Into Faster Decisions" },
    body:
      "Modernize warehouses, unify analytics, and deliver dashboards that teams actually use—fast, reliable, and cost-efficient.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Big data charts",
  },
  {
    tab: "Big data",
    title: { pre: "Scale ", strong: "Pipelines", post: " Without Breaking Costs" },
    body:
      "Streaming + batch architectures built with observability and governance—so performance stays predictable under load.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Data pipelines",
  },

  {
    tab: "Computer vision",
    title: { pre: "Deploy ", strong: "Computer Vision", post: " Where It Matters" },
    body:
      "Visual inspection, OCR and monitoring that reduces errors and accelerates operations across devices and edge.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image:
      "https://images.unsplash.com/photo-1581091870622-2b7b5b4c2a58?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Computer vision robotics",
  },
  {
    tab: "Computer vision",
    title: { pre: "Automate ", strong: "Quality", post: " Checks With Vision AI" },
    body:
      "Build robust models and repeatable training pipelines designed for real-world conditions—no fragile demos.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Vision code",
  },

  {
    tab: "Mixed reality",
    title: { pre: "Train ", strong: "Teams", post: " Faster With Mixed Reality" },
    body:
      "Create guided onboarding and task assistance—reducing costs while boosting safety and performance at scale.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Mixed reality",
  },
  {
    tab: "Mixed reality",
    title: { pre: "Design ", strong: "Immersive", post: " Product Experiences" },
    body:
      "Interactive demos and spatial storytelling that helps customers understand value instantly—across devices.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image:
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "VR headset",
  },

  {
    tab: "Internet of things",
    title: { pre: "Connect ", strong: "Devices", post: " Securely With IoT" },
    body:
      "We build IoT platforms that ingest telemetry, trigger actions, and keep fleets secure—without operational chaos.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "IoT circuit",
  },
  {
    tab: "Internet of things",
    title: { pre: "Monitor ", strong: "Everything", post: " In Real Time" },
    body: "Unified dashboards, alerts, and device management workflows designed for reliability and scale.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "IoT monitoring",
  },
];

export default function WhatsNewAtLattech() {
  const [activeTab, setActiveTab] = useState<TabKey>("Artificial intelligence");
  const [page, setPage] = useState(0);

  const pages = useMemo(() => SLIDES.filter((s) => s.tab === activeTab), [activeTab]);
  const current = pages[page] ?? pages[0];

  const onTab = (t: TabKey) => {
    setActiveTab(t);
    setPage(0);
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1180px] px-6 pb-16 pt-14 md:pb-20 md:pt-16">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-[40px] font-light leading-none tracking-[-0.01em] text-[#6b6b6b] md:text-[52px]">
            What’s <span className="font-semibold text-[#55B948]">New</span>{" "}
            <span className="font-light text-[#6b6b6b]">at Lattech</span>
          </h2>

          {/* Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-[13px] font-medium text-[#8a8a8a]">
            {TABS.map((t) => {
              const active = t === activeTab;
              return (
                <button
                  key={t}
                  onClick={() => onTab(t)}
                  className={`relative pb-[10px] transition ${
                    active ? "text-[#55B948]" : "hover:text-[#6f6f6f]"
                  }`}
                >
                  {t}
                  <span
                    className={`absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full transition ${
                      active ? "bg-[#55B948]" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-[2px] h-px w-[760px] max-w-full bg-[#e7e7e7]" />
        </div>

        {/* Card */}
        <div className="mt-10">
          <div className="relative overflow-hidden rounded-[52px] bg-[#f6f8fb] shadow-[0_16px_55px_rgba(0,0,0,0.07)]">
            <div className="relative min-h-[440px]">
              {/* FULL BACKGROUND IMAGE */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${page}-bg`}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.img
                    src={current.image}
                    alt={current.imageAlt}
                    className="h-full w-full object-cover"
                    draggable={false}
                    initial={{ scale: 1.06, x: 10 }}
                    animate={{ scale: 1.02, x: 0 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* EXACT WHITE FADE (soft wash like screenshot) */}
              <div className="pointer-events-none absolute inset-0">
                {/* left soft wash */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,248,251,0.98)_0%,rgba(246,248,251,0.94)_40%,rgba(246,248,251,0.70)_55%,rgba(246,248,251,0.0)_72%)]" />
                {/* subtle top-left haze */}
                <div className="absolute left-0 top-0 h-full w-[55%] bg-[radial-gradient(520px_320px_at_20%_30%,rgba(255,255,255,0.55),transparent_62%)]" />
              </div>

              {/* CONTENT (VERTICALLY CENTERED) */}
              <div className="relative z-10 flex min-h-[440px] items-center">
                <div className="w-full px-10 md:w-[58%] md:px-14">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeTab}-${page}-content`}
                      initial={{ opacity: 0, y: 10, filter: "blur(8px)" as any }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" as any }}
                      exit={{ opacity: 0, y: -10, filter: "blur(8px)" as any }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h3 className="max-w-[520px] text-[30px] font-light leading-[1.18] text-[#6b6b6b] md:text-[34px]">
                        {current.title.pre}
                        <span className="font-semibold text-[#5a5a5a]">
                          {current.title.strong}
                        </span>
                        <span className="text-[#6b6b6b]">{current.title.post}</span>
                      </h3>

                      <p className="mt-4 max-w-[540px] text-[14px] leading-6 text-[#8a8a8a] md:text-[15px]">
                        {current.body}
                      </p>

                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <button className="rounded-full bg-[#ff7a1a] px-6 py-[11px] text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(255,122,26,0.18)] transition hover:bg-[#f26f10] active:brightness-95">
                          {current.cta1}
                        </button>

                        <button className="rounded-full border border-[#55B948] bg-transparent px-6 py-[11px] text-[13px] font-semibold text-[#55B948] transition hover:bg-[#55B948]/10 active:bg-[#55B948]/15">
                          {current.cta2}
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Dots */}
              <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-[8px]">
                {pages.map((_, i) => {
                  const active = i === page;
                  return (
                    <button
                      key={i}
                      aria-label={`Go to page ${i + 1}`}
                      onClick={() => setPage(i)}
                      className={`h-[8px] w-[8px] rounded-full transition ${
                        active ? "bg-[#ff7a1a]" : "bg-[#cfcfcf]"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
