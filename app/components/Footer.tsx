"use client";

import React from "react";

export default function FooterExactPixelTailwind() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full bg-[#171717] z-10 overflow-visible">
      {/* Back to top */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={scrollToTop}
        className="
          absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2
          grid place-items-center
          h-[66px] w-[66px] rounded-full
          border-[5px] border-[#2b2b2b] bg-white
          shadow-[0_18px_40px_rgba(0,0,0,0.45)]
          z-[9999]
          sm:h-[60px] sm:w-[60px]
        "
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6.5 14.5L12 9l5.5 5.5"
            fill="none"
            stroke="#58B531"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Main */}
      <div
        className="
          pt-[72px] pb-[34px]
          px-6
        "
      >
        {/* ✅ This is what fixes the “fullwidth feel” */}
        <div className="mx-auto w-full max-w-[1220px]">
          <div
            className="
              grid gap-y-[22px]
              grid-cols-1
              md:grid-cols-2 md:gap-x-[34px]
              xl:grid-cols-[1.55fr_1fr_1fr_1fr_0.8fr] xl:gap-x-[72px]
            "
          >
            {/* Brand */}
            <div className="pt-[6px]">
              <div className="flex items-center mb-[22px]">
                <span className="text-[30px] font-black tracking-[0.04em] text-white/90">
                  LATTECH
                </span>
              </div>

              <div className="space-y-[14px]">
                <p className="text-[14px] leading-[1.7] text-white/55 max-w-[360px]">
                  A108 Adam Street New York, NY 535022&nbsp; United States
                </p>
                <p className="text-[14px] leading-[1.7] text-white/55 max-w-[360px]">
                  Phone: <span className="text-white/70">+1 5589 55488 55</span>
                </p>
                <p className="text-[14px] leading-[1.7] text-white/55 max-w-[360px]">
                  Email: <span className="text-white/70">info@example.com</span>
                </p>
              </div>

              <div className="flex gap-[18px] mt-[28px]">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="grid place-items-center h-[28px] w-[28px] no-underline opacity-90 transition hover:opacity-100 hover:-translate-y-[1px]"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="grid place-items-center h-[28px] w-[28px] no-underline opacity-90 transition hover:opacity-100 hover:-translate-y-[1px]"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="grid place-items-center h-[28px] w-[28px] no-underline opacity-90 transition hover:opacity-100 hover:-translate-y-[1px]"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="grid place-items-center h-[28px] w-[28px] no-underline opacity-90 transition hover:opacity-100 hover:-translate-y-[1px]"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>

            {/* Column */}
            <FooterCol
              title="Education"
              links={[
                "Email Marketing",
                "Social Media Marketing",
                "Search Engine Optimization",
                "Product Development",
                "Web Development",
              ]}
            />

            <FooterCol
              title="Business"
              links={[
                "Digital Marketing Agency",
                "SEO Agency",
                "PPC Agency",
                "Content Marketing Agency",
                "Internet Marketing Agency",
                "Locations",
                "Industries We Serve",
              ]}
            />

            <FooterCol
              title="Developer & IT"
              links={[
                "Internet Marketing",
                "Content Marketing",
                "Social Media",
                "Web Design",
                "Seo",
                "PPC",
                "Amazon",
              ]}
            />

            <FooterCol
              title="Company"
              links={[
                "About us",
                "Contact us",
                "SEO Checker",
                "Tools",
                "Marketing Guides",
                "Careers",
              ]}
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#2a2a2a] border-t border-white/5 py-[26px] px-4 flex justify-center">
        <div className="text-[13px] text-white/80">
          © Copyright <b>Lattech</b>. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-white/90 text-[18px] font-bold mb-[26px]">{title}</div>
      <ul className="list-none p-0 m-0">
        {links.map((t) => (
          <li key={t} className="mb-[16px]">
            <a
              href="#"
              className="text-white/50 text-[14px] no-underline transition-colors hover:text-white/80"
            >
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Icons */
function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="rgba(255,255,255,0.92)"
        d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.5 1.6-1.5h1.6V4.9c-.8-.1-1.8-.2-3-.2-2.9 0-4.9 1.8-4.9 5V11H6.4v3h2.4v8h4.7z"
      />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="rgba(255,255,255,0.92)"
        d="M19.6 7.2c.01.2.01.4.01.6 0 6.3-4.8 10.8-10.8 10.8-2.1 0-4.1-.6-5.8-1.7h.8c1.7 0 3.2-.6 4.4-1.5-1.6 0-3-1.1-3.5-2.6.2.03.4.05.7.05.3 0 .6-.04.9-.1-1.7-.35-3-1.85-3-3.7v-.05c.5.28 1.1.45 1.7.47-1-.67-1.7-1.8-1.7-3.1 0-.7.18-1.3.5-1.9 1.8 2.2 4.6 3.6 7.7 3.8-.05-.28-.08-.56-.08-.85 0-2 1.6-3.6 3.6-3.6 1.04 0 1.97.44 2.62 1.14.82-.16 1.6-.46 2.3-.88-.27.85-.84 1.56-1.6 2.01.73-.09 1.43-.28 2.08-.56-.49.72-1.1 1.36-1.81 1.87z"
      />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="rgba(255,255,255,0.92)"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9A3.5 3.5 0 0 0 20 16.5v-9A3.5 3.5 0 0 0 16.5 4z"
      />
      <path
        fill="rgba(255,255,255,0.92)"
        d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
      />
      <circle cx="17.6" cy="6.4" r="1.1" fill="rgba(255,255,255,0.92)" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="rgba(255,255,255,0.92)"
        d="M6.5 7.1A1.9 1.9 0 1 0 6.5 3.3a1.9 1.9 0 0 0 0 3.8zM4.7 20.7h3.6V9H4.7v11.7zM10 9h3.4v1.6h.05c.47-.9 1.63-1.85 3.35-1.85 3.6 0 4.25 2.37 4.25 5.45v6.45h-3.6v-5.72c0-1.37-.03-3.13-1.9-3.13-1.9 0-2.2 1.49-2.2 3.03v5.82H10V9z"
      />
    </svg>
  );
}
