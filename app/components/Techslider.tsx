"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

type Logo = { label: string; url: string };

const LOGOS: Logo[] = [
  { label: "unity", url: "https://cdn.simpleicons.org/unity/b6b6b6" },
  { label: "node", url: "https://cdn.simpleicons.org/nodedotjs/2f2f2f" },
  { label: "Java", url: "https://cdn.simpleicons.org/java/f89820" },
  { label: "React Native", url: "https://cdn.simpleicons.org/react/222222" },
  { label: "python", url: "https://cdn.simpleicons.org/python/3776ab" },
  { label: "React", url: "https://cdn.simpleicons.org/react/222222" },
  { label: "Angular", url: "https://cdn.simpleicons.org/angular/dd0031" },
];

export default function Techslider() {
  // Make a long strip so Swiper loop has plenty to work with
  const slides = Array.from({ length: 6 }).flatMap(() => LOGOS);

  return (
    <div className="relative w-full max-w-[1220px] overflow-hidden">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[70px] sm:w-[90px] md:w-[120px] heroFadeLeft" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[70px] sm:w-[90px] md:w-[120px] heroFadeRight" />

      <Swiper
        modules={[Autoplay, FreeMode]}
        loop
        // helps Swiper keep the loop seamless for marquee-style
        loopAdditionalSlides={LOGOS.length * 4}
        // marquee feel
        slidesPerView="auto"
        spaceBetween={64}
        allowTouchMove
        grabCursor
        freeMode={{
          enabled: true,
          sticky: false,
          momentum: false,
        }}
        speed={3500}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="heroLogoSwiper"
        breakpoints={{
          0: { slidesPerView: 3, spaceBetween: 18 },
          420: { slidesPerView: 4, spaceBetween: 18 },
          640: { slidesPerView: 4, spaceBetween: 22 },
          768: { slidesPerView: "auto", spaceBetween: 56 },
          1024: { slidesPerView: "auto", spaceBetween: 64 },
        }}
      >
        {slides.map((logo, i) => (
          <SwiperSlide
            key={`${logo.label}-${i}`}
            // only matters on md+; on mobile Swiper will size by slidesPerView count
            style={{ width: "auto" }}
            className="heroLogoSlide flex items-center justify-center"
          >
            <div className="flex items-center gap-[10px] md:gap-[12px] opacity-[0.62] transition hover:opacity-100">
              <img
                src={logo.url}
                alt={logo.label}
                className="h-[28px] sm:h-[30px] md:h-[34px] w-auto select-none"
                draggable={false}
                loading="lazy"
              />
              <span className="hidden md:inline text-[20px] font-medium text-[#6F6F6F]">
                {logo.label}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /* Smooth continuous marquee */
        .heroLogoSwiper .swiper-wrapper {
          align-items: center;
          transition-timing-function: linear !important;
        }
        .heroLogoSwiper .swiper-slide {
          will-change: transform;
        }

        /* Mobile: Swiper controls widths for 3/4 per view */
        @media (max-width: 767px) {
          .heroLogoSwiper .heroLogoSlide {
            width: auto !important;
          }
        }

        /* Desktop: auto-width slides */
        @media (min-width: 768px) {
          .heroLogoSwiper .swiper-slide {
            width: auto !important;
          }
        }

        /* Edge fades (match your section background color here) */
        .heroFadeLeft {
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.85) 45%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        .heroFadeRight {
          background: linear-gradient(
            to left,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.85) 45%,
            rgba(255, 255, 255, 0) 100%
          );
        }
      `}</style>
    </div>
  );
}
