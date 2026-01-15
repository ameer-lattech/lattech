"use client";

import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type Testimonial = {
  stars: 5 | 4;
  quote: string;
  name: string;
  company: string;
  initials?: string;
  logoText?: string;
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={i < count ? "opacity-100" : "opacity-20"}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="grid h-[42px] w-[42px] place-items-center rounded-full bg-[#2E2E2E] text-white">
      <span className="text-[16px] font-semibold">{initials}</span>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-full flex-col rounded-[36px] bg-[#FBFBFB] px-8 pb-7 pt-7">
      <div className="text-[#F6B21A]">
        <Stars count={t.stars} />
      </div>

      {/* ✅ clamp to keep card heights consistent without min-height */}
      <p className="mt-4 text-[18px] leading-[1.9] text-[#525252] [display:-webkit-box] [-webkit-line-clamp:6] [-webkit-box-orient:vertical] overflow-hidden">
        “{t.quote}”
      </p>

      {/* footer pinned down but no forced empty space */}
      <div className="mt-7 flex items-center gap-3">
        {t.initials ? (
          <Avatar initials={t.initials} />
        ) : (
          <div className="grid h-[42px] w-[42px] place-items-center rounded-full bg-white">
            <span className="text-[18px] font-semibold text-[#1E1E1E]">{t.logoText ?? "L"}</span>
          </div>
        )}

        <div>
          <div className="text-[16px] font-semibold text-[#2E2E2E]">{t.name}</div>
          <div className="text-[16px] text-[#9A9A9A]">{t.company}</div>
        </div>
      </div>
    </article>
  );
}

export default function JourneyTestimonials() {
  const ALL: Testimonial[] = useMemo(
    () => [
      {
        stars: 5,
        quote:
          "Working with the talented team at Lattech Solution was an absolute pleasure. Their commitment to excellence and innovative approach transformed our vision into a stunning reality.",
        name: "Jen Rae",
        company: "Grand Opera House",
        logoText: "G",
      },
      {
        stars: 5,
        quote:
          "Lattech's expertise in design, technology, and SEO is unmatched. They delivered a cutting-edge website that exceeded our expectations.",
        name: "Liane Goldring",
        company: "Mahlatini",
        initials: "M",
      },
      {
        stars: 5,
        quote:
          "The team at Lattech Solution is exceptional to collaborate with. Their profound knowledge in the field is evident.",
        name: "Ann Graham",
        company: "W5",
        initials: "W5",
      },
      {
        stars: 5,
        quote:
          "Lattech Solution has been a joy to partner with, both for our website and advertising campaigns.",
        name: "Sarah Malik",
        company: "Studio North",
        initials: "SN",
      },
      {
        stars: 5,
        quote:
          "Our experience with Lattech Solution during the creation of our new website was outstanding.",
        name: "Omar Khan",
        company: "Crescent Labs",
        initials: "CL",
      },
      {
        stars: 5,
        quote:
          "We engaged Lattech Solution to develop two new websites and both delivered beautifully.",
        name: "Ayesha Noor",
        company: "City Experiences",
        initials: "CE",
      },
      {
        stars: 5,
        quote: "Clean process, great communication, and strong UI/UX decisions.",
        name: "David Lee",
        company: "Nimble Co.",
        initials: "NC",
      },
      {
        stars: 5,
        quote: "They understood our goals quickly and shipped iteratively.",
        name: "Hina Farooq",
        company: "BrightWorks",
        initials: "BW",
      },
      {
        stars: 5,
        quote: "Top-tier execution. The team handled everything with confidence.",
        name: "Usman Ali",
        company: "Vertex Studio",
        initials: "VS",
      },
    ],
    []
  );

  const [showAll, setShowAll] = useState(false);
  const desktopVisible = showAll ? ALL : ALL.slice(0, 6);

  return (
    <section className="w-full bg-white">
      <style jsx global>{`
        .journey-swiper .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: #d8d8d8;
          opacity: 1;
        }
        .journey-swiper .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 999px;
          background: #43b02a;
        }
        .journey-swiper .swiper-slide {
          width: 100% !important;
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="text-center">
          <h2 className="text-[48px] font-medium leading-tight tracking-[-0.02em] text-[#595A5A]">
            Our <span className="font-semibold text-[#43B02A]">Journey</span> of Building Success
          </h2>
          <p className="mx-auto mt-4 max-w-[900px] text-[20px] leading-[1.95] text-[#525252]">
            We are a dynamic software development firm, blending innovative strategies with technical precision.
          </p>
        </div>

        {/* MOBILE */}
        <div className="mt-10 md:hidden">
          <Swiper
            className="journey-swiper !pb-12"
            modules={[Pagination]}
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={0}
          >
            {ALL.map((t, idx) => (
              <SwiperSlide key={`${t.name}-${idx}`}>
                <div className="px-1">
                  <TestimonialCard t={t} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DESKTOP */}
        <div className="mt-10 hidden grid-cols-1 gap-x-10 gap-y-10 md:grid md:grid-cols-3">
          {desktopVisible.map((t, idx) => (
            <TestimonialCard key={`${t.name}-${idx}`} t={t} />
          ))}
        </div>

        {/* DESKTOP button */}
        <div className="mt-10 hidden justify-center md:flex">
          <button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            className="rounded-full border border-[#43B02A] px-6 py-[10px] text-[12px] font-medium text-[#43B02A] transition hover:bg-[#43B02A] hover:text-white"
          >
            {showAll ? "Show less testimonials" : "Show more testimonials"}
          </button>
        </div>
      </div>
    </section>
  );
}
