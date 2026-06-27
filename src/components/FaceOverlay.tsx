import { useRef, useEffect } from "react";
import { FaceDetectionResult } from "../hooks/useFaceAnalysis";

interface FaceOverlayProps {
  detectionResult: FaceDetectionResult;
}

function FaceOverlay({ detectionResult }: FaceOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match video
    const video = canvas.previousElementSibling as HTMLVideoElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { detection, landmarks } = detectionResult;
    const box = detection.box;

    // Draw bounding box
    ctx.strokeStyle = "#1A56DB";
    ctx.lineWidth = 3;
    ctx.strokeRect(box.x, box.y, box.width, box.height);

    // Draw corner accents
    const cornerSize = 20;
    ctx.strokeStyle = "#1A56DB";
    ctx.lineWidth = 4;

    // Top-left corner
    ctx.beginPath();
    ctx.moveTo(box.x, box.y + cornerSize);
    ctx.lineTo(box.x, box.y);
    ctx.lineTo(box.x + cornerSize, box.y);
    ctx.stroke();

    // Top-right corner
    ctx.beginPath();
    ctx.moveTo(box.x + box.width - cornerSize, box.y);
    ctx.lineTo(box.x + box.width, box.y);
    ctx.lineTo(box.x + box.width, box.y + cornerSize);
    ctx.stroke();

    // Bottom-left corner
    ctx.beginPath();
    ctx.moveTo(box.x, box.y + box.height - cornerSize);
    ctx.lineTo(box.x, box.y + box.height);
    ctx.lineTo(box.x + cornerSize, box.y + box.height);
    ctx.stroke();

    // Bottom-right corner
    ctx.beginPath();
    ctx.moveTo(box.x + box.width - cornerSize, box.y + box.height);
    ctx.lineTo(box.x + box.width, box.y + box.height);
    ctx.lineTo(box.x + box.width, box.y + box.height - cornerSize);
    ctx.stroke();

    // Draw landmarks as dots
    const landmarkPoints = landmarks.positions;
    ctx.fillStyle = "#1A56DB";

    for (const point of landmarkPoints) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw specific region highlights (eye regions)
    ctx.fillStyle = "rgba(26, 86, 219, 0.3)";
    ctx.strokeStyle = "rgba(26, 86, 219, 0.6)";
    ctx.lineWidth = 1;

    // Left eye region
    const leftEyePoints = landmarks.getLeftEye();
    ctx.beginPath();
    ctx.moveTo(leftEyePoints[0].x, leftEyePoints[0].y);
    for (let i = 1; i < leftEyePoints.length; i++) {
      ctx.lineTo(leftEyePoints[i].x, leftEyePoints[i].y);
    }
    ctx.closePath();
    ctx.stroke();

    // Right eye region
    const rightEyePoints = landmarks.getRightEye();
    ctx.beginPath();
    ctx.moveTo(rightEyePoints[0].x, rightEyePoints[0].y);
    for (let i = 1; i < rightEyePoints.length; i++) {
      ctx.lineTo(rightEyePoints[i].x, rightEyePoints[i].y);
    }
    ctx.closePath();
    ctx.stroke();

  }, [detectionResult]);

  return (
    <canvas
      ref={canvasRef}
      className="face-overlay"
    />
  );
}

export default FaceOverlay;
