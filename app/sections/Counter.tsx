"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Fact = {
  value: number;
  suffix?: string;
  label: string;
};

// ✅ Only 3 stats for BOTH desktop + mobile
const FACTS: Fact[] = [
  { value: 36, label: "years of expertise" },
  { value: 750, suffix: "+", label: "IT professionals" },
  { value: 4200, suffix: "+", label: "success stories" },
];

function formatNumber(n: number) {
  return n.toLocaleString();
}

export default function KeyFactsCounter() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);

  const targets = useMemo(() => FACTS.map((f) => f.value), []);
  const [counts, setCounts] = useState<number[]>(() => targets.map(() => 0));

  // start when visible
  useEffect(() => {
    if (!wrapRef.current) return;

    const el = wrapRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // animate numbers once
  useEffect(() => {
    if (!started) return;

    const duration = 1100;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);

      setCounts(targets.map((target) => Math.round(target * eased)));

      if (t < 1) requestAnimationFrame(tick);
      else setCounts(targets);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, targets]);

  return (
    <section className="w-full bg-white">
      <style jsx global>{`
        @media (max-width: 640px) {
          .facts-pill {
            border-radius: 44px !important;
            padding-left: 22px !important;
            padding-right: 22px !important;
          }
          .facts-title {
            font-size: 36px !important;
            line-height: 1.06 !important;
          }
          .facts-desc {
            font-size: 14px !important;
            line-height: 1.9 !important;
          }
          .fact-value {
            font-size: 54px !important;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1200px] px-6 py-14 md:py-16">
        {/* ✅ Desktop heading (kept) */}
        <div className="hidden md:block text-center">
          <h2 className="text-[44px] font-medium leading-tight tracking-[-0.02em] text-[#5C5C5C]">
            Key <span className="text-[#43B02A] font-semibold">Facts</span> about Lattech
          </h2>

          <p className="mx-auto mt-4 max-w-[880px] text-[14px] leading-[1.9] text-[#777777]">
            We are a dynamic software development firm, blending innovative strategies with technical precision to deliver
            intuitive, user-focused solutions that address complex challenges and boost business performance.
          </p>
        </div>

        {/* Pill */}
        <div ref={wrapRef} className="mt-0 md:mt-12 flex justify-center">
          <div className="facts-pill w-full max-w-[1280px] rounded-[70px] bg-[#FFF3EE] px-7 py-10 md:px-14 md:py-14">
            {/* ✅ Mobile heading inside pill (like screenshot) */}
            <div className="md:hidden text-center">
              <h2 className="facts-title text-[38px] font-medium leading-tight tracking-[-0.02em] text-[#5C5C5C]">
                Our Industry <br /> Expertise
              </h2>

              <p className="facts-desc mx-auto mt-4 max-w-[320px] text-[14px] leading-[1.95] text-[#777777]">
                We are a dynamic software development firm, blending innovative strategies with technical precision to deliver
                intuitive, user-focused solutions that address complex challenges and boost business performance.
              </p>
            </div>

            {/* ✅ Same 3 stats on BOTH desktop & mobile */}
            <div className="mt-10 grid grid-cols-1 gap-y-12 text-center md:mt-0 md:grid-cols-3 md:gap-y-0">
              {FACTS.map((f, i) => (
                <div key={f.label}>
                  <div className="fact-value text-[56px] font-semibold leading-none text-[#FF6A00]">
                    {formatNumber(counts[i] ?? 0)}
                    {f.suffix ?? ""}
                  </div>
                  <div className="mt-3 text-[14px] font-medium text-[#6E6E6E]">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
