"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type Industry = {
  title: string;
  img?: string; 
  href: string;
};

const INDUSTRIES: Industry[] = [
  {
    title: "Healthcare",
    img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1400&q=80",
    href: "/industries/healthcare",
  },
  {
    title: "Finance",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=80",
    href: "/industries/finance",
  },
  {
    title: "Real Estate",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    href: "/industries/real-estate",
  },
  {
    title: "Engineering & Construction",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    href: "/industries/engineering-construction",
  },
  {
    title: "Retail",
    img: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=1400&q=80",
    href: "/industries/retail",
  },
  {
    title: "Manufacturing",
    img: "https://images.unsplash.com/photo-1581091870622-7d1f2d0bb4b5?auto=format&fit=crop&w=1400&q=80",
    href: "/industries/manufacturing",
  },
  {
    title: "Logistics & Transportation",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
    href: "/industries/logistics-transportation",
  },
  {
    title: "Energy & Utilities",
    img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1400&q=80",
    href: "/industries/energy-utilities",
  },
  {
    title: "Professional Services",
    img: "", // placeholder like screenshot
    href: "/industries/professional-services",
  },
  {
    title: "Telcoms",
    img: "", // placeholder like screenshot
    href: "/industries/telcoms",
  },
  {
    title: "Travel & Hospitality",
    img: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1400&q=80",
    href: "/industries/travel-hospitality",
  },
  {
    title: "Oil & Gas",
    img: "https://images.unsplash.com/photo-1610824224972-db9878a68d9a?auto=format&fit=crop&w=1400&q=80",
    href: "/industries/oil-gas",
  },
];

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
      <path d="M5 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

export default function IndustriesWeServed() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:py-20">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[44px] font-Regular leading-[1.1] tracking-[-0.02em] text-[#595A5A] md:text-[48px]">
            Industries we have <span className="font-semibold text-[#56BC2F]">Served</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[980px] text-[20px] leading-[1.95] text-[#525252]">
            With a wealth of experience across diverse sectors, we deliver tailored insights and solutions that drive
            tangible results for our valued partners.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
          {INDUSTRIES.map((it) => (
            <Link
              key={it.title}
              href={it.href}
              className={[
                "group block rounded-[16px] border border-[#EAEAEA] bg-white",
                "shadow-[0_8px_24px_rgba(0,0,0,0.04)]",
                "transition-all duration-200 hover:shadow-[0_12px_34px_rgba(0,0,0,0.08)] hover:border-[#E2E2E2]",
                "px-5 py-4",
              ].join(" ")}
            >
              {/* image */}
              <div className="relative h-[118px] w-full overflow-hidden rounded-[14px] bg-[#EFEFEF]">
                {it.img ? (
                  <Image src={it.img} alt={it.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                ) : (
                  <div className="absolute inset-0 bg-[#EFEFEF]" />
                )}
              </div>

              {/* title */}
              <div className="mt-4 text-[20px] font-semibold text-[#595A5A]">{it.title}</div>

              {/* link */}
              <div className="mt-2 inline-flex items-center gap-2 text-[16px] font-medium text-[#FF6600]">
                View details
                <span className="transition-transform duration-200 group-hover:translate-x-[2px]">
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* button */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/industries"
            className={[
              "inline-flex h-[44px] w-[150px] items-center justify-center rounded-full",
              "border border-[#39B54A] text-[#39B54A]",
              "text-[13px] font-medium",
              "transition-all duration-200 hover:bg-[#39B54A] hover:text-white",
            ].join(" ")}
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
