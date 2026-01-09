"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  logoSrc?: string;
};

export default function SimpleLattechHeader({
  logoSrc = "/assets/images/logo.png",
}: Props) {
  const [hideTop, setHideTop] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const down = y > lastY.current;
      lastY.current = y;

      if (y > 20 && down) setHideTop(true);
      if (!down) setHideTop(false);
      if (y <= 10) setHideTop(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-[9999]">
      {/* TOP BAR */}
      <div
        className={`h-[38px] bg-[#f6f6f6] border-b border-black/5 transition-all duration-200 ${
          hideTop ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto max-w-[1280px] h-full px-4 flex items-center justify-between text-[13px] text-black/60">
          {/* left */}
          <div className="flex items-center gap-4">
            <Icon><FacebookIcon /></Icon>
            <Icon><TwitterIcon /></Icon>
            <Icon><InstagramIcon /></Icon>
            <Icon><YouTubeIcon /></Icon>
          </div>

          {/* right */}
          <div className="hidden md:flex items-center gap-8 whitespace-nowrap">
            <span className="flex items-center gap-2">
              <MailIcon /> info@lattech.com
            </span>
            <span className="flex items-center gap-2">
              <PhoneIcon /> +92 03-111-456-041
            </span>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div
        className={`relative bg-white border-b border-black/10 rounded-b-[40px] overflow-hidden transition-transform duration-200 ${
          hideTop ? "-translate-y-[38px]" : "translate-y-0"
        } -mb-[40px]`}
      >
        <div className="mx-auto max-w-[1280px] h-[92px] px-4 flex items-center justify-between gap-6">
          {/* logo */}
          <a href="/" className="flex items-center min-w-[240px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="LATTECH"
              className="h-[52px] w-auto"
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).style.display = "none")
              }
            />
            <span className="hidden text-[44px] font-black tracking-widest text-[#58b531]">
              LATTECH
            </span>
          </a>

          {/* nav */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-black/60 flex-1 justify-center">
            <a href="#" className="hover:text-black/85">Services</a>
            <Dropdown>Industries</Dropdown>
            <Dropdown>Solutions</Dropdown>
            <a href="#" className="hover:text-black/85">Technologies</a>
            <a href="#" className="hover:text-black/85">Company</a>
            <a href="#" className="hover:text-black/85">Contact</a>
          </nav>

          {/* actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="h-[26px] w-px bg-black/15 mx-2" />
            <a
              href="#"
              className="rounded-full border border-[#58b531] px-5 py-2 text-[13px] font-semibold text-[#58b531]"
            >
              Sign up
            </a>
            <a
              href="#"
              className="rounded-full bg-[#ff7a00] px-5 py-2 text-[13px] font-semibold text-white"
            >
              Log in
            </a>
          </div>

          {/* burger */}
          <button className="lg:hidden flex flex-col items-center justify-center gap-[7px] w-[46px] h-[46px]">
            <span className="w-[30px] h-[3px] rounded bg-black/65" />
            <span className="w-[30px] h-[3px] rounded bg-black/65" />
            <span className="w-[30px] h-[3px] rounded bg-black/65" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------- helpers ---------- */

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-[18px] h-[18px] grid place-items-center opacity-70 hover:opacity-100 transition">
      {children}
    </span>
  );
}

function Dropdown({ children }: { children: string }) {
  return (
    <span className="flex items-center gap-2 cursor-pointer hover:text-black/85">
      {children}
      <span className="w-[7px] h-[7px] border-r-2 border-b-2 border-black/45 rotate-45 -translate-y-[1px]" />
    </span>
  );
}

/* ---------- icons ---------- */

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="rgba(0,0,0,0.55)" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="rgba(0,0,0,0.55)" d="M6.6 10.8c1.4 2.6 3.6 4.8 6.2 6.2l2.1-2.1c.3-.3.7-.4 1.1-.3Z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="rgba(0,0,0,0.55)" d="M13.5 22v-8h2.7l.4-3h-3.1V9.1Z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="rgba(0,0,0,0.55)" d="M19.6 7.2c.01.2.01.4.01.6Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="rgba(0,0,0,0.55)" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5Z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="rgba(0,0,0,0.55)" d="M21.6 7.2a3 3 0 0 0-2.1-2.1Z" />
    </svg>
  );
}
