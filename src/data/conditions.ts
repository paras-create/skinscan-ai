export interface SkinCondition {
  id: string;
  name: string;
  icon: string;
  description: string;
  threshold: number;
  mildThreshold: number;
  landmarkRegions: {
    start: number;
    end: number;
  }[];
}

export const conditions: SkinCondition[] = [
  {
    id: "dark_circles",
    name: "Dark Circles",
    icon: "👁️",
    description: "Under-eye darkness indicating fatigue or genetics",
    threshold: 60,
    mildThreshold: 40,
    landmarkRegions: [
      { start: 36, end: 41 }, // Left eye
      { start: 42, end: 47 }  // Right eye
    ]
  },
  {
    id: "acne",
    name: "Acne",
    icon: "🔴",
    description: "Pimples and blemishes on the skin surface",
    threshold: 65,
    mildThreshold: 45,
    landmarkRegions: [
      { start: 0, end: 16 },   // Jawline and cheeks
      { start: 17, end: 21 },  // Left eyebrow area
      { start: 22, end: 26 }   // Right eyebrow area
    ]
  },
  {
    id: "oily_skin",
    name: "Oily Skin",
    icon: "💧",
    description: "Excess sebum production in T-zone area",
    threshold: 55,
    mildThreshold: 35,
    landmarkRegions: [
      { start: 27, end: 35 } // Nose and T-zone
    ]
  },
  {
    id: "pigmentation",
    name: "Pigmentation",
    icon: "🟤",
    description: "Dark spots and uneven skin tone",
    threshold: 50,
    mildThreshold: 30,
    landmarkRegions: [
      { start: 0, end: 8 },    // Left cheek
      { start: 8, end: 16 }    // Right cheek
    ]
  },
  {
    id: "wrinkles",
    name: "Fine Lines & Wrinkles",
    icon: "〰️",
    description: "Lines indicating aging or sun damage",
    threshold: 45,
    mildThreshold: 25,
    landmarkRegions: [
      { start: 17, end: 26 } // Forehead region
    ]
  }
];

export type ConditionStatus = "detected" | "mild" | "clear";

export function getStatus(score: number, threshold: number, mildThreshold: number): ConditionStatus {
  if (score >= threshold) return "detected";
  if (score >= mildThreshold) return "mild";
  return "clear";
}
