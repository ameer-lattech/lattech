// sections/CaseStudies.tsx
"use client";

import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type CaseStudy = {
  tag: string;
  heading: string;
  sub: string;
  brand: string;
  quote: string;
  body: string;
  bullets: string[];
  image: string;
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CaseStudies() {
  const data: CaseStudy[] = useMemo(
    () => [
      {
        tag: "Case Studies",
        heading: "See How Strategic Digital\nMarketing Transforms Brands",
        sub: "See how 360° marketing boosts brand awareness, drives targeted traffic, and\nincreases conversions.",
        brand: "IPSUM",
        quote: "“AI integration helped ScaleByte\nclose 3x more deals in less time”",
        body:
          "ScaleByte’s sales team struggled with follow-up delays.\n" +
          "Our AI sales assistant automated outreach, lead scoring,\n" +
          "and CRM updates—resulting in faster responses and\n" +
          "more closed deals.",
        bullets: ["3x More Deals", "40% Faster Responses", "95% Lead Accuracy", "CRM Fully Synced"],
        image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
      },
      {
        tag: "Case Studies",
        heading: "See How Strategic Digital\nMarketing Transforms Brands",
        sub: "See how 360° marketing boosts brand awareness, drives targeted traffic, and\nincreases conversions.",
        brand: "NOVA",
        quote: "“A new SEO + content engine\nincreased qualified leads fast”",
        body:
          "Nova needed consistent inbound growth without increasing ad spend.\n" +
          "We rebuilt their technical SEO, launched a content roadmap,\n" +
          "and optimized conversion flows—driving compounding results.",
        bullets: ["2.1x Organic Leads", "32% Lower CPA", "Top 3 Rankings", "Higher CVR"],
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80",
      },
      {
        tag: "Case Studies",
        heading: "See How Strategic Digital\nMarketing Transforms Brands",
        sub: "See how 360° marketing boosts brand awareness, drives targeted traffic, and\nincreases conversions.",
        brand: "ORBIT",
        quote: "“Lifecycle automation improved\nretention and LTV”",
        body:
          "Orbit’s onboarding had drop-offs and low repeat usage.\n" +
          "We deployed lifecycle campaigns, segmentation, and A/B testing\n" +
          "across channels—improving retention and lifetime value.",
        bullets: ["+18% Retention", "1.4x LTV", "Faster Onboarding", "Better NPS"],
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const goTo = useCallback(
    (nextIndex: number, direction: 1 | -1) => {
      setDir(direction);
      setActive(() => {
        const n = data.length;
        return (nextIndex + n) % n;
      });
    },
    [data.length]
  );

  const next = useCallback(() => goTo(active + 1, 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1, -1), [active, goTo]);

  const cs = data[active];

  return (
    <section
      className="relative w-full overflow-hidden bg-black px-6 py-24 font-sans md:py-28"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_50%_0%,rgba(255,255,255,0.05),rgba(0,0,0,0.9)_60%,rgba(0,0,0,1)_100%)]" />
        <div className="absolute left-1/2 top-[-160px] h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),rgba(168,85,247,0.06)_45%,transparent_70%)] blur-3xl opacity-75" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* header */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md shadow-[0_14px_34px_rgba(0,0,0,0.6)]">
            {cs.tag}
          </span>

          <h2 className="mt-8 text-4xl font-semibold leading-[1.05] tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)] md:text-6xl">
            {cs.heading.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/60 md:text-lg">
            {cs.sub.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br className={i === 0 ? "hidden md:block" : ""} />
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* content */}
        <div className="mt-16 grid grid-cols-1 items-center gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
          {/* image */}
          <div className="flex justify-center md:justify-start">
            <motion.div
              className="relative w-full max-w-[520px] cursor-grab select-none"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.14}
              whileTap={{ cursor: "grabbing" }}
              onDragEnd={(_, info) => {
                const offset = info.offset.x;
                const velocity = info.velocity.x;

                // premium swipe feel: either distance or "flick" velocity
                const swipePower = Math.abs(offset) * Math.abs(velocity);
                const shouldSwipe = Math.abs(offset) > 80 || swipePower > 12000;

                if (!shouldSwipe) return;

                if (offset < 0) next();
                else prev();
              }}
            >
              <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_40%_20%,rgba(255,255,255,0.08),transparent_60%)] blur-3xl opacity-70" />

              <div className="relative overflow-hidden rounded-[22px] bg-white/[0.04] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.78)] ring-1 ring-white/10">
                <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-black/40">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={cs.image}
                      initial={{ opacity: 0, x: dir === 1 ? 22 : -22, scale: 1.02 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: dir === 1 ? -22 : 22, scale: 1.02 }}
                      transition={{ duration: 0.55, ease }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={cs.image}
                        alt={`${cs.brand} case study`}
                        fill
                        sizes="(max-width: 768px) 90vw, 520px"
                        priority={active === 0}
                        className="object-cover"
                      />

                      {/* overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_30%_20%,rgba(0,0,0,0),rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.65)_100%)]" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* arrows */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
                <button
                  type="button"
                  onClick={prev}
                  className="pointer-events-auto hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition hover:bg-white/10 md:flex"
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="pointer-events-auto hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition hover:bg-white/10 md:flex"
                  aria-label="Next"
                >
                  →
                </button>
              </div>
            </motion.div>
          </div>

          {/* right text */}
          <div className="text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={cs.brand}
                initial={{ opacity: 0, y: 14, x: dir === 1 ? 8 : -8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 14, x: dir === 1 ? -8 : 8 }}
                transition={{ duration: 0.55, ease }}
              >
                <div className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  {cs.brand}
                </div>

                <div className="mt-6 text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl">
                  {cs.quote.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>

                <p className="mt-4 max-w-xl text-base leading-7 text-white/60 md:text-lg">
                  {cs.body.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>

                <div className="mt-8 text-sm font-medium text-white/70">Impact :</div>
                <ul className="mt-4 space-y-2 text-sm text-white/75">
                  {cs.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* hint */}
        <div className="mt-14 flex items-center justify-center gap-4 text-[12px] tracking-[0.22em] text-white/40">
          <span aria-hidden="true" className="text-white/30">
            ←
          </span>
          <span>DRAG TO EXPLORE</span>
          <span aria-hidden="true" className="text-white/30">
            →
          </span>
        </div>

        {/* dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > active ? 1 : -1)}
              aria-label={`Go to case study ${i + 1}`}
              className={[
                "h-2.5 w-2.5 rounded-full transition",
                i === active ? "bg-white/70" : "bg-white/15 hover:bg-white/25",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
