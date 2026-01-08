"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Fact = {
  value: number;
  suffix?: string; // + etc
  label: string;
};

const FACTS: Fact[] = [
  { value: 36, label: "years of expertise" },
  { value: 750, suffix: "+", label: "IT professionals" },
  { value: 4200, suffix: "+", label: "success stories" },
  { value: 30, suffix: "+", label: "industries covered" },
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

    const duration = 1100; // ms (close to ref feel)
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      // easeOutCubic
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
      <div className="mx-auto w-full max-w-[1200px] px-6 py-14 md:py-16">
        {/* heading */}
        <div className="text-center">
          <h2 className="text-[44px] font-medium leading-tight tracking-[-0.02em] text-[#5C5C5C]">
            Key <span className="text-[#43B02A] font-semibold">Facts</span> about Lattech
          </h2>

          <p className="mx-auto mt-4 max-w-[880px] text-[14px] leading-[1.9] text-[#777777]">
            We are a dynamic software development firm, blending innovative strategies with technical precision to deliver
            intuitive, user-focused solutions that address complex challenges and boost business performance.
          </p>
        </div>

        {/* pill */}
        <div ref={wrapRef} className="mt-12 flex justify-center">
          <div className="w-full max-w-[1060px] rounded-[70px] bg-[#FFF3EE] px-8 py-12 md:px-14 md:py-14">
            <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0">
              {FACTS.map((f, i) => (
                <div key={f.label} className="text-center">
                  <div className="text-[56px] font-semibold leading-none text-[#FF6A00]">
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
