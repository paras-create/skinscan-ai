import * as faceApi from "@vladmandic/face-api";
import { conditions, getStatus, ConditionStatus } from "../data/conditions";

export interface ConditionResult {
  id: string;
  name: string;
  icon: string;
  score: number;
  status: ConditionStatus;
  confidence: number;
}

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function generateRegionScore(
  landmarks: faceApi.FaceLandmarks68,
  regionStart: number,
  regionEnd: number,
  seed: number
): number {
  const random = seededRandom(seed);

  // Calculate variance in landmark positions to simulate skin analysis
  let totalVariance = 0;
  const points = landmarks.positions.slice(regionStart, regionEnd + 1);

  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    totalVariance += Math.sqrt(dx * dx + dy * dy);
  }

  // Normalize and add seeded randomness for consistent results
  const normalizedVariance = totalVariance / (points.length * 100);
  const baseScore = random() * 100;
  const varianceFactor = (normalizedVariance % 1) * 30;

  return Math.min(100, Math.max(0, (baseScore + varianceFactor) / 1.3));
}

export function analyzeSkin(detection: faceApi.FaceDetection, landmarks: faceApi.FaceLandmarks68): ConditionResult[] {
  // Create a stable seed from face bounding box position
  const box = detection.box;
  const seed = Math.floor(box.x * 100 + box.y * 10 + box.width);

  const results: ConditionResult[] = [];

  for (const condition of conditions) {
    // Generate score based on landmark regions
    let totalScore = 0;
    let regionCount = 0;

    for (const region of condition.landmarkRegions) {
      const regionSeed = seed + region.start * 1000 + condition.threshold;
      const regionScore = generateRegionScore(landmarks, region.start, region.end, regionSeed);
      totalScore += regionScore;
      regionCount++;
    }

    const avgScore = totalScore / regionCount;
    const score = Math.round(avgScore);
    const status = getStatus(score, condition.threshold, condition.mildThreshold);

    // Calculate confidence (inverse of variance, simulated)
    const confidence = Math.round(75 + (seededRandom(seed + condition.id.length)() * 20));

    results.push({
      id: condition.id,
      name: condition.name,
      icon: condition.icon,
      score,
      status,
      confidence: Math.min(100, confidence)
    });
  }

  return results;
}

export function getDetectedConditions(results: ConditionResult[]): string[] {
  return results
    .filter(r => r.status === "detected" || r.status === "mild")
    .map(r => r.id);
}
