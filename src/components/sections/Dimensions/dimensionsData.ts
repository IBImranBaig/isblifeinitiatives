export type DimensionId = "mind" | "body" | "soul" | "career" | "relationships" | "parenting";

export interface Dimension {
  id: DimensionId;
  /** "01" … "06" */
  n: string;
  /** "Mind" */
  title: string;
  /** Short statement (the dimension's promise). */
  statement: string;
  /** Body copy paragraph. */
  body: string;
}

/**
 * The six dimensions. `body` copy is the existing site paragraph text; `Career`
 * uses the supplied line. `statement` is the short promise per dimension.
 */
export const DIMENSIONS: Dimension[] = [
  {
    id: "mind",
    n: "01",
    title: "Mind",
    statement: "Reprogram limiting beliefs",
    body: "Your handwriting encodes how you think. We trace those strokes into the neural patterns beneath them — surfacing the subconscious blocks and beliefs that quietly shape every decision.",
  },
  {
    id: "body",
    n: "02",
    title: "Body",
    statement: "Detect health markers early",
    body: "The hand reveals the body. Pressure, rhythm and flow expose hidden stress, energy and early health markers — often long before they surface anywhere else.",
  },
  {
    id: "soul",
    n: "03",
    title: "Soul",
    statement: "Align with your authentic self",
    body: "Beneath personality lies something quieter. Handwriting reflects your inner alignment — the sense of purpose and stillness that guides who you are becoming.",
  },
  {
    id: "career",
    n: "04",
    title: "Career",
    statement: "Sharpen leadership & decisions",
    body: "Elevate performance, decision speed, and financial mindset.",
  },
  {
    id: "relationships",
    n: "05",
    title: "Relationships",
    statement: "Deepen real connection",
    body: "How you bond is written. Spacing, connection and rhythm reveal how you communicate, where you withhold, and the hidden fears shaping your closest relationships.",
  },
  {
    id: "parenting",
    n: "06",
    title: "Parenting",
    statement: "Understand your child within",
    body: "The patterns you carry, you pass on. Handwriting opens a window into your child's emotional world — and the legacy moving quietly between generations.",
  },
];
