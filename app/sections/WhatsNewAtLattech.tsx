"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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
    title: { pre: "Getting ", strong: "Started", post: " with Lattech is Easier than ever" },
    body:
      "Our experts help mid-sized and large firms build, test, protect, manage, migrate and optimize digital solutions ensuring they’re always up and running and achieve the optimal TCO.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "AI city blocks",
  },
  {
    tab: "Artificial intelligence",
    title: { pre: "Build ", strong: "Smarter", post: " Operations With Practical AI" },
    body:
      "From data strategy to production models, we help teams ship AI that improves decisions, automation, and customer experiences—safely and reliably.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "AI server room",
  },

  {
    tab: "Blockchain",
    title: { pre: "Enterprise ", strong: "Blockchain", post: " Built For Real Use Cases" },
    body:
      "Design verifiable workflows, secure integrations, and governance-ready systems that scale beyond proofs of concept.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image: "https://images.unsplash.com/photo-1639322537231-2f206e06af84?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Blockchain network",
  },
  {
    tab: "Blockchain",
    title: { pre: "Make ", strong: "Trust", post: " A Feature Across Partners" },
    body:
      "We implement auditable ledgers and identity patterns to reduce disputes, improve transparency, and streamline settlement.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Blockchain abstract",
  },

  {
    tab: "Big data",
    title: { pre: "Turn ", strong: "Big Data", post: " Into Faster Decisions" },
    body:
      "Modernize warehouses, unify analytics, and deliver dashboards that teams actually use—fast, reliable, and cost-efficient.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Big data charts",
  },
  {
    tab: "Big data",
    title: { pre: "Scale ", strong: "Pipelines", post: " Without Breaking Costs" },
    body:
      "Streaming + batch architectures built with observability and governance—so performance stays predictable under load.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Data pipelines",
  },

  {
    tab: "Computer vision",
    title: { pre: "Deploy ", strong: "Computer Vision", post: " Where It Matters" },
    body:
      "Visual inspection, OCR and monitoring that reduces errors and accelerates operations across devices and edge.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image: "https://images.unsplash.com/photo-1581091870622-2b7b5b4c2a58?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Computer vision robotics",
  },
  {
    tab: "Computer vision",
    title: { pre: "Automate ", strong: "Quality", post: " Checks With Vision AI" },
    body:
      "Build robust models and repeatable training pipelines designed for real-world conditions—no fragile demos.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Vision code",
  },

  {
    tab: "Mixed reality",
    title: { pre: "Train ", strong: "Teams", post: " Faster With Mixed Reality" },
    body:
      "Create guided onboarding and task assistance—reducing costs while boosting safety and performance at scale.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Mixed reality",
  },
  {
    tab: "Mixed reality",
    title: { pre: "Design ", strong: "Immersive", post: " Product Experiences" },
    body:
      "Interactive demos and spatial storytelling that helps customers understand value instantly—across devices.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "VR headset",
  },

  {
    tab: "Internet of things",
    title: { pre: "Connect ", strong: "Devices", post: " Securely With IoT" },
    body:
      "We build IoT platforms that ingest telemetry, trigger actions, and keep fleets secure—without operational chaos.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "IoT circuit",
  },
  {
    tab: "Internet of things",
    title: { pre: "Monitor ", strong: "Everything", post: " In Real Time" },
    body: "Unified dashboards, alerts, and device management workflows designed for reliability and scale.",
    cta1: "Schedule a demo",
    cta2: "Chat with our expert",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "IoT monitoring",
  },
];

