"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  brand: string;
  desc: string;
  statLabel: string;
  statValue: string;
  statSuffix: string;
  image: string;
  review: {
    quote: string;
    name: string;
    role: string;
    avatar: string;
  };
};

export default function FeaturedCaseStudy() {
  const SLIDES: Slide[] = useMemo(
    () => [
      {
        brand: "QuickCard",
        desc:
          "From escaping expensive out-of-contract rates to securing a renewable contract, find out how Double Eleven partnered with Lattech for game-changing POS Software industry sales advice.",
        statLabel: "POS procurement sales",
        statValue: "300k",
        statSuffix: "GBP",
        image:
          "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80",
        review: {
          quote:
            "“Lattech are not only really easy to deal with, they have a brilliant innovation desk that has enabled us to stay resilient and make sales during a volatile procurement period.”",
          name: "M. Harris",
          role: "Facilities Manager at QuickCard",
          avatar:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=240&q=70",
        },
      },
      {
        brand: "PayFlex",
        desc:
          "Lattech helped PayFlex modernise its in-store payment experience, reducing operational costs while improving checkout speed across hundreds of locations.",
        statLabel: "Annual savings",
        statValue: "180k",
        statSuffix: "GBP",
        image:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=80",
        review: {
          quote:
            "“The results were immediate. Lattech understood our needs and delivered a solution that scaled effortlessly with our growth.”",
          name: "Sarah Collins",
          role: "Operations Director at PayFlex",
          avatar:
            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=240&q=70",
        },
      },
      {
        brand: "TapNova",
        desc:
          "TapNova partnered with Lattech to redesign their POS rollout strategy—improving reliability, reducing downtime, and increasing customer satisfaction nationwide.",
        statLabel: "Deployment uplift",
        statValue: "42%",
        statSuffix: "YOY",
        image:
          "https://images.unsplash.com/photo-1556741533-f6acd647d2fb?auto=format&fit=crop&w=1400&q=80",
        review: {
          quote:
            "“From planning to execution, Lattech brought clarity and speed. We shipped faster, with fewer issues, and a much better user experience.”",
          name: "A. Raymond",
          role: "Head of Product at TapNova",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=70",
        },
      },
      {
        brand: "Cardigo",
        desc:
          "Cardigo used Lattech’s advisory to consolidate vendors, stabilise procurement, and roll out a smoother checkout experience across multiple regions.",
        statLabel: "Cost reduction",
        statValue: "24%",
        statSuffix: "AVG",
        image:
          "https://images.unsplash.com/photo-1556742208-999815fca738?auto=format&fit=crop&w=1400&q=80",
        review: {
          quote:
            "“We finally have a clear roadmap. Execution became faster, simpler, and the team felt supported throughout the rollout.”",
          name: "Imran Q.",
          role: "Procurement Lead at Cardigo",
          avatar:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=70",
        },
      },
    ],
    []
  );

  const AUTOPLAY_MS = 4200;
  const DURATION_MS = 850;

  // ✅ TWO-LAYER crossfade state
  const [front, setFront] = useState(0); // current
  const [back, setBack] = useState(1); // next
  const [phase, setPhase] = useState<"idle" | "toBack">("idle");

  // ✅ Refs to avoid stale state in setInterval
  const frontRef = useRef(0);
  const phaseRef = useRef<"idle" | "toBack">("idle");
  const animatingRef = useRef(false);

  const timerRef = useRef<number | null>(null);
  const doneRef = useRef<number | null>(null);

  const clamp = (n: number) => {
    const len = SLIDES.length;
    return ((n % len) + len) % len;
  };

  // Keep refs in sync
  useEffect(() => {
    frontRef.current = front;
  }, [front]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const transitionTo = (nextIndex: number) => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const ni = clamp(nextIndex);

    // Set next on back layer
    setBack(ni);

    // Force animation to always trigger (Apple-like reliability)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase("toBack");

        if (doneRef.current) window.clearTimeout(doneRef.current);
        doneRef.current = window.setTimeout(() => {
          // After crossfade: promote back to front
          setFront(ni);
          setPhase("idle");
          animatingRef.current = false;
        }, DURATION_MS);
      });
    });
  };

  const next = () => {
    // ✅ Always uses latest slide index
    const cur = frontRef.current;
    transitionTo(cur + 1);
  };

  // ✅ Infinite sequential autoplay: 1→2→3→4→1→2...
  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      // If currently animating, skip this tick (keeps timing stable)
      if (animatingRef.current || phaseRef.current !== "idle") return;
      next();
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (doneRef.current) window.clearTimeout(doneRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep back always set to the NEXT slide when idle
  useEffect(() => {
    if (phase === "idle") setBack(clamp(front + 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [front, phase]);

  const sFront = SLIDES[front];
  const sBack = SLIDES[back];

  return (
    <section className="wrap">
      <div className="top">
        {/* LEFT */}
        <div className="left">
          <div className={`swapText ${phase === "toBack" ? "fadeOut" : "fadeIn"}`}>
            <div className="kicker">FEATURED CASE STUDY</div>

            <div className="brandRow" aria-label="Brand">
              <div className="brandMark" aria-hidden="true">
                <svg width="26" height="18" viewBox="0 0 26 18" fill="none">
                  <path
                    d="M9.2 3.2c-2.3-2.3-6.1-2.3-8.4 0-2.3 2.3-2.3 6.1 0 8.4 2.3 2.3 6.1 2.3 8.4 0"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.8 14.8c2.3 2.3 6.1 2.3 8.4 0 2.3-2.3 2.3-6.1 0-8.4-2.3-2.3-6.1-2.3-8.4 0"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9.2 12.4c2 2 5.6 2 7.6 0 2-2 2-5.6 0-7.6-2-2-5.6-2-7.6 0"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="brandText">{sFront.brand}</div>
            </div>

            <p className="desc">{sFront.desc}</p>

            <button className="cta" type="button">
              <span>View Full Story</span>
              <span className="ctaIcon" aria-hidden="true">
                ↗
              </span>
            </button>

            <div className="statBlock">
              <div className="statLabel">{sFront.statLabel}</div>
              <div className="statRow">
                <div className="statValue">{sFront.statValue}</div>
                <div className="statSuffix">{sFront.statSuffix}</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="right">
          <div className={`imgFrame ${phase === "toBack" ? "xToBack" : ""}`}>
            <img className="layer layerBack" src={sBack.image} alt="Next case study" draggable={false} />
            <img className="layer layerFront" src={sFront.image} alt="Current case study" draggable={false} />
          </div>
        </div>
      </div>

      {/* BOTTOM REVIEW */}
      <div className="review">
        <div className={`reviewInner ${phase === "toBack" ? "revOut" : "revIn"}`}>
          <img className="avatar" src={sFront.review.avatar} alt={sFront.review.name} />
          <div className="reviewText">
            <div className="quote">{sFront.review.quote}</div>
            <div className="who">{sFront.review.name}</div>
            <div className="role">{sFront.review.role}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrap {
          width: 100%;
          background: #2f3e48;
          overflow: hidden;
        }

        .top {
          display: grid;
          grid-template-columns: 1fr 520px;
          gap: 48px;
          padding: 72px 72px 0 72px;
          align-items: start;
        }

        .left {
          padding-top: 14px;
          max-width: 520px;
        }

        .kicker {
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.58);
          margin-bottom: 22px;
        }

        .brandRow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          color: rgba(255, 255, 255, 0.92);
        }

        .brandMark {
          width: 26px;
          height: 18px;
          display: grid;
          place-items: center;
          opacity: 0.95;
        }

        .brandText {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        .desc {
          margin: 0;
          font-size: 12.5px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.62);
          max-width: 420px;
        }

        .cta {
          margin-top: 22px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border: 0;
          outline: none;
          cursor: pointer;
          background: #ffffff;
          color: #ff7a3d;
          font-size: 12px;
          font-weight: 600;
          padding: 12px 18px;
          border-radius: 999px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
        }

        .ctaIcon {
          font-size: 14px;
          line-height: 1;
          transform: translateY(-0.5px);
        }

        .statBlock {
          margin-top: 70px;
          padding-top: 36px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          width: 100%;
          max-width: 520px;
        }

        .statLabel {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.32);
          margin-bottom: 18px;
        }

        .statRow {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .statValue {
          font-size: 56px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.92);
          line-height: 0.95;
        }

        .statSuffix {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 10px;
          letter-spacing: 0.04em;
        }

        /* Apple-like text fade/blur */
        .swapText {
          will-change: opacity, transform, filter;
          transition: opacity ${DURATION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1),
            transform ${DURATION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1),
            filter ${DURATION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .fadeIn {
          opacity: 1;
          transform: translateY(0px);
          filter: blur(0px);
        }
        .fadeOut {
          opacity: 0;
          transform: translateY(6px);
          filter: blur(10px);
        }

        /* RIGHT IMAGE */
        .right {
          display: flex;
          justify-content: flex-end;
        }

        .imgFrame {
          position: relative;
          width: 520px;
          height: 430px;
          border-radius: 52px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.18);
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.26);
          transform: translateZ(0);
        }

        .layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: opacity, transform, filter;
        }

        /* idle */
        .layerBack {
          opacity: 0;
          filter: blur(18px);
          transform: scale(1.06);
        }
        .layerFront {
          opacity: 1;
          filter: blur(0px);
          transform: scale(1.01);
        }

        /* transitioning */
        .imgFrame.xToBack .layerBack {
          opacity: 1;
          filter: blur(0px);
          transform: scale(1.01);
          transition: opacity ${DURATION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1),
            transform ${DURATION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1),
            filter ${DURATION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .imgFrame.xToBack .layerFront {
          opacity: 0;
          filter: blur(18px);
          transform: scale(1.06);
          transition: opacity ${DURATION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1),
            transform ${DURATION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1),
            filter ${DURATION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        /* REVIEW */
        .review {
          background: #394854;
          margin-top: 34px;
          padding: 36px 72px 44px 72px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        }

        .reviewInner {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          will-change: opacity, transform, filter;
          transition: opacity ${DURATION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1),
            transform ${DURATION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1),
            filter ${DURATION_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .revIn {
          opacity: 1;
          transform: translateY(0px);
          filter: blur(0px);
        }
        .revOut {
          opacity: 0;
          transform: translateY(6px);
          filter: blur(10px);
        }

        .avatar {
          width: 54px;
          height: 54px;
          border-radius: 12px;
          object-fit: cover;
          flex: 0 0 auto;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
        }

        .reviewText {
          max-width: 820px;
        }

        .quote {
          font-size: 16px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.78);
          margin-bottom: 18px;
        }

        .who {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.72);
          margin-bottom: 3px;
        }

        .role {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.42);
        }

        @media (max-width: 1100px) {
          .top {
            grid-template-columns: 1fr;
            padding: 56px 22px 0 22px;
            gap: 26px;
          }

          .left {
            max-width: 680px;
          }

          .imgFrame {
            width: 100%;
            height: 360px;
            border-radius: 40px;
          }

          .review {
            padding: 28px 22px 36px 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .swapText,
          .reviewInner,
          .imgFrame.xToBack .layerBack,
          .imgFrame.xToBack .layerFront {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
