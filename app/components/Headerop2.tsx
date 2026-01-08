"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  logoSrc?: string; // e.g. "/assets/images/lattech-logo.png"
};

export default function LattechHeaderTailwind({ logoSrc = "/assets/images/logo.png" }: Props) {
  const [hide, setHide] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastY.current;

      if (Math.abs(delta) < 6) return; // prevent jitter

      if (delta > 0 && y > 80) setHide(true); // down -> hide
      if (delta < 0) setHide(false); // up -> show
      if (y <= 10) setHide(false); // top -> show

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* FIXED HEADER */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-[9999] bg-transparent",
          "transition-transform duration-300 [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)]",
          hide ? "-translate-y-[110%]" : "translate-y-0",
        ].join(" ")}
      >
        {/* TOP BAR */}
        <div className="h-[44px] bg-[#f6f6f6] border-b border-black/5">
          <div className="mx-auto flex h-[44px] max-w-[1380px] items-center justify-between px-[22px]">
            <div className="flex items-center gap-[18px]">
              <a
                className="grid h-[18px] w-[18px] place-items-center opacity-75 hover:opacity-100 transition-opacity"
                href="#"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                className="grid h-[18px] w-[18px] place-items-center opacity-75 hover:opacity-100 transition-opacity"
                href="#"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                className="grid h-[18px] w-[18px] place-items-center opacity-75 hover:opacity-100 transition-opacity"
                href="#"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                className="grid h-[18px] w-[18px] place-items-center opacity-75 hover:opacity-100 transition-opacity"
                href="#"
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </a>
            </div>

            <div className="flex items-center gap-[34px] whitespace-nowrap text-[14px] text-black/60">
              <span className="inline-flex items-center gap-[12px]">
                <MailIcon />
                info@lattech.com
              </span>
              <span className="inline-flex items-center gap-[12px]">
                <PhoneIcon />
                +92 03-111-456-041
              </span>
            </div>
          </div>
        </div>

        {/* MAIN PILL HEADER */}
        <div className="bg-white overflow-hidden rounded-bl-[40px] rounded-br-[40px] shadow-none">
          <div className="mx-auto flex h-[104px] max-w-[1380px] items-center justify-between gap-[26px] px-[26px]">
            {/* LOGO */}
            <a href="/" aria-label="Lattech Home" className="inline-flex min-w-[300px] items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt="LATTECH"
                className="h-[58px] w-auto"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
              <span className="hidden text-[46px] font-black tracking-[0.04em] text-[#58b531]">LATTECH</span>
            </a>

            {/* NAV */}
            <nav className="flex flex-1 items-center justify-center gap-[34px] max-[992px]:hidden" aria-label="Primary">
              <a href="#" className="px-[2px] py-[10px] text-[13px] font-medium text-black/60 hover:text-black/85">
                Services
              </a>

              <a
                href="#"
                className="inline-flex items-center gap-[10px] px-[2px] py-[10px] text-[13px] font-medium text-black/60 hover:text-black/85"
              >
                Industries
                <span className="inline-block h-[7px] w-[7px] rotate-45 translate-y-[-1px] border-b-2 border-r-2 border-black/45" />
              </a>

              <a
                href="#"
                className="inline-flex items-center gap-[10px] px-[2px] py-[10px] text-[13px] font-medium text-black/60 hover:text-black/85"
              >
                Solutions
                <span className="inline-block h-[7px] w-[7px] rotate-45 translate-y-[-1px] border-b-2 border-r-2 border-black/45" />
              </a>

              <a href="#" className="px-[2px] py-[10px] text-[13px] font-medium text-black/60 hover:text-black/85">
                Technologies
              </a>

              <a href="#" className="px-[2px] py-[10px] text-[13px] font-medium text-black/60 hover:text-black/85">
                Company
              </a>

              <a href="#" className="px-[2px] py-[10px] text-[13px] font-medium text-black/60 hover:text-black/85">
                Contact
              </a>
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-[14px] max-[992px]:hidden">
              <span className="ml-[6px] mr-[10px] h-[30px] w-px bg-black/12" />

              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full border-[1.8px] border-[#58b531] bg-white px-[20px] py-[12px] text-[13px] font-bold leading-none text-[#58b531]"
              >
                Sign up
              </a>

              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full border-[1.8px] border-[#ff7a00] bg-[#ff7a00] px-[20px] py-[12px] text-[13px] font-bold leading-none text-white"
              >
                Log in
              </a>
            </div>

            {/* MOBILE BURGER */}
            <button
              type="button"
              aria-label="Menu"
              className="hidden h-[48px] w-[48px] cursor-pointer flex-col items-center justify-center gap-[7px] rounded-[12px] bg-transparent max-[992px]:flex"
            >
              <span className="block h-[3px] w-[32px] rounded-[2px] bg-black/65" />
              <span className="block h-[3px] w-[32px] rounded-[2px] bg-black/65" />
              <span className="block h-[3px] w-[32px] rounded-[2px] bg-black/65" />
            </button>
          </div>
        </div>
      </header>

      {/* ✅ SPACER: prevents hero overlap (44 + 104 = 148) */}
      <div className="h-[148px]" />
    </>
  );
}

