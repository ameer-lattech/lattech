"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "Healthcare" | "Finance" | "Real Estate" | "Engineering" | "E-commerce";
type Story = {
  id: string;
  category: Category;
  title: string;
  description: string;
  image: string;
};

const CATEGORIES: Category[] = ["Healthcare", "Finance", "Real Estate", "Engineering", "E-commerce"];

const ALL_STORIES: Story[] = [
  {
    id: "stellan",
    category: "Healthcare",
    title: "Stellan Skarsgård",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue interdum ligula a dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis orci elementum egestas lobortis.",
    image: "https://picsum.photos/id/1067/1800/1000",
  },
  {
    id: "globe",
    category: "Healthcare",
    title: "Globetrotter",
    description: "Sed lobortis orci elementum egestas lobortis. Praesent non tortor ac nulla facilisis bibendum.",
    image: "https://picsum.photos/id/1025/1800/1000",
  },
  {
    id: "carecase",
    category: "Healthcare",
    title: "CareCase",
    description: "Integer facilisis, arcu a volutpat pharetra, mauris lacus maximus enim.",
    image: "https://picsum.photos/id/1031/1800/1000",
  },
  {
    id: "finedge",
    category: "Finance",
    title: "FinEdge",
    description: "We built a modern financial experience with secure onboarding and real-time analytics for decision makers.",
    image: "https://picsum.photos/id/1060/1800/1000",
  },
  {
    id: "vaultpay",
    category: "Finance",
    title: "VaultPay",
    description: "A payments platform with scalable APIs, multi-tenant dashboards, and compliance-first design.",
    image: "https://picsum.photos/id/1018/1800/1000",
  },
];

