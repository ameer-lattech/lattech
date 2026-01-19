"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  logoSrc?: string;
};

type IconItem = {
  label: string;
  icon: string;
  href?: string;
  tweakClass?: string;
};

function SvgIconImg({
  src,
  alt,
  size = 18,
  className = "",
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={["block object-contain", className].join(" ")}
      style={{ width: size, height: size }}
    />
  );
}

export default function LattechHeader({
  logoSrc = "/assets//images/Logo.png",
}: Props) {
  const [hide, setHide] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastY.current;

      if (Math.abs(delta) < 6) return;
      if (delta > 0 && y > 80) setHide(true);
      if (delta < 0) setHide(false);
      if (y <= 10) setHide(false);

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const SOCIALS: IconItem[] = [
    { label: "Facebook", icon: "/assets/svgs/facebook.svg", tweakClass: "scale-[2.06]" },
    { label: "Twitter", icon: "/assets/svgs/twitter.svg", tweakClass: "scale-[2.06]" },
    { label: "Instagram", icon: "/assets/svgs/insta.svg", tweakClass: "scale-[2.08]" },
    { label: "YouTube", icon: "/assets/svgs/yt.svg", tweakClass: "scale-[2.06]" },
  ];

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-[9999] bg-transparent",
          "transition-transform duration-300 [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)]",
          hide ? "-translate-y-[110%]" : "translate-y-0",
        ].join(" ")}
      >
        {/* TOP BAR (HIDDEN ON MOBILE) */}
        <div className="hidden md:block h-[44px] bg-white md:border-b md:border-black/5">
          <div className="mx-auto flex h-[44px] max-w-[1280px] items-center justify-between px-[22px]">
            {/* SOCIALS */}
            <div className="flex items-center gap-[18px] md:gap-[26px]">
              {SOCIALS.map((item) => (
                <a
                  key={item.label}
                  href={item.href ?? "#"}
                  aria-label={item.label}
                  className="grid h-[18px] w-[18px] place-items-center opacity-75 transition-opacity hover:opacity-100"
                >
                  <SvgIconImg
                    src={item.icon}
                    alt={item.label}
                    size={18}
                    className={item.tweakClass ?? ""}
                  />
                </a>
              ))}
            </div>

            {/* CONTACT */}
            <div className="flex items-center gap-[34px] whitespace-nowrap text-[14px] text-black/60">
              <span className="inline-flex items-center gap-[12px]">
                <SvgIconImg src="/assets/svgs/mail.svg" alt="Email" size={16} className="opacity-80" />
                info@lattech.com
              </span>

              <span className="inline-flex items-center gap-[12px]">
                <SvgIconImg src="/assets/svgs/call.svg" alt="Phone" size={16} className="opacity-80" />
                +92 03-111-456-041
              </span>
            </div>
          </div>
        </div>

        {/* MAIN HEADER */}
        <div
          className={[
            "bg-white overflow-hidden",
            // ✅ MOBILE: no rounded/shadow, clean edge
            "rounded-none shadow-none",
            // ✅ DESKTOP: keep style
            "md:rounded-bl-[40px] md:rounded-br-[40px] md:shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
            // ✅ MOBILE: remove bottom border (if any appears)
            "border-b-0",
          ].join(" ")}
        >
          <div
            className={[
              "mx-auto flex items-center justify-between gap-[14px]",
              "max-w-[1280px]",
              // ✅ HEIGHT: mobile smaller, desktop same
              "h-[72px] sm:h-[84px] md:h-[104px]",
              // ✅ PADDING: mobile tight, desktop original
              "px-[14px] sm:px-[18px] md:px-[26px]",
            ].join(" ")}
          >
            {/* LOGO */}
            <a href="/" className="inline-flex items-center">
              <img
                src={logoSrc}
                alt="LATTECH"
                className="h-[28px] sm:h-[34px] md:h-[58px] w-auto"
              />
            </a>

            {/* NAV */}
            <nav className="flex flex-1 items-center justify-center gap-[34px] max-[992px]:hidden">
              {["Services", "Industries", "Solutions", "Technologies", "Company", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="px-[2px] py-[10px] text-[13px] font-medium text-black/60 hover:text-black/85"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-[14px] max-[992px]:hidden">
              <span className="mx-[10px] h-[30px] w-px bg-black/12" />
              <a className="rounded-full border-[1.8px] border-[#58b531] px-[20px] py-[12px] text-[13px] font-bold text-[#58b531]">
                Sign up
              </a>
              <a className="rounded-full border-[1.8px] border-[#ff7a00] bg-[#ff7a00] px-[20px] py-[12px] text-[13px] font-bold text-white">
                Log in
              </a>
            </div>

            {/* MOBILE BUTTON */}
            <button className="flex h-[44px] w-[44px] flex-col items-center justify-center gap-[6px] max-[992px]:flex md:hidden">
              <span className="h-[3px] w-[28px] rounded bg-black/65" />
              <span className="h-[3px] w-[28px] rounded bg-black/65" />
              <span className="h-[3px] w-[28px] rounded bg-black/65" />
            </button>
          </div>
        </div>
      </header>

   {/* SPACER */}
     <div className="h-[96px] md:h-[148px] -mb-[28px]" />
    </>
  );
}
