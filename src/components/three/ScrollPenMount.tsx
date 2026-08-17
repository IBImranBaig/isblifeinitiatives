"use client";

/**
 * Client-only mount for the scroll pen. Renders on all screen sizes (it's a
 * lightweight image + CSS transforms now), but skips for reduced-motion users.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ScrollPen = dynamic(() => import("./ScrollPen").then((m) => m.ScrollPen), { ssr: false });

export function ScrollPenMount() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const decide = () => {
      setShow(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    decide();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, []);

  if (!show) return null;
  return <ScrollPen />;
}