function ArrowRight({ white = false }: { white?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke={white ? "white" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M13 6l6 6-6 6"
        stroke={white ? "white" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeft({ white = false }: { white?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5" stroke={white ? "white" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M11 18l-6-6 6-6"
        stroke={white ? "white" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalBadge() {
  return (
    <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#55B948]">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 17L17 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 7h7v7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** ✅ Independent: PREV card */
function PrevCard({ story, onPrev }: { story: Story; onPrev: () => void }) {
  return (
    <motion.div
      key={`prev-${story.id}`}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="absolute left-[-170px] top-[85px] z-0 h-[330px] w-[320px] overflow-hidden rounded-[44px] bg-gray-100 shadow-[0_26px_70px_rgba(0,0,0,0.12)]"
    >
      <img src={story.image} className="h-full w-full object-cover" draggable={false} alt="" />
      <div className="absolute inset-0 bg-white/75" />

      <button
        onClick={onPrev}
        aria-label="Previous"
        className="absolute left-[18px] top-1/2 z-10 flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center rounded-full bg-[#FF7A00] shadow-[0_18px_40px_rgba(255,122,0,0.35)] transition hover:scale-105"
      >
        <ArrowLeft white />
      </button>
    </motion.div>
  );
}

/** ✅ Independent: NEXT card */
function NextCard({ story, onNext }: { story: Story; onNext: () => void }) {
  return (
    <motion.div
      key={`next-${story.id}`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="absolute right-[-170px] top-[110px] z-[5] h-[280px] w-[290px] overflow-hidden rounded-[44px] bg-gray-100 shadow-[0_26px_70px_rgba(0,0,0,0.12)]"
    >
      <img src={story.image} className="h-full w-full object-cover" draggable={false} alt="" />
      <div className="absolute inset-0 bg-white/55" />

      <button
        onClick={onNext}
        aria-label="Next"
        className="absolute right-[18px] top-1/2 z-10 flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center rounded-full bg-[#FF7A00] shadow-[0_18px_40px_rgba(255,122,0,0.35)] transition hover:scale-105"
      >
        <ArrowRight white />
      </button>

      <div className="absolute bottom-[22px] left-[22px] right-[78px]">
        <p className="truncate text-[34px] font-light text-white drop-shadow-[0_14px_30px_rgba(0,0,0,0.40)]">
          {story.title}
        </p>
      </div>
    </motion.div>
  );
}

/** ✅ Independent: ACTIVE card (only this one drags) */
function ActiveCard({
  story,
  direction,
  hasNext,
  onNext,
  onSwipePrev,
  onSwipeNext,
}: {
  story: Story;
  direction: number;
  hasNext: boolean;
  onNext: () => void;
  onSwipePrev: () => void;
  onSwipeNext: () => void;
}) {
  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative z-10 h-[430px] w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={story.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;

            if (swipe < -10000) onSwipeNext();
            else if (swipe > 10000) onSwipePrev();
          }}
          className="absolute inset-0 cursor-grab rounded-[54px] shadow-[0_40px_110px_rgba(0,0,0,0.14)] active:cursor-grabbing"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[54px] bg-[#f3f5f7]">
            <img src={story.image} alt={story.title} className="h-full w-full object-cover" draggable={false} />

            <div className="absolute bottom-[26px] left-[28px] z-10">
              <p className="text-[64px] font-light leading-none tracking-[-0.02em] text-white drop-shadow-[0_16px_36px_rgba(0,0,0,0.48)]">
                {story.title}
              </p>
            </div>

            {hasNext && (
              <button
                onClick={onNext}
                aria-label="Next"
                className="absolute right-[22px] top-[22px] z-20 flex h-[54px] w-[54px] items-center justify-center rounded-full border border-[#FF7A00]/55 bg-white/65 text-[#FF7A00] shadow-[0_18px_40px_rgba(0,0,0,0.10)] backdrop-blur transition hover:bg-white"
              >
                <ArrowRight />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function WhatWeHaveBuilt() {
  const [activeCategory, setActiveCategory] = useState<Category>("Healthcare");
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const stories = useMemo(() => ALL_STORIES.filter((s) => s.category === activeCategory), [activeCategory]);

  useEffect(() => {
    setIdx(0);
    setDirection(0);
  }, [activeCategory]);

  // ✅ If category has fewer items than current idx, clamp back to 0
  useEffect(() => {
    if (idx > stories.length - 1) setIdx(0);
  }, [stories.length, idx]);

  const active = stories[idx] ?? null;
  const prev = active && idx > 0 ? stories[idx - 1] : null;
  const next = active && idx < stories.length - 1 ? stories[idx + 1] : null;

  const goNext = () => {
    if (!next) return;
    setDirection(1);
    setIdx((v) => v + 1);
  };

  const goPrev = () => {
    if (!prev) return;
    setDirection(-1);
    setIdx((v) => v - 1);
  };

  const jumpTo = (i: number) => {
    if (i === idx) return;
    setDirection(i > idx ? 1 : -1);
    setIdx(i);
  };

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-[44px] font-light tracking-tight text-[#6b6b6b] md:text-[54px]">
            What we have <span className="font-semibold text-[#55B948]">Built</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[760px] text-[13px] leading-relaxed text-[#8a8a8a]">
            With a wealth of experience across diverse sectors, we deliver tailored insights and solutions that drive tangible
            results for our valued partners.
          </p>
          <div className="mt-6 flex justify-center">
            <button className="group inline-flex h-[36px] items-center gap-2 rounded-full border border-[#55B948] bg-white px-5 text-[11px] font-semibold text-[#55B948] transition hover:bg-[#55B948]/5">
              View all success stories
              <span className="transition-transform group-hover:translate-x-0.5">
                <ArrowRight />
              </span>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mt-14 overflow-visible">
          <div className="relative mx-auto h-[500px] w-full max-w-[860px]">
            {/* ✅ EMPTY STATE (prevents crash) */}
            {!active ? (
              <div className="flex h-[430px] w-full items-center justify-center rounded-[54px] bg-[#f3f5f7] shadow-[0_40px_110px_rgba(0,0,0,0.08)]">
                <div className="text-center">
                  <p className="text-[22px] font-semibold text-[#6b6b6b]">No stories yet</p>
                  <p className="mt-2 text-[13px] text-[#9a9a9a]">Add items to this category to display them here.</p>
                </div>
              </div>
            ) : (
              <>
                {/* Independent PREV */}
                <AnimatePresence>{prev && <PrevCard story={prev} onPrev={goPrev} />}</AnimatePresence>

                {/* Independent NEXT */}
                <AnimatePresence>{next && <NextCard story={next} onNext={goNext} />}</AnimatePresence>

                {/* Independent ACTIVE */}
                <ActiveCard
                  story={active}
                  direction={direction}
                  hasNext={!!next}
                  onNext={goNext}
                  onSwipePrev={() => {
                    if (prev) goPrev();
                  }}
                  onSwipeNext={() => {
                    if (next) goNext();
                  }}
                />

                {/* Dots */}
                <div className="mt-7 flex justify-center gap-[10px]">
                  {stories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => jumpTo(i)}
                      className={
                        i === idx
                          ? "h-[7px] w-[34px] rounded-full bg-[#FF7A00] transition-all"
                          : "h-[7px] w-[7px] rounded-full bg-[#DDDDDD] transition-all hover:bg-[#BBBBBB]"
                      }
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={
                c === activeCategory
                  ? "h-[34px] rounded-full bg-[#FF7A00] px-6 text-[11px] font-semibold text-white shadow-[0_14px_26px_rgba(255,122,0,0.22)] transition"
                  : "h-[34px] rounded-full bg-[#F3F4F6] px-6 text-[11px] font-semibold text-[#8a8a8a] transition hover:bg-[#ECEEF1]"
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-9 text-center">
          {active ? (
            <>
              <div className="inline-flex items-center gap-3">
                <h3 className="text-[42px] font-light tracking-[-0.01em] text-[#6b6b6b]">{active.title}</h3>
                <ExternalBadge />
              </div>
              <p className="mx-auto mt-4 max-w-[760px] text-[13px] leading-[2.0] text-[#9a9a9a]">{active.description}</p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-3">
                <h3 className="text-[42px] font-light tracking-[-0.01em] text-[#6b6b6b]">—</h3>
                <ExternalBadge />
              </div>
              <p className="mx-auto mt-4 max-w-[760px] text-[13px] leading-[2.0] text-[#9a9a9a]">
                Select a category that has stories, or add stories for this category.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
