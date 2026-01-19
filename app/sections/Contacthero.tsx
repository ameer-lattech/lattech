"use client";

import React from "react";

export default function ContactHero() {
  return (
    <section className="w-full bg-white">
      {/* Frame height like screenshot */}
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 py-[54px] sm:py-[70px]">
        <div className="h-[400px] flex items-center">
          <div className="grid w-full grid-cols-12 items-center">
            {/* LEFT */}
            <div className="col-span-7">
              <div className="text-[14px] font-semibold text-[#56C227]">
                Contact Us
              </div>

              <h1 className="max-w-[680px] text-[#595A5A] font-semibold tracking-[-0.02em] leading-[1.12] text-[48px]">
                We&apos;ll Help Your Company Get To
                <br />
                The Next Level
              </h1>
            </div>

            {/* RIGHT */}
            <div className="col-span-5">
              <p className="ml-auto max-w-[410px] text-[20px] leading-[1.65] text-[#525252]">
                Whether you are a large enterprise looking to augment your teams
                with experts resource or an SME looking to scale your business
                or a startup looking to build something.
                <br />
                We are your digital growth partner.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
