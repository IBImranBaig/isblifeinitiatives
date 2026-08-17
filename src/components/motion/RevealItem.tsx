"use client";

import { motion, type Variants } from "framer-motion";
import { rise } from "./variants";

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  /** Override the default `rise` with another shared variant (fade, lift). */
  variants?: Variants;
}

/**
 * A single staggered child. Inherits its animation timing from the parent
 * <StaggerGroup> — it has no trigger of its own, by design.
 */
export function RevealItem({ children, className, variants = rise }: RevealItemProps) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