export default function WhatsNewAtLattech() {
  const [activeTab, setActiveTab] = useState<TabKey>("Artificial intelligence");
  const [page, setPage] = useState(0);

  // NEW: direction for swipe animation (+1 next, -1 prev)
  const [dir, setDir] = useState<1 | -1>(1);

  // NEW: autoplay controls
  const AUTOPLAY_MS = 5000;
  const RESUME_AFTER_INTERACTION_MS = 3500;

  const pages = useMemo(() => SLIDES.filter((s) => s.tab === activeTab), [activeTab]);
  const current = pages[page] ?? pages[0];

  // NEW: pause on hover + short pause after any interaction
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  const pauseBriefly = () => {
    setUserPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setUserPaused(false), RESUME_AFTER_INTERACTION_MS);
  };

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  const goTo = (nextIndex: number) => {
    const len = pages.length || 1;
    const normalized = ((nextIndex % len) + len) % len;
    setPage(normalized);
  };

  const next = () => {
    setDir(1);
    goTo(page + 1);
  };

  const prev = () => {
    setDir(-1);
    goTo(page - 1);
  };

  const onTab = (t: TabKey) => {
    setActiveTab(t);
    setPage(0);
    setDir(1);
    pauseBriefly();
  };

  // NEW: autoplay effect
  useEffect(() => {
    if (pages.length <= 1) return;
    if (hovered) return;
    if (userPaused) return;

    const id = window.setInterval(() => {
      // set direction and advance
      setDir(1);
      setPage((p) => (p + 1) % pages.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [pages.length, hovered, userPaused, AUTOPLAY_MS]);

  // NEW: swipe handlers
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    if (!e.touches?.[0]) return;
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    pauseBriefly();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    const dx = touchDeltaX.current;
    touchStartX.current = null;
    touchDeltaX.current = 0;

    // threshold tuned for "phone card"
    const THRESH = 45;
    if (dx <= -THRESH) next(); // swipe left -> next
    else if (dx >= THRESH) prev(); // swipe right -> prev
  };

  // NEW: animation variants (slide in/out with direction)
  const bgVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 18 : -18, scale: 1.06 }),
    center: { opacity: 1, x: 0, scale: 1.02 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -18 : 18, scale: 1.02 }),
  };

  const contentVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 14 : -14, y: 10, filter: "blur(8px)" }),
    center: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -14 : 14, y: -10, filter: "blur(8px)" }),
  };

  return (
    <section className="w-full bg-white">
      <style jsx global>{`
        /* hide scrollbar for the mobile tabs */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-14 md:pb-20 md:pt-16">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-[40px] font-Regular leading-none tracking-[-0.01em] text-[#595A5A] md:text-[48px]">
            What’s <span className="font-semibold text-[#56BC2F]">New</span>{" "}
            <span className="font-Regular text-[#6b6b6b]">at Lattech</span>
          </h2>

          {/* Tabs (mobile = horizontal scroll like screenshot) */}
          <div className="mt-8">
            <div className="no-scrollbar -mx-6 overflow-x-auto px-6">
              <div className="flex w-max items-center justify-start gap-6 whitespace-nowrap text-[18px] font-medium text-[#737373] md:w-full md:justify-center md:gap-8">
                {TABS.map((t) => {
                  const active = t === activeTab;
                  return (
                    <button
                      key={t}
                      onClick={() => onTab(t)}
                      className={`relative pb-[10px] transition ${
                        active ? "text-[#56BC2F]" : "hover:text-[#6f6f6f]"
                      }`}
                    >
                      {t}
                      <span
                        className={`absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full transition ${
                          active ? "bg-[#56BC2F]" : "bg-transparent"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mx-auto mt-[2px] h-px w-[760px] max-w-full bg-[#e7e7e7]" />
          </div>
        </div>

        {/* Card */}
        <div className="mt-10">
          {/* mobile phone frame sizing */}
          <div className="mx-auto w-full max-w-[420px] md:max-w-none">
            <div
              className="relative overflow-hidden rounded-[52px] bg-[#f6f8fb] shadow-[0_16px_55px_rgba(0,0,0,0.07)] md:rounded-[52px]"
              // NEW: pause autoplay when hovering desktop
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              // NEW: swipe on phone area
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Taller on mobile like screenshot */}
              <div className="relative min-h-[560px] md:min-h-[440px]">
                {/* FULL BACKGROUND IMAGE */}
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={`${activeTab}-${page}-bg`}
                    className="absolute inset-0"
                    custom={dir}
                    variants={bgVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.img
                      src={current.image}
                      alt={current.imageAlt}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Overlays: Desktop vs Mobile */}
                <div className="pointer-events-none absolute inset-0">
                  {/* DESKTOP wash (your original) */}
                  <div className="hidden md:block absolute inset-0 bg-[linear-gradient(90deg,rgba(246,248,251,0.98)_0%,rgba(246,248,251,0.94)_40%,rgba(246,248,251,0.70)_55%,rgba(246,248,251,0.0)_72%)]" />
                  <div className="hidden md:block absolute left-0 top-0 h-full w-[55%] bg-[radial-gradient(520px_320px_at_20%_30%,rgba(255,255,255,0.55),transparent_62%)]" />

                  {/* MOBILE wash (more like screenshot: white top, image visible bottom) */}
                  <div className="md:hidden absolute inset-0 bg-[linear-gradient(180deg,rgba(246,248,251,0.98)_0%,rgba(246,248,251,0.96)_35%,rgba(246,248,251,0.70)_55%,rgba(246,248,251,0.20)_72%,rgba(246,248,251,0.0)_86%)]" />
                  <div className="md:hidden absolute inset-0 bg-[radial-gradient(420px_280px_at_30%_18%,rgba(255,255,255,0.60),transparent_64%)]" />
                  {/* tiny bottom vignette so buttons pop */}
                  <div className="md:hidden absolute bottom-0 left-0 right-0 h-[180px] bg-[linear-gradient(180deg,rgba(0,0,0,0.0)_0%,rgba(0,0,0,0.10)_100%)]" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 flex min-h-[560px] items-start md:min-h-[440px] md:items-center">
                  <div className="w-full px-8 pt-12 md:w-[58%] md:px-14 md:pt-0">
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div
                        key={`${activeTab}-${page}-content`}
                        custom={dir}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <h3 className="max-w-[520px] text-[34px] font-Regular leading-[1.12] text-[#6b6b6b] md:text-[34px]">
                          {current.title.pre}
                          <span className="font-semibold text-[#5a5a5a]">{current.title.strong}</span>
                          <span className="text-[#6b6b6b]">{current.title.post}</span>
                        </h3>

                        <p className="mt-5 max-w-[540px] text-[14px] leading-6 text-[#8a8a8a] md:text-[16px]">
                          {current.body}
                        </p>

                        {/* Buttons (mobile stacked full-width like screenshot) */}
                        <div className="mt-10 flex flex-col items-center gap-4 md:mt-8 md:flex-row md:items-center md:gap-4">
                          <button
                            onClick={() => pauseBriefly()}
                            className="w-full max-w-[320px] rounded-full bg-[#ff7a1a] px-6 py-[12px] text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(255,122,26,0.18)] transition hover:bg-[#f26f10] active:brightness-95 md:w-auto md:max-w-none md:text-[16px]"
                          >
                            {current.cta1}
                          </button>

                          <button
                            onClick={() => pauseBriefly()}
                            className="w-full max-w-[320px] rounded-full bg-[#55B948] px-6 py-[12px] text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(85,185,72,0.18)] transition hover:brightness-95 active:brightness-90 md:w-auto md:max-w-none md:border md:border-[#55B948] md:bg-transparent md:text-[#55B948] md:shadow-none md:hover:bg-[#55B948]/10 md:text-[16px]"
                          >
                            {current.cta2}
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Dots (inside bottom like screenshot) */}
                <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-[10px]">
                  {pages.map((_, i) => {
                    const active = i === page;
                    return (
                      <button
                        key={i}
                        aria-label={`Go to page ${i + 1}`}
                        onClick={() => {
                          setDir(i > page ? 1 : -1);
                          setPage(i);
                          pauseBriefly();
                        }}
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
          {/* end frame */}
        </div>
      </div>
    </section>
  );
}
