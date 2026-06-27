import { useState, useEffect, useRef, useCallback } from "react";
import * as faceApi from "@vladmandic/face-api";
import { ConditionResult, analyzeSkin } from "../utils/skinAnalyzer";

export interface FaceDetectionResult {
  detection: faceApi.FaceDetection;
  landmarks: faceApi.FaceLandmarks68;
}

interface UseFaceAnalysisResult {
  modelsLoaded: boolean;
  isLoading: boolean;
  faceDetected: boolean;
  detectionResult: FaceDetectionResult | null;
  skinResults: ConditionResult[] | null;
  error: string | null;
  startDetection: (video: HTMLVideoElement) => void;
  stopDetection: () => void;
  analyzeCurrentFace: () => void;
}

const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model";

export function useFaceAnalysis(): UseFaceAnalysisResult {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [faceDetected, setFaceDetected] = useState(false);
  const [detectionResult, setDetectionResult] = useState<FaceDetectionResult | null>(null);
  const [skinResults, setSkinResults] = useState<ConditionResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasStartedDetectionRef = useRef(false);

  // Load models on mount
  useEffect(() => {
    async function loadModels() {
      try {
        setIsLoading(true);
        setError(null);

        await Promise.all([
          faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ]);

        setModelsLoaded(true);
      } catch (err) {
        console.error("Error loading models:", err);
        setError("Failed to load AI models. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    }

    loadModels();
  }, []);

  const detectFace = useCallback(async () => {
    if (!videoRef.current || !modelsLoaded) return;

    const video = videoRef.current;

    if (video.paused || video.ended || !video.videoWidth) {
      animationRef.current = requestAnimationFrame(detectFace);
      return;
    }

    try {
      const detections = await faceApi
        .detectAllFaces(video, new faceApi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length > 0) {
        const detection = detections[0];
        setFaceDetected(true);
        setDetectionResult({
          detection: detection.detection,
          landmarks: detection.landmarks
        });
        startTimeRef.current = null; // Reset tip timer
        setError(null);
      } else {
        setFaceDetected(false);
        setDetectionResult(null);

        // Show tip after 5 seconds of no face detected
        if (startTimeRef.current === null) {
          startTimeRef.current = Date.now();
        } else if (Date.now() - startTimeRef.current > 5000) {
          setError("Make sure your face is well-lit and centered in the frame");
        }
      }
    } catch (err) {
      console.error("Detection error:", err);
    }

    animationRef.current = requestAnimationFrame(detectFace);
  }, [modelsLoaded]);

  const startDetection = useCallback((video: HTMLVideoElement) => {
    videoRef.current = video;
    startTimeRef.current = Date.now();
    hasStartedDetectionRef.current = true;

    if (modelsLoaded) {
      detectFace();
    }
  }, [detectFace]);

  useEffect(() => {
    if (modelsLoaded && videoRef.current && hasStartedDetectionRef.current) {
      detectFace();
    }
  }, [modelsLoaded, detectFace]);

  const stopDetection = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setFaceDetected(false);
    setDetectionResult(null);
    hasStartedDetectionRef.current = false;
  }, []);

  const analyzeCurrentFace = useCallback(() => {
    if (detectionResult) {
      const results = analyzeSkin(detectionResult.detection, detectionResult.landmarks);
      setSkinResults(results);
    }
  }, [detectionResult]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    modelsLoaded,
    isLoading,
    faceDetected,
    detectionResult,
    skinResults,
    error,
    startDetection,
    stopDetection,
    analyzeCurrentFace
  };
}
