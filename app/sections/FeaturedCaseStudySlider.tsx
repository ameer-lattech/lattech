"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  brand: string;
  desc: string;
  statLabel: string;
  statValue: string;
  statSuffix: string;
  image: string;
  review: {
    quote: string;
    name: string;
    role: string;
    avatar: string;
  };
};

export default function FeaturedCaseStudy() {
  const SLIDES: Slide[] = useMemo(
    () => [
      {
        brand: "QuickCard",
        desc:
          "From escaping expensive out-of-contract rates to securing a renewable contract, find out how Double Eleven partnered with Lattech for game-changing POS Software industry sales advice.",
        statLabel: "POS procurement sales",
        statValue: "300k",
        statSuffix: "GBP",
        image:
          "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80",
        review: {
          quote:
            "“Lattech are not only really easy to deal with, they have a brilliant innovation desk that has enabled us to stay resilient and make sales during a volatile procurement period.”",
          name: "M. Harris",
          role: "Facilities Manager at QuickCard",
          avatar:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=240&q=70",
        },
      },
      {
        brand: "PayFlex",
        desc:
          "Lattech helped PayFlex modernise its in-store payment experience, reducing operational costs while improving checkout speed across hundreds of locations.",
        statLabel: "Annual savings",
        statValue: "180k",
        statSuffix: "GBP",
        image:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=80",
        review: {
          quote:
            "“The results were immediate. Lattech understood our needs and delivered a solution that scaled effortlessly with our growth.”",
          name: "Sarah Collins",
          role: "Operations Director at PayFlex",
          avatar:
            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=240&q=70",
        },
      },
      {
        brand: "TapNova",
        desc:
          "TapNova partnered with Lattech to redesign their POS rollout strategy—improving reliability, reducing downtime, and increasing customer satisfaction nationwide.",
        statLabel: "Deployment uplift",
        statValue: "42%",
        statSuffix: "YOY",
        image:
          "https://images.unsplash.com/photo-1556741533-f6acd647d2fb?auto=format&fit=crop&w=1400&q=80",
        review: {
          quote:
            "“From planning to execution, Lattech brought clarity and speed. We shipped faster, with fewer issues, and a much better user experience.”",
          name: "A. Raymond",
          role: "Head of Product at TapNova",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=70",
        },
      },
      {
        brand: "Cardigo",
        desc:
          "Cardigo used Lattech’s advisory to consolidate vendors, stabilise procurement, and roll out a smoother checkout experience across multiple regions.",
        statLabel: "Cost reduction",
        statValue: "24%",
        statSuffix: "AVG",
        image:
          "https://images.unsplash.com/photo-1556742208-999815fca738?auto=format&fit=crop&w=1400&q=80",
        review: {
          quote:
            "“We finally have a clear roadmap. Execution became faster, simpler, and the team felt supported throughout the rollout.”",
          name: "Imran Q.",
          role: "Procurement Lead at Cardigo",
          avatar:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=70",
        },
      },
    ],
    []
  );

  const AUTOPLAY_MS = 4200;
  const DURATION_MS = 850;
  const easing = "cubic-bezier(0.2,0.7,0.2,1)";

  const [front, setFront] = useState(0);
  const [back, setBack] = useState(1);
  const [phase, setPhase] = useState<"idle" | "toBack">("idle");

  const frontRef = useRef(0);
  const phaseRef = useRef<"idle" | "toBack">("idle");
  const animatingRef = useRef(false);

  const timerRef = useRef<number | null>(null);
  const doneRef = useRef<number | null>(null);

  const clamp = (n: number) => {
    const len = SLIDES.length;
    return ((n % len) + len) % len;
  };

  useEffect(() => {
    frontRef.current = front;
  }, [front]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const transitionTo = (nextIndex: number) => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const ni = clamp(nextIndex);
    setBack(ni);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase("toBack");

        if (doneRef.current) window.clearTimeout(doneRef.current);
        doneRef.current = window.setTimeout(() => {
          setFront(ni);
          setPhase("idle");
          animatingRef.current = false;
        }, DURATION_MS);
      });
    });
  };

  const next = () => transitionTo(frontRef.current + 1);

  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      if (animatingRef.current || phaseRef.current !== "idle") return;
      next();
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (doneRef.current) window.clearTimeout(doneRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase === "idle") setBack(clamp(front + 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [front, phase]);

  const sFront = SLIDES[front];
  const sBack = SLIDES[back];

  // ✅ PRELOAD BOTH CURRENT + NEXT to remove flash/glitch
  useEffect(() => {
    const i1 = new Image();
    i1.src = sFront.image;

    const i2 = new Image();
    i2.src = sBack.image;
  }, [sFront.image, sBack.image]);

  const tStyle: React.CSSProperties = {
    transitionTimingFunction: easing,
    transitionDuration: `${DURATION_MS}ms`,
  };

  const textSwapClass =
    phase === "toBack"
      ? "opacity-0 translate-y-[6px] blur-[10px]"
      : "opacity-100 translate-y-0 blur-0";

  return (
    <section className="w-full bg-[#2f3e48] overflow-hidden">
      {/* TOP */}
      <div className="mx-auto max-w-[1280px] px-[72px] pt-[72px] pb-0 max-[1100px]:px-[22px] max-[1100px]:pt-[56px]">
        <div className="grid grid-cols-1 gap-[26px] lg:grid-cols-[1fr_520px] lg:gap-[48px] lg:items-start">
          {/* LEFT */}
          <div className="max-w-[680px] lg:max-w-[520px] lg:pt-[14px]">
            <div
              className="will-change-[opacity,transform,filter] transition-[opacity,transform,filter]"
              style={tStyle}
            >
              <div className={textSwapClass} style={tStyle}>
                <div className="text-[16px] tracking-[0.08em] uppercase text-white/60 mb-[22px]">
                  FEATURED CASE STUDY
                </div>

                <div className="flex items-center gap-[10px] mb-[18px] text-white/95">
                  <div className="w-[26px] h-[18px] grid place-items-center opacity-95">
                    <svg width="26" height="18" viewBox="0 0 26 18" fill="none">
                      <path
                        d="M9.2 3.2c-2.3-2.3-6.1-2.3-8.4 0-2.3 2.3-2.3 6.1 0 8.4 2.3 2.3 6.1 2.3 8.4 0"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16.8 14.8c2.3 2.3 6.1 2.3 8.4 0 2.3-2.3 2.3-6.1 0-8.4-2.3-2.3-6.1-2.3-8.4 0"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.2 12.4c2 2 5.6 2 7.6 0 2-2 2-5.6 0-7.6-2-2-5.6-2-7.6 0"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="text-[14px] font-semibold tracking-[0.01em]">
                    {sFront.brand}
                  </div>
                </div>

                <p className="m-0 text-[16px] leading-[1.55] text-white/65 max-w-[420px]">
                  {sFront.desc}
                </p>

                <button
                  className="mt-[22px] inline-flex items-center gap-[12px] border-0 outline-none cursor-pointer bg-white text-[#ff7a3d] text-[12px] font-semibold px-[18px] py-[12px] rounded-full shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                  type="button"
                >
                  <span>View Full Story</span>
                  <span className="text-[14px] leading-none translate-y-[-0.5px]" aria-hidden="true">
                    ↗
                  </span>
                </button>

                <div className="mt-[70px] pt-[36px] border-t border-white/10 w-full max-w-[520px]">
                  <div className="text-[11px] text-white/30 mb-[18px]">
                    {sFront.statLabel}
                  </div>
                  <div className="flex items-start gap-[10px]">
                    <div className="text-[56px] font-bold tracking-[-0.02em] text-white/95 leading-[0.95]">
                      {sFront.statValue}
                    </div>
                    <div className="text-[14px] text-white/80 mt-[10px] tracking-[0.04em]">
                      {sFront.statSuffix}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-end">
            <div
              className={[
                "relative w-full h-[360px] rounded-[40px] overflow-hidden bg-black/20 shadow-[0_28px_70px_rgba(0,0,0,0.26)]",
                "lg:w-[520px] lg:h-[430px] lg:rounded-[52px]",
                // ✅ anti-flicker layer isolation
                "transform-gpu",
                "[backface-visibility:hidden] [transform:translateZ(0)]",
                "[contain:paint] [isolation:isolate]",
              ].join(" ")}
            >
              {/* Back layer */}
              <img
                className={[
                  "absolute inset-0 w-full h-full object-cover select-none pointer-events-none",
                  "will-change-[opacity,transform,filter] transition-[opacity,transform,filter]",
                  "[backface-visibility:hidden] [transform:translateZ(0)]",
                  phase === "toBack"
                    ? "opacity-100 blur-0 scale-[1.01]"
                    : "opacity-0 blur-[18px] scale-[1.06]",
                ].join(" ")}
                style={tStyle}
                src={sBack.image}
                alt="Next case study"
                draggable={false}
                decoding="async"
                loading="eager"
              />

              {/* Front layer */}
              <img
                className={[
                  "absolute inset-0 w-full h-full object-cover select-none pointer-events-none",
                  "will-change-[opacity,transform,filter] transition-[opacity,transform,filter]",
                  "[backface-visibility:hidden] [transform:translateZ(0)]",
                  phase === "toBack"
                    ? "opacity-0 blur-[18px] scale-[1.06]"
                    : "opacity-100 blur-0 scale-[1.01]",
                ].join(" ")}
                style={tStyle}
                src={sFront.image}
                alt="Current case study"
                draggable={false}
                decoding="async"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM REVIEW (rounded top) */}
      <div className="w-full mt-[34px] bg-[#394854] rounded-t-[20px] overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-[72px] py-[36px] pb-[44px] max-[1100px]:px-[22px] max-[1100px]:py-[28px] max-[1100px]:pb-[36px]">
          <div
            className={[
              "flex items-start gap-[18px]",
              "will-change-[opacity,transform,filter] transition-[opacity,transform,filter]",
              textSwapClass,
            ].join(" ")}
            style={tStyle}
          >
            <img
              className="w-[54px] h-[54px] rounded-[12px] object-cover flex-none shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
              src={sFront.review.avatar}
              alt={sFront.review.name}
              draggable={false}
              decoding="async"
              loading="eager"
            />

            <div className="max-w-[820px]">
              <div className="text-[20px] leading-[1.55] text-white/80 mb-[18px]">
                {sFront.review.quote}
              </div>
              <div className="text-[16px] text-white/75 mb-[3px]">
                {sFront.review.name}
              </div>
              <div className="text-[16px] text-white/45">{sFront.review.role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reduced motion */}
      <div className="hidden motion-reduce:[&_*]:transition-none" />
    </section>
  );
}
