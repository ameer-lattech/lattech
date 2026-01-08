// sections/AwardsRecognition.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const AWARDS = [
  { 
    src: "/assets/images/award0.png",
    faded: false,
  },
  {
    src: "/assets/images/award0.png",
  },
  {
    src: "/assets/images/award0.png",
  },
  {
    src: "/assets/images/award0.png",
  },
  {
    src: "/assets/images/award0.png",
  },
  {
    src: "/assets/images/award0.png",
    // faded: true,
  },
];

export default function AwardsRecognition() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <h2 className="text-center text-[42px] font-light tracking-tight">
          <span className="text-[#4CAF50]">Awards</span>
          <span className="text-gray-500"> &amp; Recognition</span>
        </h2>

        {/* Slider */}
        <div className="relative mt-14">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-white to-transparent" />

          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={28}
            centeredSlides
            loop
            speed={4500}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            className="awards-swiper"
          >
            {AWARDS.concat(AWARDS).map((item, i) => (
              <SwiperSlide
                key={i}
                style={{ width: "260px" }}
                className="flex justify-center"
              >
                <div
                  className={`flex h-[120px] w-[260px] items-center justify-center bg-white ${
                    item.faded ? "opacity-30" : "opacity-100"
                  }`}
                >
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

      {/* Smooth linear motion */}
      <style jsx global>{`
        .awards-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}

