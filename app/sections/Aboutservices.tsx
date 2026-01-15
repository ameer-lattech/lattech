"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

type Service = {
  title: string;
  desc: string;
  cta: string;
  img: string;
  link: string;
};

const SERVICES: Service[] = [
  {
    title: "Custom Software",
    desc: "Transforming a cultural landmark with engaging digital experiences, interactive exhibits, and streamlined reservations.",
    cta: "Check details",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
    link: "/services/custom-software",
  },
  {
    title: "Mobile Apps",
    desc: "Transforming a cultural landmark with engaging digital experiences, interactive exhibits, and streamlined reservations.",
    cta: "Check details",
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80",
    link: "/services/mobile-apps",
  },
  {
    title: "Games",
    desc: "Transforming a cultural landmark with engaging digital experiences, interactive exhibits, and streamlined reservations.",
    cta: "Check details",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
    link: "/services/games",
  },
  {
    title: "E-Commerce",
    desc: "Transforming a cultural landmark with engaging digital experiences, interactive exhibits, and streamlined reservations.",
    cta: "Check details",
    img: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1600&q=80",
    link: "/services/ecommerce",
  },
  {
    title: "Web 3.0",
    desc: "Transforming a cultural landmark with engaging digital experiences, interactive exhibits, and streamlined reservations.",
    cta: "Check details",
    img: "https://images.unsplash.com/photo-1642790553850-6d0b2de2ac4d?auto=format&fit=crop&w=1600&q=80",
    link: "/services/web3",
  },
  {
    title: "Dev-Ops",
    desc: "Transforming a cultural landmark with engaging digital experiences, interactive exhibits, and streamlined reservations.",
    cta: "Check details",
    img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=80",
    link: "/services/devops",
  },
];

export default function ServicesPinnedScroll() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);

  const imagesRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    if (!rootRef.current || !pinWrapRef.current) return;

    let ctx: gsap.Context | undefined;
    let mm: gsap.MatchMedia | undefined;

    const init = async () => {
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        mm = gsap.matchMedia();

        // ✅ Desktop only
        mm.add("(min-width: 768px)", () => {
          const total = SERVICES.length;
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

        // ✅ Mobile: no pin (simple list)
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
      mm?.kill();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="w-full bg-[#FAFAFA]">
      {/* ✅ Whole block centered (header + content) */}
      <div
        ref={pinWrapRef}
        className="relative mx-auto w-full max-w-[1280px] px-6 md:h-screen md:flex md:items-center"
      >
        {/* ✅ header + content centered as ONE unit */}
        <div className="w-full md:flex md:flex-col md:justify-center">
          {/* header */}
          <div className="pt-10 md:pt-0 text-center">
            <h2 className="text-[34px] md:text-[48px] font-Regular leading-tight text-[#595A5A]">
              About our <span className="text-[#39B54A] font-semibold">Services</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[780px] text-[20px] leading-[1.7] text-[#525252]">
              We help your business grow from inception to success. Our digital solutions enhance your online presence,
              drive sales, and optimize operations for efficiency and profitability.
            </p>
          </div>

          {/* ✅ CONTROL GAP BETWEEN HEADER AND CONTENT */}
          <div className="hidden md:block h-[64px]" />

          {/* desktop content */}
          <div className="hidden md:block">
            <div className="grid w-full grid-cols-12 items-center gap-10">
              {/* image */}
              <div className="col-span-7">
                <div className="relative h-[420px] w-full overflow-hidden rounded-[54px] bg-black/10 shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
                  {SERVICES.map((s, i) => (
                    <div
                      key={s.title}
                      ref={(el) => {
                        if (el) imagesRef.current[i] = el;
                      }}
                      className="absolute inset-0 will-change-transform"
                      style={{ visibility: i === 0 ? "visible" : "hidden" }}
                    >
                      <Image src={s.img} alt={s.title} fill priority={i === 0} className="object-cover" sizes="55vw" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-black/0 to-black/10" />
                    </div>
                  ))}
                </div>
              </div>

              {/* content */}
              <div className="relative col-span-5">
                <div className="relative h-[260px] lg:h-[280px]">
                  {SERVICES.map((s, i) => (
                    <div
                      key={s.title}
                      ref={(el) => {
                        if (el) contentRef.current[i] = el;
                      }}
                      className="absolute inset-0 will-change-transform"
                      style={{ visibility: i === 0 ? "visible" : "hidden" }}
                    >
                      <h3 className="text-[30px] font-semibold tracking-wide text-[#595A5A]">
                        {s.title.toUpperCase()}
                      </h3>

                      <p className="mt-2 max-w-[520px] text-[20px] leading-[1.8] text-[#595A5A]">{s.desc}</p>

                      <Link
                        href={s.link}
                        className="mt-4 inline-flex items-center gap-2 text-[16px] font-medium text-[#1A8F3E] hover:opacity-80 transition"
                      >
                        {s.cta} <span aria-hidden className="text-[16px]">→</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* mobile */}
          <div className="md:hidden mt-10 space-y-10 pb-16">
            {SERVICES.map((s) => (
              <div key={s.title} className="grid gap-5">
                <div className="relative h-[240px] w-full overflow-hidden rounded-[40px] bg-black/10">
                  <Image src={s.img} alt={s.title} fill className="object-cover" sizes="100vw" />
                </div>

                <div>
                  <h3 className="text-[18px] font-semibold tracking-wide text-[#2B2B2B]">
                    {s.title.toUpperCase()}
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.8] text-[#A0A0A0]">{s.desc}</p>

                  <Link
                    href={s.link}
                    className="mt-4 inline-flex items-center gap-2 text-[12px] font-medium text-[#1A8F3E] hover:opacity-80 transition"
                  >
                    {s.cta} <span aria-hidden className="text-[14px]">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
