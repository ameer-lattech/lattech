"use client";

import React, { useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type Props = {
  videoId?: string; // put your real id later
};

export default function TrustTransparencySection({
  videoId = "dQw4w9WgXcQ", // dummy
}: Props) {
  const uid = useId().replace(/:/g, "");
  const mountId = `yt-player-${uid}`;

  const playerRef = useRef<any>(null);
  const readyRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Load YT iframe api once + create player
  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled) return;
      if (!window.YT || !window.YT.Player) return;

      // Prevent double init
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
          origin:
            typeof window !== "undefined" ? window.location.origin : undefined,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            setIsReady(true);
          },
          onStateChange: (e: any) => {
            // 1 = playing, 2 = paused, 0 = ended
            if (e.data === 1) setIsPlaying(true);
            if (e.data === 2 || e.data === 0) setIsPlaying(false);
          },
        },
      });
    };

    const loadScript = () => {
      // If already loaded
      if (window.YT && window.YT.Player) {
        createPlayer();
        return;
      }

      // If script tag already exists
      const existing = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      ) as HTMLScriptElement | null;

      if (!existing) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }

      // Hook ready
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        createPlayer();
      };

      // Fallback: poll (sometimes ready callback doesn't fire in fast navs)
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
    // 1 playing -> pause, else play
    if (state === 1) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1280px] px-[72px] py-[88px]">
        <div className="grid grid-cols-12 items-center gap-x-[90px]">
          {/* LEFT TEXT */}
          <div className="col-span-12 md:col-span-5">
            <h2 className="text-[54px] font-normal leading-[1.05] text-[#1F1F1F]">
              Building{" "}
              <span className="font-semibold text-[#43B02A]">Trust</span> with
              <span className="block">Transparency</span>
            </h2>

            <p className="mt-[22px] max-w-[520px] text-[16px] leading-[1.95] text-[#6F6F6F]">
              Outsourcing to another company, however reputable it is, always
              comes with a risk. The best we can do as a vendor to lower that
              risk is to be completely transparent about who we are, what we do,
              and where we have succeeded. At ScienceSoft, we bet on facts rather
              than promises — that’s our first step to building trust.
            </p>
          </div>

          {/* RIGHT SQUARE VIDEO */}
          <div className="col-span-12 md:col-span-7 flex justify-end">
            <div className="relative h-[440px] w-[440px] overflow-hidden rounded-[88px] bg-[#0B0B0B]">
              {/* Player mount */}
              <div className="absolute inset-0">
                <div id={mountId} className="h-full w-full" />
              </div>

              {/* Click overlay (always clickable) */}
              <button
                type="button"
                aria-label={isPlaying ? "Pause video" : "Play video"}
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Single centered YouTube icon */}
                <div
                  className={[
                    "grid place-items-center rounded-[16px] transition-all duration-200",
                    "h-[78px] w-[110px]",
                    // show icon only when not playing OR while not ready
                    isPlaying ? "opacity-0 scale-95" : "opacity-100 scale-100",
                    !isReady ? "opacity-100" : "",
                  ].join(" ")}
                  style={{
                    background: "#E11D48", // pinkish-red like ref
                  }}
                >
                  {/* triangle */}
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

                {/* Invisible layer to allow pause by clicking while playing */}
                <span className="absolute inset-0" />
              </button>

              {/* Optional: subtle dark wash like your ref (doesn't add shapes) */}
              {!isPlaying && (
                <div className="pointer-events-none absolute inset-0 bg-black/10" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
