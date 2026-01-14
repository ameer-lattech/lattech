"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Fact = {
  value: number;
  suffix?: string;
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);

  const targets = useMemo(() => FACTS.map((f) => f.value), []);
  const [counts, setCounts] = useState<number[]>(() => targets.map(() => 0));

  // ✅ Start when section enters viewport (reliable on all devices)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let hasStarted = false;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!hasStarted && entry.isIntersecting) {
          hasStarted = true;
          setStarted(true);
          io.disconnect();
        }
      },
      {
        // Starts a bit before it's fully visible (feels natural on mobile)
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -15% 0px",
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ✅ Counter animation
  useEffect(() => {
    if (!started) return;

    const duration = 1100;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);

      setCounts(targets.map((v) => Math.round(v * eased)));

      if (t < 1) requestAnimationFrame(tick);
      else setCounts(targets);
    };

    requestAnimationFrame(tick);
  }, [started, targets]);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="mx-auto max-w-[1200px] px-6 pt-[70px] pb-[80px]">
        {/* Desktop/Tablet heading stays outside (mobile hides it) */}
        <div className="hidden text-center md:block">
          <h2 className="text-[44px] md:text-[52px] font-medium tracking-[-0.02em] text-[#6A6A6A]">
            Key <span className="font-semibold text-[#43B02A]">Facts</span> about Lattech
          </h2>

          <p className="mx-auto mt-4 max-w-[900px] text-[14px] leading-[1.9] text-[#7A7A7A]">
            We are a dynamic software development firm, blending innovative strategies with technical precision to deliver
            intuitive, user-focused solutions that address complex challenges and boost business performance.
          </p>
        </div>

        {/* Card */}
        <div className="mt-[56px] flex justify-center">
          <div
            className="
              w-full
              max-w-[360px] md:max-w-[1280px]
              rounded-[46px] md:rounded-[80px]
              bg-[#F7F7F7]
              px-6 py-10 md:px-16 md:py-14
              text-center
            "
          >
            {/* Mobile heading INSIDE card (matches your screenshot structure) */}
            <div className="md:hidden">
              <h3 className="text-[28px] font-medium leading-[1.15] text-[#6A6A6A]">
                Our Industry <br /> Expertise
              </h3>

              <p className="mx-auto mt-4 max-w-[280px] text-[13px] leading-[1.9] text-[#7A7A7A]">
                We are a dynamic software development firm, blending innovative strategies with technical precision to deliver
                intuitive, user-focused solutions that address complex challenges and boost business performance.
              </p>

              <div className="mt-8 h-px w-full bg-black/5" />
            </div>

            {/* ✅ Mobile = 1 column (stacked), md+ = 4 columns */}
            <div className="mt-8 md:mt-0 grid grid-cols-1 gap-y-10 md:grid-cols-4 md:gap-y-0 text-center">
              {FACTS.map((f, i) => (
                <div key={f.label}>
                  <div className="text-[52px] md:text-[64px] font-semibold leading-none text-[#56BC2F]">
                    {formatNumber(counts[i])}
                    {f.suffix ?? ""}
                  </div>

                  <div className="mt-2 text-[13px] font-semibold text-[#6F6F6F]">
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
