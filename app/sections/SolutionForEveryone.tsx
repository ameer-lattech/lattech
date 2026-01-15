"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

type Card = {
  title: string;
  desc: string;
  href: string;
  variant: "green" | "light" | "dark";
  image: string;
  imageAlt?: string;
};

const CARDS: Card[] = [
  {
    title: "Startups",
    desc: "Looking for the right tech partner to\nhelp you build",
    href: "/solutions/startups",
    variant: "green",
    image: "/assets/images/solforevstartup.png",
    imageAlt: "Startups illustration",
  },
  {
    title: "Small & Medium Enterprise",
    desc: "Looking for the right partner to\nscale and grow your business.",
    href: "/solutions/sme",
    variant: "light",
    image: "/assets/images/solforevmedenterprise.png", 
    imageAlt: "SME illustration",
  },
  {
    title: "Enterprise Organizations",
    desc: "Looking for the right partner to\naugment your teams.",
    href: "/solutions/enterprise",
    variant: "dark",
    image: "/assets/images/solforevorg.png",
    imageAlt: "Enterprise illustration",
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

export default function SolutionForEveryone() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1180px] px-6 py-16 md:py-20">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[44px] font-Regular leading-[1.1] tracking-[-0.02em] text-[#595A5A] md:text-[52px]">
            Solution for <span className="font-semibold text-[#39B54A]">Everyone</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[900px] text-[20px] leading-[1.9] text-[#525252]">
            We help your business grow from inception to success. Our digital solutions enhance your
            online presence, drive sales, and optimize operations for efficiency and profitability.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-10">
          {CARDS.map((c) => {
            const isGreen = c.variant === "green";
            const isLight = c.variant === "light";
            const isDark = c.variant === "dark";

            return (
              <Link
                key={c.title}
                href={c.href}
                className={[
                  "group relative block overflow-hidden rounded-[44px] border transition-all duration-200",
                  "h-[420px] md:h-[440px]",
                  isGreen
                    ? "border-transparent bg-[#57C12E] text-white"
                    : isLight
                    ? "border-[#EAEAEA] bg-white text-[#3B3B3B]"
                    : "border-transparent bg-[#5A5A5A] text-white",
                  "shadow-[0_14px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]",
                ].join(" ")}
              >
                {/* Top content */}
                <div className="px-10 pt-14 text-center">
                  <div
                    className={[
                      "inline-flex items-center justify-center gap-3",
                      "text-[18px] font-semibold",
                      isLight ? "text-[#5B5B5B]" : "text-white",
                      isDark ? "text-white" : "",
                      isGreen ? "text-white" : "",
                    ].join(" ")}
                  >
                    <span>{c.title}</span>

                    <span
                      className={[
                        "transition-transform duration-200 group-hover:translate-x-[2px]",
                        isLight ? "text-[#FF7A00]" : "text-white",
                      ].join(" ")}
                    >
                      <ArrowIcon />
                    </span>
                  </div>

                  <p
                    className={[
                      "mt-6 whitespace-pre-line text-[16px] leading-[1.9]",
                      isGreen ? "text-white/95" : isLight ? "text-[#7A7A7A]" : "text-white/65",
                    ].join(" ")}
                  >
                    {c.desc}
                  </p>
                </div>


<div
  className={[
    "pointer-events-none absolute inset-x-0 bottom-[22px]", 
    "h-[230px] md:h-[250px]", 
    "px-[42px] md:px-[52px]",
  ].join(" ")}
>
  <Image
    src={c.image}
    alt={c.imageAlt ?? c.title}
    fill
    className={[
      "object-contain object-bottom", 
      "transition-transform duration-300 group-hover:scale-[1.02]",
      isLight ? "opacity-[0.9]" : "opacity-[0.55]",
      isDark ? "opacity-[0.35]" : "",
    ].join(" ")}
    priority={false}
  />
</div>


                <div
                  className={[
                    "pointer-events-none absolute inset-x-0 bottom-0 h-[120px]",
                    isLight ? "bg-gradient-to-b from-transparent to-black/[0.02]" : "bg-gradient-to-b from-transparent to-black/[0.10]",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
