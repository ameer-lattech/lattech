"use client";

import React from "react";

export default function ContactInfoStrip() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F6F7F7]">
      {/* subtle topo pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='520' height='320' viewBox='0 0 520 320'%3E%3Cg fill='none' stroke='%23D7D9DB' stroke-width='1'%3E%3Cpath d='M18 86c44-36 92-44 142-18 48 24 78 16 120-12 44-30 88-24 128 18 34 36 60 42 94 18'/%3E%3Cpath d='M-8 142c52-28 104-30 154-6 52 24 92 12 132-18 40-30 84-28 126 6 40 34 72 42 110 30'/%3E%3Cpath d='M14 210c58-30 116-30 170-2 54 28 96 18 142-10 44-26 92-24 136 8 40 30 74 32 112 10'/%3E%3Cpath d='M42 34c40-24 78-24 116 0 38 24 66 18 96-8 32-26 66-26 100 0 34 24 62 26 92 8'/%3E%3Cpath d='M64 270c44-24 86-22 128 6 42 26 76 22 112-6 36-30 74-30 116-2 40 26 72 28 100 10'/%3E%3Cpath d='M220 24c40-24 80-24 120 0 40 24 74 24 110 0'/%3E%3Cpath d='M260 302c44-26 88-26 132 0 44 26 82 26 116 0'/%3E%3Cpath d='M94 112c34-28 70-28 106 0 36 28 66 26 98-6 32-30 66-32 102-6 36 26 66 26 96 0'/%3E%3Cpath d='M126 168c36-26 74-26 112 0 38 28 70 28 106 0 36-28 72-28 108 0'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "520px 320px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-6 md:px-10">
        {/* ✅ mobile: stacked, desktop: original grid */}
        <div className="grid grid-cols-12 items-start pt-10 pb-12 md:min-h-[290px] md:pt-[44px] md:pb-0">
          {/* left big copy */}
          <div className="col-span-12 md:col-span-6">
            <div className="text-[14px] md:text-[16px] font-medium text-[#707070]">
              Contact Info
            </div>

            <h2 className="mt-4 md:mt-6 max-w-[520px] text-[34px] sm:text-[40px] md:text-[54px] font-medium leading-[1.08] tracking-[-0.02em] text-[#6A6A6A]">
              We are always happy
              <br />
              to assist you
            </h2>
          </div>

          {/* right columns */}
          <div className="col-span-12 mt-10 grid grid-cols-1 gap-y-10 md:col-span-6 md:mt-0 md:grid-cols-2 md:gap-x-16 md:pl-6 md:pt-[22px]">
            {/* Email */}
            <div>
              <div className="text-[18px] md:text-[20px] font-semibold text-[#6E6E6E]">
                Email Address
              </div>
              <div className="mt-2 h-[2px] w-[22px] bg-[#CFCFCF]" />

              <div className="mt-6 md:mt-8 text-[15px] md:text-[16px] font-semibold text-[#6E6E6E]">
                help@info.com
              </div>

              <div className="mt-5 md:mt-6 text-[12px] text-[#8E8E8E]">
                Assistance hours:
              </div>
              <div className="mt-1 text-[12px] text-[#8E8E8E]">
                Monday - Friday 6 am to 8 pm EST
              </div>
            </div>

            {/* Number */}
            <div>
              <div className="text-[18px] md:text-[20px] font-semibold text-[#6E6E6E]">
                Number
              </div>
              <div className="mt-2 h-[2px] w-[22px] bg-[#CFCFCF]" />

              <div className="mt-6 md:mt-8 text-[15px] md:text-[16px] font-semibold text-[#6E6E6E]">
                (808) 998-34256
              </div>

              <div className="mt-5 md:mt-6 text-[12px] text-[#8E8E8E]">
                Assistance hours:
              </div>
              <div className="mt-1 text-[12px] text-[#8E8E8E]">
                Monday - Friday 6 am to 8 pm EST
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
