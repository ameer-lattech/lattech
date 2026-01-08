"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  logoSrc?: string; // e.g. "/assets/images/logo.png"
};

export default function SimpleLattechHeader({ logoSrc = "/assets/images/logo.png" }: Props) {
  const [hideTop, setHideTop] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const down = y > lastY.current;
      lastY.current = y;

      if (y > 20 && down) setHideTop(true); // hide top bar on scroll down
      if (!down) setHideTop(false); // show when scrolling up
      if (y <= 10) setHideTop(false); // always show at top
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="hdr">
      {/* TOP THIN BAR (hides on scroll) */}
      <div className={`top ${hideTop ? "hide" : ""}`}>
        <div className="topInner">
          <div className="topLeft">
            <a className="i" href="#" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a className="i" href="#" aria-label="Twitter">
              <TwitterIcon />
            </a>
            <a className="i" href="#" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a className="i" href="#" aria-label="YouTube">
              <YouTubeIcon />
            </a>
          </div>

          <div className="topRight">
            <span className="item">
              <MailIcon />
              info@lattech.com
            </span>
            <span className="item">
              <PhoneIcon />
              +92 03-111-456-041
            </span>
          </div>
        </div>
      </div>

      {/* MAIN HEADER (always visible, end-to-end, NO SHADOW) */}
      <div className={`main ${hideTop ? "atTop" : ""}`}>
        <div className="mainInner">
          <a className="logo" href="/" aria-label="Lattech Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="logoImg"
              src={logoSrc}
              alt="LATTECH"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
            />
            <span className="logoFallback">LATTECH</span>
          </a>

          <nav className="nav" aria-label="Primary">
            <a href="#">Services</a>
            <a className="dd" href="#">
              Industries <span className="chev" />
            </a>
            <a className="dd" href="#">
              Solutions <span className="chev" />
            </a>
            <a href="#">Technologies</a>
            <a href="#">Company</a>
            <a href="#">Contact</a>
          </nav>

          <div className="actions">
            <span className="v" />
            <a className="btn outline" href="#">
              Sign up
            </a>
            <a className="btn fill" href="#">
              Log in
            </a>
          </div>

          {/* Mobile burger (like your screenshot) */}
          <button className="burger" type="button" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <style jsx>{`
        .hdr {
          position: sticky;
          top: 0;
          z-index: 9999;
        //   background: #fff;
        }

        /* ---------- Top bar ---------- */
        .top {
          height: 38px;
          background: #f6f6f6;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          transition: transform 220ms ease, opacity 220ms ease;
          transform: translateY(0);
          opacity: 1;
        }
        .top.hide {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }

        .topInner {
          max-width: 1320px;
          margin: 0 auto;
          height: 38px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .topLeft {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .i {
          width: 18px;
          height: 18px;
          display: grid;
          place-items: center;
          opacity: 0.7;
          transition: opacity 0.15s ease;
        }
        .i:hover {
          opacity: 1;
        }

        .topRight {
          display: flex;
          align-items: center;
          gap: 30px;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.62);
          white-space: nowrap;
        }

        .item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        /* ---------- Main header ---------- */
      .main {
  height: 92px;
  background: #ffffff;
  transition: transform 220ms ease;
  transform: translateY(0);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  overflow: hidden;
  margin-bottom: -25px;
}

        /* when top bar hides, we pull main up to fill the gap smoothly */
        .main.atTop {
          transform: translateY(-39px);
        }

        .mainInner {
          max-width: 1320px;
          margin: 0 auto;
          height: 92px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .logo {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          min-width: 260px;
        }
        .logoImg {
          height: 52px;
          width: auto;
          display: block;
        }
        .logoFallback {
          display: none;
          font-size: 44px;
          font-weight: 900;
          letter-spacing: 0.04em;
          color: #58b531;
        }
        .logoImg[style*="display: none"] + .logoFallback {
          display: inline-block;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 28px;
          flex: 1;
          justify-content: center;
        }
        .nav a {
          text-decoration: none;
          color: rgba(0, 0, 0, 0.62);
          font-size: 13px;
          font-weight: 500;
          padding: 8px 2px;
        }
        .nav a:hover {
          color: rgba(0, 0, 0, 0.85);
        }

        .dd {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .chev {
          width: 7px;
          height: 7px;
          border-right: 2px solid rgba(0, 0, 0, 0.45);
          border-bottom: 2px solid rgba(0, 0, 0, 0.45);
          transform: rotate(45deg) translateY(-1px);
          display: inline-block;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .v {
          width: 1px;
          height: 26px;
          background: rgba(0, 0, 0, 0.12);
          margin: 0 8px;
        }

        .btn {
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 18px;
          border-radius: 999px;
          line-height: 1;
          border: 1.6px solid transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btn.outline {
          color: #58b531;
          border-color: #58b531;
          background: #fff;
        }
        .btn.fill {
          color: #fff;
          background: #ff7a00;
          border-color: #ff7a00;
        }

        /* Mobile */
        .burger {
          display: none;
          width: 46px;
          height: 46px;
          border: 0;
          background: transparent;
          border-radius: 12px;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          gap: 7px;
          flex-direction: column;
        }
        .burger span {
          width: 30px;
          height: 3px;
          border-radius: 2px;
          background: rgba(0, 0, 0, 0.65);
          display: block;
        }

        @media (max-width: 992px) {
          .nav,
          .actions {
            display: none;
          }
          .burger {
            display: inline-flex;
          }
          .logo {
            min-width: 0;
          }
        }
      `}</style>
    </header>
  );
}

/* -------- Small SVG icons (clean + exact feel) -------- */
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
