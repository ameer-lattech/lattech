"use client";

import React, { useEffect, useState } from "react";

type MenuItem = {
  label: string;
  href?: string;
};

type Props = {
  items: MenuItem[];
  className?: string;
};

export default function Menu({ items, className = "" }: Props) {
  const [open, setOpen] = useState(false);

  // lock body scroll when menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={["relative", className].join(" ")}>
      {/* MOBILE BUTTON */}
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-[44px] w-[44px] flex-col items-center justify-center gap-[6px] max-[992px]:flex md:hidden"
      >
        <span
          className={[
            "h-[3px] w-[28px] rounded bg-black/65 transition-transform duration-200",
            open ? "translate-y-[9px] rotate-45" : "",
          ].join(" ")}
        />
        <span
          className={[
            "h-[3px] w-[28px] rounded bg-black/65 transition-opacity duration-200",
            open ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
        <span
          className={[
            "h-[3px] w-[28px] rounded bg-black/65 transition-transform duration-200",
            open ? "-translate-y-[9px] -rotate-45" : "",
          ].join(" ")}
        />
      </button>

      {/* OVERLAY + PANEL */}
      <div
        className={[
          "fixed inset-0 z-[9998] md:hidden transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* overlay */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/35"
        />

        {/* panel */}
        <div
          className={[
            "absolute right-0 top-0 h-full w-[86%] max-w-[360px] bg-white",
            "shadow-[0_10px_40px_rgba(0,0,0,0.18)]",
            "transition-transform duration-200",
            open ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="flex h-[72px] items-center justify-between px-[18px] border-b border-black/5">
            <div className="text-[14px] font-semibold text-black/80">Menu</div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-[36px] w-[36px] grid place-items-center rounded-full hover:bg-black/5"
              aria-label="Close"
            >
              <span className="text-[18px] leading-none text-black/70">✕</span>
            </button>
          </div>

          <div className="px-[18px] py-[14px]">
            <nav className="flex flex-col">
              {items.map((it) => (
                <a
                  key={it.label}
                  href={it.href ?? "#"}
                  onClick={() => setOpen(false)}
                  className="py-[14px] text-[14px] font-medium text-black/70 hover:text-black border-b border-black/5"
                >
                  {it.label}
                </a>
              ))}
            </nav>

            <div className="mt-[18px] flex flex-col gap-[10px]">
              <a className="rounded-full border-[1.8px] border-[#58b531] px-[18px] py-[12px] text-[13px] font-bold text-[#58b531] text-center">
                Sign up
              </a>
              <a className="rounded-full border-[1.8px] border-[#ff7a00] bg-[#ff7a00] px-[18px] py-[12px] text-[13px] font-bold text-white text-center">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
