"use client";

import React from "react";

export default function FooterExactPixel() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <button className="backTop" type="button" aria-label="Back to top" onClick={scrollToTop}>
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

      <div className="main">
        <div className="grid">
          <div className="col brandCol">
            <div className="logoRow">
              <span className="logoText">LATTECH</span>
            </div>

            <div className="info">
              <p>A108 Adam Street New York, NY 535022&nbsp; United States</p>
              <p>
                Phone: <span>+1 5589 55488 55</span>
              </p>
              <p>
                Email: <span>info@example.com</span>
              </p>
            </div>

            <div className="social">
              <a href="#" aria-label="Facebook" className="sIcon">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Twitter" className="sIcon">
                <TwitterIcon />
              </a>
              <a href="#" aria-label="Instagram" className="sIcon">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="sIcon">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <div className="col">
            <div className="head">Education</div>
            <ul className="links">
              <li>
                <a href="#">Email Marketing</a>
              </li>
              <li>
                <a href="#">Social Media Marketing</a>
              </li>
              <li>
                <a href="#">Search Engine Optimization</a>
              </li>
              <li>
                <a href="#">Product Development</a>
              </li>
              <li>
                <a href="#">Web Development</a>
              </li>
            </ul>
          </div>

          <div className="col">
            <div className="head">Business</div>
            <ul className="links">
              <li>
                <a href="#">Digital Marketing Agency</a>
              </li>
              <li>
                <a href="#">SEO Agency</a>
              </li>
              <li>
                <a href="#">PPC Agency</a>
              </li>
              <li>
                <a href="#">Content Marketing Agency</a>
              </li>
              <li>
                <a href="#">Internet Marketing Agency</a>
              </li>
              <li>
                <a href="#">Locations</a>
              </li>
              <li>
                <a href="#">Industries We Serve</a>
              </li>
            </ul>
          </div>

          <div className="col">
            <div className="head">Developer &amp; IT</div>
            <ul className="links">
              <li>
                <a href="#">Internet Marketing</a>
              </li>
              <li>
                <a href="#">Content Marketing</a>
              </li>
              <li>
                <a href="#">Social Media</a>
              </li>
              <li>
                <a href="#">Web Design</a>
              </li>
              <li>
                <a href="#">Seo</a>
              </li>
              <li>
                <a href="#">PPC</a>
              </li>
              <li>
                <a href="#">Amazon</a>
              </li>
            </ul>
          </div>

          <div className="col">
            <div className="head">Company</div>
            <ul className="links">
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">SEO Checker</a>
              </li>
              <li>
                <a href="#">Tools</a>
              </li>
              <li>
                <a href="#">Marketing Guides</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bottomBar">
        <div className="copy">
          © Copyright <b>Lattech</b>. All Rights Reserved
        </div>
      </div>

      <style jsx>{`
        .footer {
          position: relative;
          width: 100%;
          background: #121212;

          /* ✅ IMPORTANT: allow button to stick out above footer */
          overflow: visible;
          z-index: 10;
        }

        .backTop {
          position: absolute;
          left: 50%;

          /* ✅ push it above the footer so it doesn't sit "inside" */
          top: 0;
          transform: translate(-50%, -50%);

          width: 66px;
          height: 66px;
          border-radius: 999px;
          border: 5px solid #2b2b2b;
          background: #ffffff;
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);

          /* ✅ always above everything */
          z-index: 9999;
        }

        .main {
          padding: 72px 78px 34px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1.55fr 1fr 1fr 1fr 0.8fr;
          column-gap: 72px;
          row-gap: 22px;
          align-items: start;
        }

        .brandCol {
          padding-top: 6px;
        }

        .logoRow {
          display: flex;
          align-items: center;
          margin-bottom: 22px;
        }

        .logoText {
          font-size: 30px;
          font-weight: 900;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.92);
        }

        .info p {
          margin: 0 0 14px 0;
          font-size: 12px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.55);
          max-width: 360px;
        }

        .info span {
          color: rgba(255, 255, 255, 0.72);
        }

        .social {
          display: flex;
          gap: 18px;
          margin-top: 28px;
        }

        .sIcon {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          text-decoration: none;
          opacity: 0.88;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        .sIcon:hover {
          opacity: 1;
          transform: translateY(-1px);
        }

        .head {
          color: rgba(255, 255, 255, 0.92);
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 26px;
        }

        .links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .links li {
          margin: 0 0 16px 0;
        }

        .links a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 12px;
          transition: color 0.15s ease;
        }

        .links a:hover {
          color: rgba(255, 255, 255, 0.82);
        }

        .bottomBar {
          background: #2a2a2a;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 26px 16px;
          display: flex;
          justify-content: center;
        }

        .copy {
          color: rgba(255, 255, 255, 0.78);
          font-size: 13px;
        }

        @media (max-width: 1150px) {
          .main {
            padding: 70px 22px 34px;
          }
          .grid {
            grid-template-columns: 1fr 1fr;
            column-gap: 34px;
          }
        }

        @media (max-width: 640px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .backTop {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </footer>
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
