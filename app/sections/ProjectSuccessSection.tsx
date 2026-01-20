"use client";

import React from "react";
import Link from "next/link";

export default function ProjectSuccessSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:py-[80px]">
        <div className="grid grid-cols-12 items-center gap-y-10 lg:gap-x-[60px] lg:gap-y-0">
          {/* LEFT: layered UI cards */}
          <div className="relative col-span-12 lg:col-span-6">
            {/* ✅ responsive scale wrapper (ONLY affects mobile/tablet) */}
            <div className="mx-auto w-full max-w-[520px]">
              <div className="origin-top mx-auto scale-[0.86] sm:scale-[0.92] md:scale-100 lg:scale-100">
                <div className="relative mx-auto h-[360px] sm:h-[390px] md:h-[420px] w-full max-w-[520px]">
                  {/* far left big faded panel */}
                  <div className="absolute left-0 top-[38px] h-[300px] sm:h-[315px] md:h-[330px] w-[290px] sm:w-[305px] md:w-[320px] rounded-[14px] bg-white/90 shadow-[0_18px_55px_rgba(0,0,0,0.10)] ring-1 ring-black/5">
                    <div className="px-5 pt-5 opacity-35">
                      <div className="text-[10px] font-medium text-[#7a7a7a]">
                        Add team members
                      </div>
                      <div className="mt-3 flex gap-2">
                        {["LA", "AM", "EO"].map((t) => (
                          <span
                            key={t}
                            className="inline-flex h-6 items-center rounded-md bg-[#F3F5F7] px-2 text-[10px] font-semibold text-[#7a7a7a]"
                          >
                            {t}
                          </span>
                        ))}
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-[#E6E8EB] text-[12px] text-[#7a7a7a]">
                          +
                        </span>
                      </div>

                      <div className="mt-5 text-[10px] font-medium text-[#7a7a7a]">
                        Add guests
                      </div>
                      <div className="mt-2 h-[28px] w-[210px] rounded-md border border-[#E6E8EB] bg-white" />

                      <div className="mt-5 text-[10px] font-medium text-[#7a7a7a]">
                        Notify people on
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex h-6 items-center rounded-md bg-[#F3F5F7] px-2 text-[10px] font-semibold text-[#7a7a7a]">
                          Slack
                        </span>
                        <span className="inline-flex h-6 items-center rounded-md bg-[#F3F5F7] px-2 text-[10px] font-semibold text-[#7a7a7a]">
                          Email
                        </span>
                      </div>

                      <div className="mt-5 text-[10px] font-medium text-[#7a7a7a]">
                        Set reminder
                      </div>
                      <div className="mt-2 h-[28px] w-[210px] rounded-md border border-[#E6E8EB] bg-white" />

                      <div className="mt-8 h-[34px] w-[210px] rounded-md bg-[#2F7FF0]/30" />
                    </div>
                  </div>

                  {/* far right faded mini panel */}
                  <div className="absolute right-[28px] sm:right-[34px] md:right-[38px] top-0 h-[330px] sm:h-[345px] md:h-[360px] w-[175px] sm:w-[182px] md:w-[190px] rounded-[14px] bg-white/90 shadow-[0_18px_55px_rgba(0,0,0,0.10)] ring-1 ring-black/5">
                    <div className="p-4 opacity-35">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-[#E9EEF5]" />
                        <div>
                          <div className="h-2 w-20 rounded bg-[#E9EEF5]" />
                          <div className="mt-1 h-2 w-14 rounded bg-[#EEF2F7]" />
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-[9px] text-[#8a8a8a]">
                        <div>
                          <div>Invites</div>
                          <div className="mt-1 h-3 w-10 rounded bg-[#EEF2F7]" />
                        </div>
                        <div>
                          <div>Pending</div>
                          <div className="mt-1 h-3 w-10 rounded bg-[#EEF2F7]" />
                        </div>
                      </div>

                      <div className="mt-5 h-[140px] sm:h-[145px] md:h-[150px] rounded-[10px] bg-[#F3F6FB]" />
                      <div className="mt-5 h-[85px] sm:h-[88px] md:h-[90px] rounded-[10px] bg-[#F7F9FC]" />
                    </div>
                  </div>

                  {/* MAIN centered card */}
                  <div className="absolute left-[92px] sm:left-[102px] md:left-[110px] top-[98px] sm:top-[104px] md:top-[110px] h-[225px] sm:h-[232px] md:h-[240px] w-[285px] sm:w-[292px] md:w-[300px] rounded-[14px] bg-white shadow-[0_25px_70px_rgba(0,0,0,0.14)] ring-1 ring-black/5">
                    <div className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-[#E9EEF5] ring-2 ring-white">
                          <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,#9ad,#456)] opacity-70" />
                        </div>

                        <div className="min-w-0">
                          <div className="text-[12px] font-semibold text-[#2b2b2b]">
                            Samuel Spencer
                          </div>
                          <div className="text-[10px] text-[#8f8f8f]">
                            sasp@egament.com
                          </div>
                          <div className="mt-1 text-[10px] text-[#9c9c9c]">
                            Creative Director
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-[10px] border border-[#EEF0F3]">
                        <div className="px-4 py-3">
                          <div className="text-[10px] text-[#8a8a8a]">Invites</div>
                          <div className="mt-1 text-[16px] font-semibold text-[#2F5BFF]">
                            03
                          </div>
                        </div>
                        <div className="border-l border-[#EEF0F3] px-4 py-3">
                          <div className="text-[10px] text-[#8a8a8a]">Pending</div>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-[#39D98A]" />
                            <span className="text-[16px] font-semibold text-[#2b2b2b]">
                              02
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 text-[10px] font-medium text-[#8a8a8a]">
                        Overall activity
                      </div>

                      <div className="mt-2 h-[52px] w-full">
                        <svg viewBox="0 0 300 60" className="h-full w-full">
                          <path
                            d="M0,42 C30,38 35,50 60,46 C85,41 90,24 118,28 C142,32 155,46 178,40 C204,33 212,22 240,28 C260,33 270,46 300,42"
                            fill="none"
                            stroke="#2F5BFF"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          <circle cx="235" cy="28" r="5" fill="#2F5BFF" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(255,255,255,0.0),rgba(255,255,255,0.5))]" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: text */}
          <div className="col-span-12 lg:col-span-6">
            <div className="inline-flex items-center rounded-full border border-[#E6E6E6] bg-white px-4 py-[6px] text-[12px] font-medium text-[#5f5f5f] shadow-[0_10px_22px_rgba(0,0,0,0.06)]">
              What makes Lattech Solution different
            </div>

            <h2 className="mt-5 text-[36px] md:text-[48px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#595A5A]">
              We Achieve Project
              <br />
              Success <span className="text-[#52C227]">No Matter</span>
              <br />
              <span className="text-[#52C227]">What</span>
            </h2>

            <p className="mt-5 max-w-[520px] text-[20px] leading-[1.8] text-[#595A5A]">
              Project success is our standard, not a slogan. We drive projects to their goals by
              overcoming constraints, designing architectures that prioritize business value, and
              bringing in experts trained for client&apos;s specific industries, workflows, and
              technologies.
            </p>

            <Link
              href="#"
              className="mt-7 inline-flex items-center gap-3 rounded-full border-2 border-[#FF7A00] px-6 py-[12px] text-[16px] font-semibold text-[#FF7A00] transition hover:bg-[#FF7A00]/10"
            >
              See how we deliver results
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#FF7A00]/35">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 7h7v7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
