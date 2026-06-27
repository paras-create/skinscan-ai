import { useEffect, useRef } from "react";
import { useCamera } from "../hooks/useCamera";
import FaceOverlay from "./FaceOverlay";
import { FaceDetectionResult } from "../hooks/useFaceAnalysis";

interface CameraProps {
  onVideoReady: (video: HTMLVideoElement) => void;
  faceDetected: boolean;
  detectionResult: FaceDetectionResult | null;
  detectionError: string | null;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

function Camera({
  onVideoReady,
  faceDetected,
  detectionResult,
  detectionError,
  onAnalyze,
  isAnalyzing
}: CameraProps) {
  const { videoRef, isStreaming, error, startCamera, stopCamera } = useCamera();
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      startCamera();
    }
  }, [startCamera]);

  useEffect(() => {
    if (isStreaming && videoRef.current) {
      onVideoReady(videoRef.current);
    }
  }, [isStreaming, videoRef, onVideoReady]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const cameraError = error || detectionError;

  return (
    <div className="camera-container">
      <div className="camera-wrapper">
        <video
          ref={videoRef as React.RefObject<HTMLVideoElement>}
          className="camera-video"
          autoPlay
          playsInline
          muted
        />

        {detectionResult && isStreaming && (
          <FaceOverlay detectionResult={detectionResult} />
        )}

        {!isStreaming && cameraError ? (
          <div className="camera-error">
            <div className="error-icon">!</div>
            <p>{cameraError}</p>
            <button className="retry-btn" onClick={startCamera}>
              Try Again
            </button>
          </div>
        ) : (
          !isStreaming && (
          <div className="camera-loading">
            <div className="loading-spinner" />
            <p>Starting camera...</p>
          </div>
          )
        )}
      </div>

      {!isAnalyzing && isStreaming && (
        <div className="camera-controls">
          {!faceDetected && !cameraError && (
            <p className="detecting-message">Detecting face...</p>
          )}
          {faceDetected && (
            <button className="analyze-btn" onClick={onAnalyze}>
              Analyze My Skin
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Camera;
