"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

type Step = {
  title: string;
  desc: string;
  img: string;
};

const STEPS: Step[] = [
  {
    title: "Discovery/Ideate",
    desc: "We create exceptional software solutions that look and feel fabulous on mobile, tablet, and desktop. Fully responsive web applications your clients will enjoy using, no matter what industry, we help you boost your business.",
    img: "/assets/images/ourprocess1.png",
  },
  {
    title: "Project Scoping",
    desc: "We define clear scope, milestones, and deliverables so everyone stays aligned and delivery remains predictable.",
    img: "/assets/images/ourprocess2.png",
  },
  {
    title: "Team Selection",
    desc: "We assemble the best-fit team for your product—design, engineering, and management—so execution stays fast and focused.",
    img: "/assets/images/ourprocess3.png",
  },
  {
    title: "Design & Prototype",
    desc: "We design clean interfaces and prototype flows to validate usability before development begins.",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=2000&q=80",
  },
  {
    title: "Development",
    desc: "We build scalable software with best practices to ensure performance, maintainability, and long-term growth.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2000&q=80",
  },
  {
    title: "QA & Launch",
    desc: "We test thoroughly, refine edge cases, and launch confidently—then support improvements post-release.",
    img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=2000&q=80",
  },
];

export default function OurProcessPinnedScroll() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);

  const imagesRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    if (!rootRef.current || !pinWrapRef.current) return;

    let ctx: gsap.Context | undefined;
    let mm: gsap.MatchMedia | undefined;
    let isMounted = true;

    const init = async () => {
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      if (!isMounted) return;

      ctx = gsap.context(() => {
        mm = gsap.matchMedia();

        // ✅ Desktop: pin + swap
        mm.add("(min-width: 768px)", () => {
          const total = STEPS.length;
          let activeIndex = 0;

          const setLayer = (el: HTMLElement, isActive: boolean) => {
            el.style.visibility = isActive ? "visible" : "hidden";
            el.style.pointerEvents = isActive ? "auto" : "none";
          };

          imagesRef.current.forEach((el, i) => {
            setLayer(el, i === 0);
            gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: 0, scale: 1 });
          });

          contentRef.current.forEach((el, i) => {
            setLayer(el, i === 0);
            gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: 0 });
          });

          const showIndex = (nextIndex: number, direction: number) => {
            if (nextIndex === activeIndex) return;

            const prev = activeIndex;
            activeIndex = nextIndex;

            const prevImg = imagesRef.current[prev];
            const nextImg = imagesRef.current[nextIndex];
            const prevContent = contentRef.current[prev];
            const nextContent = contentRef.current[nextIndex];

            if (!prevImg || !nextImg || !prevContent || !nextContent) return;

            gsap.killTweensOf([prevImg, nextImg, prevContent, nextContent]);

            setLayer(nextImg, true);
            setLayer(nextContent, true);

            const outY = direction >= 0 ? -18 : 18;
            const inY = direction >= 0 ? 18 : -18;

            gsap.to(prevImg, {
              autoAlpha: 0,
              y: outY,
              scale: 1.02,
              duration: 0.22,
              ease: "power2.out",
              overwrite: "auto",
              onComplete: () => {
                setLayer(prevImg, false);
                gsap.set(prevImg, { y: 0, scale: 1 });
              },
            });

            gsap.fromTo(
              nextImg,
              { autoAlpha: 0, y: inY, scale: 1.02 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.26,
                ease: "power2.out",
                overwrite: "auto",
              }
            );

            gsap.to(prevContent, {
              autoAlpha: 0,
              y: outY,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
              onComplete: () => {
                setLayer(prevContent, false);
                gsap.set(prevContent, { y: 0 });
              },
            });

            gsap.fromTo(
              nextContent,
              { autoAlpha: 0, y: inY },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.26,
                ease: "power2.out",
                overwrite: "auto",
              }
            );
          };

          const st = ScrollTrigger.create({
            trigger: rootRef.current!,
            start: "top top",
            end: () => `+=${window.innerHeight * total}`,
            pin: pinWrapRef.current!,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = Math.min(total - 1, Math.floor(self.progress * total));
              showIndex(next, self.direction);
            },
          });

          return () => st.kill();
        });

        // ✅ Mobile: no pin, stacked
        mm.add("(max-width: 767px)", () => {
          imagesRef.current.forEach((el) => {
            if (!el) return;
            el.style.visibility = "visible";
            el.style.pointerEvents = "auto";
            gsap.set(el, { clearProps: "all" });
          });

          contentRef.current.forEach((el) => {
            if (!el) return;
            el.style.visibility = "visible";
            el.style.pointerEvents = "auto";
            gsap.set(el, { clearProps: "all" });
          });
        });
      }, rootRef);
    };

    init();

    return () => {
      isMounted = false;
      mm?.kill();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="w-full bg-white">
      {/* ✅ Entire block vertically centered on desktop */}
      <div
        ref={pinWrapRef}
        className="relative mx-auto w-full max-w-[1280px] px-8 md:h-screen md:flex md:items-center"
      >
        {/* ✅ This wrapper makes header + content center as one unit */}
        <div className="w-full md:flex md:flex-col md:justify-center">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between">
              <h2 className="text-[40px] font-medium leading-none text-[#3E3E3E]">
                Our <span className="font-semibold text-[#39B54A]">Process</span>
              </h2>

              <Link
                href="/process"
                className="inline-flex items-center gap-2 rounded-full border border-[#ECECEC] bg-white px-5 py-[9px] text-[11px] font-medium text-[#FF7A00] shadow-[0_10px_22px_rgba(0,0,0,0.06)] transition hover:opacity-90"
              >
                Learn More{" "}
                <span className="ml-1 inline-block text-[14px]" aria-hidden>
                  ↗
                </span>
              </Link>
            </div>

            <div className="mt-7 h-px w-full bg-[#E9EEF5]" />
          </div>

          {/* ✅ CONTROL THIS GAP ONLY (this is the space you marked) */}
          <div className="hidden md:block h-[64px]" />

          {/* Desktop pinned area (no extra height calculations) */}
          <div className="hidden md:block">
            <div className="grid w-full grid-cols-12 items-center">
              {/* LEFT IMAGE */}
              <div className="col-span-6">
                <div className="relative w-full max-w-[560px] bg-[transparent] aspect-[14/9]">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.title}
                      ref={(el) => {
                        if (el) imagesRef.current[i] = el;
                      }}
                      className="absolute inset-0 overflow-hidden rounded-[0px] will-change-transform"
                      style={{ visibility: i === 0 ? "visible" : "hidden" }}
                    >
                      <Image
                        src={s.img}
                        alt={s.title}
                        fill
                        priority={i === 0}
                        className="object-contain"
                        sizes="(min-width: 768px) 560px, 100vw"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="col-span-6 pl-14">
                <p className="max-w-[420px] text-[12.5px] leading-[1.95] text-[#7A7A7A]">
                  Lattech is a global IT technology solutions and services company based in Pakistan. We collaborate with
                  our clients of all sizes, from individual to mid-market to large companies across multiple domains.
                </p>

                <div className="relative mt-14 h-[270px]">
                  {STEPS.map((s, i) => {
                    const num = String(i + 1).padStart(2, "0");
                    const total = String(STEPS.length).padStart(2, "0");

                    return (
                      <div
                        key={s.title}
                        ref={(el) => {
                          if (el) contentRef.current[i] = el;
                        }}
                        className="absolute inset-0 will-change-transform"
                        style={{ visibility: i === 0 ? "visible" : "hidden" }}
                      >
                        <div className="flex items-center gap-2 text-[12px]">
                          <span className="font-semibold text-[#FF7A00]">{num}</span>
                          <span className="text-[#C7CDD8]">/</span>
                          <span className="text-[#9AA3B2]">{total}</span>
                        </div>

                        <div className="mt-7 h-px w-full bg-[#E9EEF5]" />

                        <h3 className="mt-[88px] text-[22px] font-semibold tracking-wide text-[#4A4A4A]">
                          {s.title}
                        </h3>

                        <p className="mt-4 max-w-[460px] text-[11.5px] leading-[1.95] text-[#9AA3B2]">
                          {s.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile stacked (unchanged) */}
          <div className="pb-16 pt-10 md:hidden">
            <p className="max-w-[520px] text-[12.5px] leading-[1.95] text-[#7A7A7A]">
              Lattech is a global IT technology solutions and services company based in Pakistan. We collaborate with our
              clients of all sizes, from individual to mid-market to large companies across multiple domains.
            </p>

            <div className="mt-10 grid gap-12">
              {STEPS.map((s, i) => {
                const num = String(i + 1).padStart(2, "0");
                const total = String(STEPS.length).padStart(2, "0");

                return (
                  <div key={s.title} className="grid gap-6">
                    <div className="relative w-full overflow-hidden aspect-[16/10]">
                      <Image src={s.img} alt={s.title} fill className="object-contain" sizes="100vw" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-[12px]">
                        <span className="font-semibold text-[#FF7A00]">{num}</span>
                        <span className="text-[#C7CDD8]">/</span>
                        <span className="text-[#9AA3B2]">{total}</span>
                      </div>

                      <div className="mt-5 h-px w-full bg-[#E9EEF5]" />

                      <h3 className="mt-7 text-[18px] font-semibold tracking-wide text-[#4A4A4A]">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-[12px] leading-[1.95] text-[#9AA3B2]">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
