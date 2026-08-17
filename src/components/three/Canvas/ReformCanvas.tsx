"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ReformParticles } from "@/components/three/scenes/Reform/ReformParticles";
import { CAM_FOV, CAM_Z, type Quality } from "@/components/three/scenes/Reform/useReformData";

interface Props {
  /** In view? Drives the convergence + the render loop (paused offscreen). */
  active: boolean;
}

/**
 * The Invitation's reform stage — scattered minds reassemble into a word.
 * A second, lightweight WebGL context: transparent (the void gradient is the
 * no-WebGL fallback), DPR-clamped, quality-tiered. The render loop runs ONLY
 * while the section is on screen (`active`); reduced motion freezes it to the
 * formed word in a single demand frame.
 */
export default function ReformCanvas({ active }: Props) {
  const [quality, setQuality] = useState<Quality>("high");
  const [frozen, setFrozen] = useState(false);
  // Latches true the first time the section is seen — the morph is a one-shot.
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    setQuality(isSmall || lowCores ? "low" : "high");
    setFrozen(reduced);
  }, []);

  useEffect(() => {
    if (active) setPlayed(true);
  }, [active]);

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.6]}
      frameloop={frozen ? "demand" : active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, CAM_Z], fov: CAM_FOV }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <ReformParticles quality={quality} play={played} frozen={frozen} />
    </Canvas>
  );
}
