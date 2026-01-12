"use client";

import Image from "next/image";
import Techslider from "../components/Techslider";



export default function Hero() {
  const onSchedule = () => {
    const el = document.querySelector("#schedule");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      style={{ ["--header-h" as any]: "84px" }}
      className="relative w-full overflow-hidden bg-white font-sans heroFixed"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#fafafa]" />

        <Image
          src="/assets/hero.png"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "top right" }}
        />

        <div className="absolute inset-0 bg-white/70 md:bg-white/65" />

        <div className="absolute inset-0">
          <div className="absolute -left-[18%] top-[-25%] h-[170%] w-[95%] rotate-[-18deg] bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.96)_45%,rgba(255,255,255,0.65)_62%,rgba(255,255,255,0.0)_78%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[48%] md:h-[45%] bg-gradient-to-t from-white/90 via-white/55 to-white/0" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1320px] flex-col px-[18px] sm:px-[28px] md:px-[72px]">
        {/* top block */}
        <div className="pt-[54px] sm:pt-[62px] md:pt-[78px]">
          <div className="mx-auto max-w-[820px] md:mx-0">
            <div className="flex justify-center md:block">
              <span className="inline-flex items-center rounded-full border border-[#E7E7E7] bg-white px-[16px] py-[7px] text-[13px] font-medium text-[#7A7A7A] shadow-[0_1px_0_rgba(0,0,0,0.05)]">
                Digital transformation company
              </span>
            </div>

            <h1 className="mt-[18px] md:mt-[22px] text-center md:text-left leading-[1.08] md:leading-[1.03] tracking-[-0.02em]">
              <span className="text-[40px] sm:text-[46px] md:text-[64px] font-extrabold text-[#43B02A]">
                Full-Stack Tech Enablement
              </span>{" "}
              <span className="text-[40px] sm:text-[46px] md:text-[64px] font-extrabold text-[#5B5B5B]">
                For Future-Ready Businesses
              </span>
            </h1>

            <p className="mt-[14px] md:mt-[20px] mx-auto md:mx-0 max-w-[350px] sm:max-w-[460px] md:max-w-[760px] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.7] text-[#7B7B7B] text-center md:text-left">
              We are your trusted development partner with just one goal in focus
              to build products that generate a lasting, profitable impact.
            </p>

            <div className="mt-[22px] md:mt-[28px] flex flex-col md:flex-row items-center md:items-start gap-[12px] md:gap-[16px]">
              <button
                onClick={onSchedule}
                className="h-[50px] md:h-[42px] w-full max-w-[360px] md:w-auto rounded-full bg-[#43B02A] px-[22px] text-[14px] md:text-[13px] font-semibold text-white shadow-[0_8px_22px_rgba(67,176,42,0.18)] transition hover:brightness-95 active:brightness-90"
              >
                Schedule a demo
              </button>

              <button
                onClick={onContact}
                className="h-[50px] md:h-[42px] w-full max-w-[360px] md:w-auto rounded-full border border-[#FF7A1A] bg-white px-[22px] text-[14px] md:text-[13px] font-semibold text-[#FF7A1A] shadow-[0_1px_0_rgba(0,0,0,0.03)] transition hover:bg-[#FF7A1A]/10 active:bg-[#FF7A1A]/15"
              >
                Contact sales
              </button>
            </div>
          </div>
        </div>

        {/* spacer */}
        <div className="h-[60px] sm:h-[22px] md:h-[60px]" />

        {/* ✅ Slider called here */}
        <div className="pb-[34px] sm:pb-[44px] md:pb-[76px] flex w-full justify-center">
          <Techslider/>
        </div>
      </div>

      <style jsx global>{`
        /* ✅ HERO HEIGHT FIX (ONLY) */
        .heroFixed {
          min-height: calc(620px - var(--header-h));
          height: min(calc(88vh - var(--header-h)), 740px);
        }

        @supports (height: 100svh) {
          .heroFixed {
            height: min(calc(88svh - var(--header-h)), 740px);
          }
        }

        @supports (height: 100dvh) {
          .heroFixed {
            height: min(calc(88dvh - var(--header-h)), 740px);
          }
        }
      `}</style>
    </section>
  );
}
