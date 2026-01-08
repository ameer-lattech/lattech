"use client";

import React from "react";

type Item = { label: string; href?: string };

const ITEMS: Item[] = [
  { label: "Power & Renewables", href: "/projects/power-renewables" },
  { label: "Operators", href: "/projects/operators" },
  { label: "Oilfield Services", href: "/projects/oilfield-services" },
  { label: "Midstream", href: "/projects/midstream" },
  { label: "Minerals", href: "/projects/minerals" },
  { label: "Financial Services", href: "/projects/financial-services" },
  { label: "Healthcare", href: "/projects/healthcare" },
  { label: "Finance", href: "/projects/finance" },
  { label: "Real Estate", href: "/projects/real-estate" },
];

function BoltIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13 2L3 14h8l-1 8 11-14h-8l1-6z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StartProjectSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1180px] px-6 py-16 md:py-20">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[44px] font-medium leading-[1.1] tracking-[-0.02em] text-[#3B3B3B] md:text-[52px]">
            Start your{" "}
            <span className="font-semibold text-[#39B54A]">Project</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[820px] text-[13px] leading-[1.85] text-[#7A7A7A] md:text-[13px]">
            We help your business grow from inception to success. Our digital
            solutions enhance your online presence, drive sales, and optimize
            operations for efficiency and profitability.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => {
            const Tag: any = it.href ? "a" : "div";
            return (
              <Tag
                key={it.label}
                href={it.href}
                className={[
                  "group relative flex h-[66px] items-center justify-between rounded-[12px] border border-[#EAEAEA] bg-white px-6",
                  "shadow-[0_1px_0_rgba(0,0,0,0.02)]",
                  "transition-all duration-200 hover:border-[#DDDDDD] hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]",
                  it.href ? "cursor-pointer" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#FF7A00]">
                    <BoltIcon className="h-[22px] w-[22px]" />
                  </span>

                  <span className="text-[14px] font-medium text-[#4A4A4A]">
                    {it.label}
                  </span>
                </div>

                <span className="text-[#FF7A00] transition-transform duration-200 group-hover:translate-x-[2px]">
                  <ArrowIcon className="h-[18px] w-[18px]" />
                </span>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
