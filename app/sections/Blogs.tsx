"use client";

import React from "react";
import Link from "next/link";

type BlogCard = {
  tag: string;
  title: string;
  desc: string;
  img: string;
  href: string;
};

const BLOGS: BlogCard[] = [
  {
    tag: "Design",
    title: "UX review presentations",
    desc: "How do you create compelling presentations that wow your colleagues and impress your managers?",
    img: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1400&q=80",
    href: "/blog/ux-review-presentations",
  },
  {
    tag: "Product",
    title: "Migrating to Linear 101",
    desc: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
    href: "/blog/migrating-to-linear-101",
  },
  {
    tag: "Software Engineering",
    title: "Building your API stack",
    desc: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80",
    href: "/blog/building-your-api-stack",
  },
];

function ArrowOut() {
  return (
    <span className="inline-flex h-[26px] w-[26px] items-center justify-center">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
  );
}

export default function LatestTechUpdatesSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-8 pb-[90px] pt-[72px]">
        {/* top row */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-[12px] font-semibold text-[#35B24A]">Our blog</div>

            <h2 className="mt-2 text-[48px] font-medium leading-[1.1] tracking-[-0.02em] text-[#595A5A]">
              Lastest <span className="text-[#35B24A]">Tech</span> updates
            </h2>

            <p className="mt-3 max-w-[620px] text-[20px] leading-[1.8] text-[#7C7C7C]">
              Tool and strategies modern teams need to help their companies grow.
            </p>
          </div>

          <Link
            href="/blog"
            className="mt-1 inline-flex h-[44px] items-center rounded-full bg-[#FF7A00] px-[18px] text-[16px] font-semibold text-white shadow-[0_10px_22px_rgba(255,122,0,0.25)] hover:opacity-90 transition"
          >
            View all posts
          </Link>
        </div>

        {/* cards */}
        <div className="mt-[46px] grid grid-cols-1 gap-x-[54px] gap-y-[44px] md:grid-cols-3">
          {BLOGS.map((b, i) => (
            <Link
              key={b.title}
              href={b.href}
              className="group block"
              aria-label={b.title}
            >
              {/* image */}
              <div
                className={[
                  "relative w-full overflow-hidden rounded-[44px]",
                  "h-[190px]",
                  i === 2 ? "bg-[#E9ECEF]" : "bg-[#F2F2F2]",
                ].join(" ")}
              >
                {/* Using <img> so you don’t need next/image remotePatterns */}
                <img
                  src={b.img}
                  alt={b.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* meta + title */}
              <div className="mt-[18px]">
                <div className="text-[11px] font-semibold text-[#FF7A00]">
                  {b.tag}
                </div>

                <div className="mt-[10px] flex items-start justify-between gap-3">
                  <h3 className="text-[18px] font-semibold leading-[1.25] text-[#606060]">
                    {b.title}
                  </h3>

                  <span className="mt-[2px] text-[#7A7A7A] opacity-80 group-hover:opacity-100 transition">
                    <ArrowOut />
                  </span>
                </div>

                <p className="mt-[10px] max-w-[340px] text-[13px] leading-[1.8] text-[#8A8A8A]">
                  {b.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
