"use client";

import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

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

export default function WhatWeHaveBuilt() {
  const [activeCategory, setActiveCategory] = useState<Category>("Healthcare");
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);

  // section visibility
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  const stories = useMemo(() => ALL_STORIES.filter((s) => s.category === activeCategory), [activeCategory]);
  const active = stories[activeIndex] ?? null;

  useEffect(() => {
    if (swiperRef.current) swiperRef.current.slideTo(0);
    setActiveIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const startAutoplay = useCallback(() => {
    const s = swiperRef.current;
    if (!s) return;
    // @ts-ignore
    s.autoplay?.start?.();
  }, []);

  const stopAutoplay = useCallback(() => {
    const s = swiperRef.current;
    if (!s) return;
    // @ts-ignore
    s.autoplay?.stop?.();
  }, []);

  useEffect(() => {
    const s = swiperRef.current;
    if (!s) return;

    if (isInView) {
      // always start from first slide when you reach section
      s.slideTo(0);
      setActiveIndex(0);
      startAutoplay();
    } else {
      stopAutoplay();
    }
  }, [isInView, startAutoplay, stopAutoplay]);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 md:py-20">
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
        <div className="relative mt-14">
          <div className="relative mx-auto w-full max-w-[1100px]">
            {stories.length === 0 ? (
              <div className="flex h-[430px] w-full items-center justify-center rounded-[54px] bg-[#f3f5f7]">
                <div className="text-center">
                  <p className="text-[22px] font-semibold text-[#6b6b6b]">No stories yet</p>
                  <p className="mt-2 text-[13px] text-[#9a9a9a]">Add items to this category to display them here.</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    // stop until section visible
                    // @ts-ignore
                    swiper.autoplay?.stop?.();
                  }}
                  modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  effect="coverflow"
                  grabCursor
                  centeredSlides
                  slidesPerView="auto"
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 150,
                    modifier: 1.5,
                    slideShadows: false,
                  }}
                  navigation={{
                    prevEl: ".custom-swiper-button-prev",
                    nextEl: ".custom-swiper-button-next",
                  }}
                  pagination={{
                    clickable: true,
                    el: ".custom-pagination",
                  }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  className="!pb-16"
                  style={{ overflow: "visible", padding: "20px 0" }}
                >
                  {stories.map((story, idx) => (
                    <SwiperSlide key={story.id} style={{ width: "700px", maxWidth: "90vw" }}>
                      {({ isActive, isPrev, isNext }) => {
                        const scale =
                          isActive ? "md:scale-[1.2] scale-[1.03]" : isPrev || isNext ? "md:scale-[0.95] scale-[0.97]" : "scale-[0.95]";
                        const radius = isActive ? "md:rounded-[32px] rounded-[26px]" : "rounded-[54px]";
                        const imgOpacity = isActive ? "opacity-100" : isPrev || isNext ? "opacity-60" : "opacity-35";

                        return (
                          <div
                            className={[
                              "relative w-full overflow-hidden bg-[#f3f5f7] transition-transform duration-300",
                              "h-[430px] md:h-[430px] max-sm:h-[320px]",
                              radius,
                              scale,
                            ].join(" ")}
                          >
                            <img
                              src={story.image}
                              alt={story.title}
                              className={`h-full w-full object-cover transition-opacity duration-300 ${imgOpacity}`}
                              draggable={false}
                            />

                            <div className="absolute bottom-[26px] left-[28px] right-[18px] z-10">
                              <p className="text-[48px] md:text-[64px] max-sm:text-[34px] font-light leading-none tracking-[-0.02em] text-white">
                                {story.title}
                              </p>
                            </div>
                          </div>
                        );
                      }}
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Nav Buttons (Tailwind, no shadow) */}
                <div className="custom-swiper-button-prev absolute left-[10px] top-1/2 z-10 -translate-y-1/2 cursor-pointer select-none rounded-full bg-[#FF7A00] p-3 md:left-[-80px] md:p-4">
                  <ArrowLeft white />
                </div>

                <div className="custom-swiper-button-next absolute right-[10px] top-1/2 z-10 -translate-y-1/2 cursor-pointer select-none rounded-full bg-[#FF7A00] p-3 md:right-[-80px] md:p-4">
                  <ArrowRight white />
                </div>

                {/* Pagination */}
                <div className="custom-pagination mt-7 flex justify-center gap-2" />
              </div>
            )}
          </div>
        </div>

        {/* Category Pills (no shadow) */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={
                c === activeCategory
                  ? "h-[34px] rounded-full bg-[#FF7A00] px-6 text-[11px] font-semibold text-white transition"
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
                <h3 className="text-[32px] sm:text-[42px] font-light tracking-[-0.01em] text-[#6b6b6b]">{active.title}</h3>
                <ExternalBadge />
              </div>
              <p className="mx-auto mt-4 max-w-[760px] text-[13px] leading-[2.0] text-[#9a9a9a]">{active.description}</p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-3">
                <h3 className="text-[32px] sm:text-[42px] font-light tracking-[-0.01em] text-[#6b6b6b]">—</h3>
                <ExternalBadge />
              </div>
              <p className="mx-auto mt-4 max-w-[760px] text-[13px] leading-[2.0] text-[#9a9a9a]">
                Select a category that has stories, or add stories for this category.
              </p>
            </>
          )}
        </div>
      </div>

  
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: #dddddd;
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          width: 34px;
          border-radius: 4px;
          background: #ff7a00;
        }
      `}</style>
    </section>
  );
}
