"use client";

import React, { useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type Props = {
  videoId?: string;
};

export default function TrustTransparencySection({
  videoId = "dQw4w9WgXcQ",
}: Props) {
  const uid = useId().replace(/:/g, "");
  const mountId = `yt-player-${uid}`;

  const playerRef = useRef<any>(null);
  const readyRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled) return;
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player(mountId, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          fs: 0,
          iv_load_policy: 3,
          disablekb: 1,
          playsinline: 1,
          origin: typeof window !== "undefined" ? window.location.origin : undefined,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            setIsReady(true);
          },
          onStateChange: (e: any) => {
            if (e.data === 1) setIsPlaying(true);
            if (e.data === 2 || e.data === 0) setIsPlaying(false);
          },
        },
      });
    };

    const loadScript = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
        return;
      }

      const existing = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      ) as HTMLScriptElement | null;

      if (!existing) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }

      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        createPlayer();
      };

      const t = window.setInterval(() => {
        if (window.YT && window.YT.Player) {
          window.clearInterval(t);
          createPlayer();
        }
      }, 150);

      return () => window.clearInterval(t);
    };

    const cleanupPoll = loadScript();

    return () => {
      cancelled = true;
      cleanupPoll?.();
      try {
        playerRef.current?.destroy?.();
      } catch {}
      playerRef.current = null;
    };
  }, [mountId, videoId]);

  const togglePlay = () => {
    if (!readyRef.current || !playerRef.current) return;

    const state = playerRef.current.getPlayerState?.();
    if (state === 1) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  return (
    <section className="w-full bg-white">
      {/* ✅ responsive padding */}
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-[72px] md:py-[88px]">
        {/* ✅ stack on mobile, grid on desktop */}
        <div className="grid grid-cols-12 items-center gap-y-10 md:gap-x-[90px] md:gap-y-0">
          {/* LEFT TEXT */}
          <div className="col-span-12 md:col-span-5">
            <h2 className="text-[38px] font-normal leading-[1.08] text-[#595A5A] md:text-[48px] md:leading-[1.05]">
              Building{" "}
              <span className="font-semibold text-[#43B02A]">Trust</span> with
              <span className="block">Transparency</span>
            </h2>

            <p className="mt-5 max-w-[520px] text-[14px] leading-[1.9] text-[#525252] md:mt-[22px] md:text-[20px] md:leading-[1.95]">
              Outsourcing to another company, however reputable it is, always
              comes with a risk. The best we can do as a vendor to lower that
              risk is to be completely transparent about who we are, what we do,
              and where we have succeeded. At ScienceSoft, we bet on facts rather
              than promises — that’s our first step to building trust.
            </p>
          </div>

          {/* RIGHT VIDEO */}
          <div className="col-span-12 md:col-span-7 flex justify-center md:justify-end">
            {/* ✅ mobile: fluid square, desktop: fixed 440x440 */}
            <div className="relative w-full max-w-[440px] aspect-square md:h-[440px] md:w-[440px] overflow-hidden rounded-[44px] md:rounded-[88px] bg-[#0B0B0B]">
              {/* Player mount */}
              <div className="absolute inset-0">
                <div id={mountId} className="h-full w-full" />
              </div>

              {/* Click overlay */}
              <button
                type="button"
                aria-label={isPlaying ? "Pause video" : "Play video"}
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className={[
                    "grid place-items-center rounded-[16px] transition-all duration-200",
                    "h-[68px] w-[100px] md:h-[78px] md:w-[110px]",
                    isPlaying ? "opacity-0 scale-95" : "opacity-100 scale-100",
                    !isReady ? "opacity-100" : "",
                  ].join(" ")}
                  style={{ background: "#E11D48" }}
                >
                  <div
                    className="ml-[6px]"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "14px solid transparent",
                      borderBottom: "14px solid transparent",
                      borderLeft: "22px solid white",
                    }}
                  />
                </div>

                <span className="absolute inset-0" />
              </button>

              {!isPlaying && <div className="pointer-events-none absolute inset-0 bg-black/10" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
