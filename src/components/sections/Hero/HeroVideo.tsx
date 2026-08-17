"use client";

/**
 * HERO BACKGROUND VIDEO — full-bleed, cinematic, behind all content.
 *
 * The supplied YouTube video, embedded as a background: autoplay, muted, looped,
 * controls/branding stripped, and cover-cropped (16:9 scaled to fill the section,
 * centred) so it behaves like `object-fit: cover`.
 *
 * Browsers only allow autoplay while muted, so the video starts silent. A small
 * sound toggle (bottom-right) lets visitors turn the audio on — the click is the
 * user gesture browsers require — or mute it again. Audio is driven through the
 * YouTube IFrame API (`enablejsapi=1` + postMessage commands).
 */

import { useRef, useState } from "react";

const VIDEO_ID = "Euiukd4aeL8";

const SRC =
  `https://www.youtube-nocookie.com/embed/${VIDEO_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}` +
  `&controls=0&disablekb=1&fs=0&rel=0&modestbranding=1` +
  `&playsinline=1&iv_load_policy=3&cc_load_policy=0&showinfo=0&enablejsapi=1`;

export function HeroVideo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);

  const command = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  };

  const toggleSound = () => {
    if (muted) {
      command("unMute");
      command("setVolume", [100]);
      command("playVideo");
      setMuted(false);
    } else {
      command("mute");
      setMuted(true);
    }
  };

  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-ink">
        <iframe
          ref={iframeRef}
          title="Imran Baig"
          tabIndex={-1}
          src={SRC}
          allow="autoplay; encrypted-media; picture-in-picture"
          loading="eager"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          // Cover the section while preserving 16:9 (no letterboxing).
          style={{
            width: "100vw",
            height: "56.25vw", // 16:9 of the width
            minWidth: "177.78vh", // 16:9 of the height
            minHeight: "100vh",
            border: 0,
          }}
        />
      </div>

      {/* Sound toggle — the one interactive control over the background video */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Turn on video sound" : "Mute video sound"}
        aria-pressed={!muted}
        className="group absolute bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink/40 text-paper backdrop-blur-md transition-colors duration-300 hover:border-white/40 hover:bg-ink/70 lg:bottom-8 lg:right-8"
      >
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="m22 9-6 6M16 9l6 6" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="M16 9a4 4 0 0 1 0 6" />
            <path d="M19 6.5a8 8 0 0 1 0 11" />
          </svg>
        )}
      </button>
    </>
  );
}
