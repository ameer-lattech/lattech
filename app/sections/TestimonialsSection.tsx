"use client";

import React, { useMemo, useState } from "react";

type Testimonial = {
  stars: 5 | 4;
  quote: string;
  name: string;
  company: string;
  initials?: string; // for circle avatar
  logoText?: string; // if you want simple logo placeholder
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={i < count ? "opacity-100" : "opacity-20"}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="grid h-[42px] w-[42px] place-items-center rounded-full bg-[#2E2E2E] text-white">
      <span className="text-[16px] font-semibold">{initials}</span>
    </div>
  );
}

export default function JourneyTestimonials() {
  const ALL: Testimonial[] = useMemo(
    () => [
      {
        stars: 5,
        quote:
          "Working with the talented team at Lattech Solution was an absolute pleasure. Their commitment to excellence and innovative approach transformed our vision into a stunning reality. Our new website has garnered rave reviews, and we couldn't be happier with the results!",
        name: "Jen Rae",
        company: "Grand Opera House",
        logoText: "G",
      },
      {
        stars: 5,
        quote:
          "Lattech's expertise in design, technology, and SEO is unmatched. They delivered a cutting-edge website that exceeded our expectations. A dedicated and highly skilled team that we wholeheartedly endorse for any web development project.",
        name: "Liane Goldring",
        company: "Mahlatini",
        initials: "m",
      },
      {
        stars: 5,
        quote:
          "The team at Lattech Solution is exceptional to collaborate with. Their profound knowledge in the field is evident, and we are thrilled with our new website, which is tailored to our customers' needs. I eagerly anticipate continuing our partnership with VoltraTech as our digital innovation ally.",
        name: "Ann Graham",
        company: "W5",
        initials: "W5",
      },
      {
        stars: 5,
        quote:
          "Lattech Solution has been a joy to partner with, both for our website and advertising campaigns. Their team demonstrated incredible responsiveness and genuine care throughout the project.",
        name: "Sarah Malik",
        company: "Studio North",
        initials: "SN",
      },
      {
        stars: 5,
        quote:
          "Our experience with Lattech Solution during the creation of our new website was outstanding. We felt secure knowing that their seasoned team was handling everything with precision.",
        name: "Omar Khan",
        company: "Crescent Labs",
        initials: "CL",
      },
      {
        stars: 5,
        quote:
          "We engaged Lattech Solution to develop two new websites: one to highlight our visitor experiences and facilities, and another for internal operations. Both delivered beautifully and on time.",
        name: "Ayesha Noor",
        company: "City Experiences",
        initials: "CE",
      },
      // extra items for "Show more"
      {
        stars: 5,
        quote:
          "Clean process, great communication, and strong UI/UX decisions. The end result feels premium and performs fast.",
        name: "David Lee",
        company: "Nimble Co.",
        initials: "NC",
      },
      {
        stars: 5,
        quote:
          "They understood our goals quickly and shipped iteratively. The final website feels modern and scalable.",
        name: "Hina Farooq",
        company: "BrightWorks",
        initials: "BW",
      },
      {
        stars: 5,
        quote:
          "Top-tier execution. The team handled everything from design to deployment with confidence.",
        name: "Usman Ali",
        company: "Vertex Studio",
        initials: "VS",
      },
    ],
    []
  );

  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? ALL : ALL.slice(0, 6);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-16 pt-12 md:pb-20 md:pt-16">
        {/* heading */}
        <div className="text-center">
          <h2 className="text-[44px] font-medium leading-tight tracking-[-0.02em] text-[#666666]">
            Our <span className="font-semibold text-[#43B02A]">Journey</span> of Building Success
          </h2>
          <p className="mx-auto mt-4 max-w-[900px] text-[14px] leading-[1.95] text-[#7A7A7A]">
            We are a dynamic software development firm, blending innovative strategies with technical precision to deliver
            intuitive, user-focused solutions that address complex challenges and boost business performance.
          </p>
        </div>

        {/* cards */}
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
          {visible.map((t, idx) => (
            <article
              key={`${t.name}-${idx}`}
              className="rounded-[36px] bg-[#FBFBFB] px-8 pb-7 pt-7 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
            >
              <div className="text-[#F6B21A]">
                <Stars count={t.stars} />
              </div>

              <p className="mt-4 text-[12.5px] leading-[1.9] text-[#7A7A7A]">
                “{t.quote}”
              </p>

              <div className="mt-7 flex items-center gap-3">
                {/* left badge/logo */}
                {t.initials ? (
                  <Avatar initials={t.initials} />
                ) : (
                  <div className="grid h-[42px] w-[42px] place-items-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                    <span className="text-[16px] font-semibold text-[#1E1E1E]">
                      {t.logoText ?? "L"}
                    </span>
                  </div>
                )}

                <div>
                  <div className="text-[12.5px] font-semibold text-[#2E2E2E]">{t.name}</div>
                  <div className="text-[11.5px] text-[#9A9A9A]">{t.company}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* button */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            className="rounded-full border border-[#43B02A] px-6 py-[10px] text-[12px] font-medium text-[#43B02A] transition hover:bg-[#43B02A] hover:text-white"
          >
            {showAll ? "Show less testimonials" : "Show more testimonials"}
          </button>
        </div>
      </div>
    </section>
  );
}