/* ---- icons ---- */
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="rgba(0,0,0,0.55)"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.3-7.3 4.6c-.4.25-.9.25-1.3 0L4 8.3V6l8 5 8-5v2.3Z"
      />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="rgba(0,0,0,0.55)"
        d="M6.6 10.8c1.4 2.6 3.6 4.8 6.2 6.2l2.1-2.1c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.9.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4c0-.6.4-1 1-1h3.3c.6 0 1 .4 1 1 0 1.4.2 2.7.6 3.9.1.4 0 .8-.3 1.1l-2 2.8Z"
      />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="rgba(0,0,0,0.55)"
        d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.5 1.6-1.5h1.6V4.9c-.8-.1-1.8-.2-3-.2-2.9 0-4.9 1.8-4.9 5V11H6.4v3h2.4v8h4.7z"
      />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="rgba(0,0,0,0.55)"
        d="M19.6 7.2c.01.2.01.4.01.6 0 6.3-4.8 10.8-10.8 10.8-2.1 0-4.1-.6-5.8-1.7h.8c1.7 0 3.2-.6 4.4-1.5-1.6 0-3-1.1-3.5-2.6.2.03.4.05.7.05.3 0 .6-.04.9-.1-1.7-.35-3-1.85-3-3.7v-.05c.5.28 1.1.45 1.7.47-1-.67-1.7-1.8-1.7-3.1 0-.7.18-1.3.5-1.9 1.8 2.2 4.6 3.6 7.7 3.8-.05-.28-.08-.56-.08-.85 0-2 1.6-3.6 3.6-3.6 1.04 0 1.97.44 2.62 1.14.82-.16 1.6-.46 2.3-.88-.27.85-.84 1.56-1.6 2.01.73-.09 1.43-.28 2.08-.56-.49.72-1.1 1.36-1.81 1.87z"
      />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="rgba(0,0,0,0.55)"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9A3.5 3.5 0 0 0 20 16.5v-9A3.5 3.5 0 0 0 16.5 4z"
      />
      <path
        fill="rgba(0,0,0,0.55)"
        d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
      />
      <circle cx="17.6" cy="6.4" r="1.1" fill="rgba(0,0,0,0.55)" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="rgba(0,0,0,0.55)"
        d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.9 4.6 12 4.6 12 4.6s-5.9 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12s.1 3.6.4 4.8a3 3 0 0 0 2.1 2.1c1.6.5 7.5.5 7.5.5s5.9 0 7.5-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-4.8.4-4.8s0-3.6-.4-4.8ZM10.2 15.3V8.7L16 12l-5.8 3.3Z"
      />
    </svg>
  );
}
