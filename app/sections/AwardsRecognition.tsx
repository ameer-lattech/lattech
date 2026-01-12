// sections/AwardsRecognition.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const AWARDS = [
  { src: "/assets/images/award0.png" },
  { src: "/assets/images/award0.png" },
  { src: "/assets/images/award0.png" },
  { src: "/assets/images/award0.png" },
  { src: "/assets/images/award0.png" },
  { src: "/assets/images/award0.png" },
];

export default function AwardsRecognition() {
  return (
    <section className="w-full bg-white py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <h2 className="text-center text-[32px] sm:text-[38px] md:text-[42px] font-light tracking-tight">
          <span className="text-[#4CAF50]">Awards</span>
          <span className="text-gray-500"> &amp; Recognition</span>
        </h2>

        {/* Slider */}
        <div className="relative mt-10 sm:mt-12 md:mt-14">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 sm:w-16 md:w-28 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 sm:w-16 md:w-28 bg-gradient-to-l from-white to-transparent" />

          <Swiper
            modules={[Autoplay]}
            loop
            centeredSlides={false}
            allowTouchMove
            speed={4500}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 14 },
              480: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 22 },
              1024: { slidesPerView: "auto", spaceBetween: 28 },
            }}
            className="awards-swiper"
          >
            {AWARDS.concat(AWARDS).map((item, i) => (
              <SwiperSlide
                key={i}
                className="flex justify-center !w-auto lg:!w-[260px]"
              >
                {/* 🔥 NO opacity logic, ALL SAME */}
                <div className="flex h-[88px] w-full items-center justify-center bg-white sm:h-[100px] md:h-[110px] lg:h-[120px] lg:w-[260px]">
                  <img
                    src={item.src}
                    alt="Award badge"
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* 🔥 pure linear motion */}
      <style jsx global>{`
        .awards-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}
