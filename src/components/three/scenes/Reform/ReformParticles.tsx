"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { sampleWordTargets, type WordTargets } from "@/lib/three/wordTargets";
import { createReformMaterial } from "./reformMaterial";
import { computeView, useReformData, type Quality } from "./useReformData";

/** The word the scattered minds reassemble into — the site's closing beat. */
const WORD = "you";

const REVEAL_S = 0.8; // dust fades in when the field wakes
const HOLD_S = 0.35; // a breath of scattered drift before it gathers
const MORPH_S = 2.8; // dust → word convergence

interface Props {
  quality: Quality;
  /** Has the section been seen? Triggers the one-shot convergence. */
  play: boolean;
  /** Reduced motion → render the formed word at once, no animation. */
  frozen?: boolean;
}

export function ReformParticles({ quality, play, frozen = false }: Props) {
  const { gl, invalidate } = useThree();
  const [word, setWord] = useState<WordTargets | null>(null);
  const view = useMemo(() => computeView(), []);
  const data = useReformData(quality, view, word);
  const material = useMemo(() => createReformMaterial(), []);

  // Progress is accumulated from RENDERED-frame delta, not absolute clock time,
  // so the one-shot survives the offscreen render-loop pause (no stall, no jump)
  // and resumes smoothly if the visitor scrolls away mid-convergence and back.
  const prog = useRef(0);
  const localT = useRef(0);

  // Sample the word once mounted (off the main paint).
  useEffect(() => {
    let alive = true;
    sampleWordTargets(WORD, quality === "high" ? 4800 : 2400).then((r) => {
      if (alive && r) setWord(r);
    });
    return () => {
      alive = false;
    };
  }, [quality]);

  useEffect(() => {
    material.uniforms.uPixelRatio.value = gl.getPixelRatio();
    // Smaller points on the mobile/low tier — a denser word stays a whisper.
    material.uniforms.uSize.value = quality === "high" ? 16 : 12;
  }, [gl, material, quality]);

  useEffect(() => () => material.dispose(), [material]);

  // Reduced motion: pin to the formed word and render the single demand frame.
  useEffect(() => {
    if (!frozen) return;
    material.uniforms.uReveal.value = 1;
    material.uniforms.uMorph.value = 1;
    material.uniforms.uBreath.value = 1;
    invalidate();
  }, [frozen, material, invalidate]);

  useFrame((_, delta) => {
    if (frozen) return; // pinned in the effect above
    const u = material.uniforms;
    const d = Math.min(delta, 0.05); // clamp tab-switch / resume spikes
    localT.current += d;
    const t = localT.current;
    u.uTime.value = t;
    u.uBreath.value = 0.9 + 0.1 * (0.5 + 0.5 * Math.sin(t * 0.5));

    if (!play) return;
    prog.current += d;
    const e = prog.current;
    u.uReveal.value = Math.min(1, e / REVEAL_S);
    u.uMorph.value = Math.min(1, Math.max(0, (e - HOLD_S) / MORPH_S));
  });

  return (
    // Re-key when the word resolves so buffers rebuild cleanly.
    <points key={word ? "word" : "band"} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.start, 3]} count={data.count} />
        <bufferAttribute attach="attributes-aEnd" args={[data.end, 3]} count={data.count} />
        <bufferAttribute attach="attributes-aSeed" args={[data.seed, 1]} count={data.count} />
        <bufferAttribute attach="attributes-aScale" args={[data.scale, 1]} count={data.count} />
        <bufferAttribute attach="attributes-aDelay" args={[data.delay, 1]} count={data.count} />
      </bufferGeometry>
    </points>
  );
}
