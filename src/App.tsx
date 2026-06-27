import { useState, useCallback, useEffect } from "react";
import { useFaceAnalysis } from "./hooks/useFaceAnalysis";
import Camera from "./components/Camera";
import Loader from "./components/Loader";
import SkinResults from "./components/SkinResults";
import ProductCards from "./components/ProductCards";
import { getRecommendations } from "./utils/recommender";
import { getDetectedConditions, ConditionResult } from "./utils/skinAnalyzer";
import { Scan, Sparkles, RefreshCw, CameraIcon, ShieldCheck, Zap, ArrowRight, BadgeCheck } from "lucide-react";

type AppStep = "landing" | "camera" | "analyzing" | "results";

function App() {
  const [step, setStep] = useState<AppStep>("landing");
  const {
    modelsLoaded,
    isLoading: modelsLoading,
    faceDetected,
    detectionResult,
    skinResults,
    error: detectionError,
    startDetection,
    stopDetection,
    analyzeCurrentFace
  } = useFaceAnalysis();

  const [finalResults, setFinalResults] = useState<ConditionResult[] | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<ReturnType<typeof getRecommendations>>([]);

  const handleStartCamera = useCallback(() => {
    setStep("camera");
  }, []);

  const handleVideoReady = useCallback((video: HTMLVideoElement) => {
    if (modelsLoaded) {
      startDetection(video);
    }
  }, [modelsLoaded, startDetection]);

  const handleAnalyze = useCallback(() => {
    setStep("analyzing");
    stopDetection();

    // Simulate 3-second analysis
    setTimeout(() => {
      analyzeCurrentFace();
    }, 100);
  }, [stopDetection, analyzeCurrentFace]);

  // Watch for skin results to be populated
  useEffect(() => {
    if (skinResults && step === "analyzing") {
      const detectedConditions = getDetectedConditions(skinResults);
      const products = getRecommendations(detectedConditions);

      setFinalResults(skinResults);
      setRecommendedProducts(products);
      setStep("results");
    }
  }, [skinResults, step]);

  const handleAnalyzeAgain = useCallback(() => {
    setFinalResults(null);
    setRecommendedProducts([]);
    setStep("landing");
    stopDetection();
  }, [stopDetection]);

  const handleStartOver = useCallback(() => {
    setFinalResults(null);
    setRecommendedProducts([]);
    stopDetection();
    setStep("landing");
  }, [stopDetection]);

  // Landing Screen
  if (step === "landing") {
    return (
      <div className="app-container landing-screen">
        <main className="landing-shell">
          <section className="landing-content">
            <div className="landing-header">
              <div className="eyebrow-row">
                <span className="eyebrow-pill">
                  <BadgeCheck size={14} />
                  Privacy-first analysis
                </span>
              </div>
              <div className="logo-container">
                <Scan className="logo-icon" />
                <Sparkles className="logo-sparkle" />
              </div>
              <h1 className="app-title">SkinScan AI</h1>
              <p className="app-tagline">
                A polished, camera-based skin check that turns a quick scan into clear guidance and
                product recommendations.
              </p>
            </div>

            <div className="trust-row">
              <div className="trust-item">
                <ShieldCheck size={16} />
                <span>Runs locally in your browser</span>
              </div>
              <div className="trust-item">
                <Zap size={16} />
                <span>Instant model loading and face detection</span>
              </div>
            </div>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <Scan size={16} />
                </div>
                <span>Real-time facial analysis</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <BadgeCheck size={16} />
                </div>
                <span>Clear detection results with confidence scores</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Sparkles size={16} />
                </div>
                <span>Personalized product recommendations</span>
              </div>
            </div>

            <div className="cta-row">
              <button className="start-btn" onClick={handleStartCamera}>
                <CameraIcon size={20} />
                Start Camera
                <ArrowRight size={18} />
              </button>
              <p className="privacy-note">
                Your camera feed is processed locally and never stored or shared.
              </p>
            </div>
          </section>

          <aside className="landing-preview" aria-label="Product preview and analysis summary">
            <div className="preview-card">
              <div className="preview-card-header">
                <span className="preview-status-dot" />
                Live scan preview
              </div>
              <div className="preview-visual">
                <div className="preview-ring" />
                <div className="preview-face-card">
                  <div className="preview-face-title">Structured assessment</div>
                  <div className="preview-metrics">
                    <div className="preview-metric">
                      <span className="preview-metric-value">3</span>
                      <span className="preview-metric-label">analysis signals</span>
                    </div>
                    <div className="preview-metric">
                      <span className="preview-metric-value">94%</span>
                      <span className="preview-metric-label">model confidence</span>
                    </div>
                  </div>
                  <div className="preview-separator" />
                  <div className="preview-note">
                    Designed for a clean, professional experience from scan to recommendation.
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </main>

        <div className="landing-decoration">
          <div className="decoration-circle circle-1" />
          <div className="decoration-circle circle-2" />
          <div className="decoration-circle circle-3" />
        </div>
      </div>
    );
  }

  // Analysis Loading Screen
  if (step === "analyzing") {
    return (
      <div className="app-container analyzing-screen">
        <Loader message="Analyzing your skin" />
      </div>
    );
  }

  // Results Screen
  if (step === "results" && finalResults) {
    const detectedConditions = getDetectedConditions(finalResults);

    return (
      <div className="app-container results-screen">
        <header className="results-header">
          <div className="header-content">
            <div className="logo-small">
              <Scan size={24} />
            </div>
            <h1>SkinScan AI</h1>
          </div>
          <button className="new-scan-btn" onClick={handleStartOver}>
            <RefreshCw size={16} />
            New Scan
          </button>
        </header>

        <main className="results-main">
          <div className="results-summary">
            <div className="summary-icon">
              <Sparkles size={32} />
            </div>
            <div className="summary-text">
              <h2>Assessment complete</h2>
              <p>
                {detectedConditions.length > 0
                  ? `We detected ${detectedConditions.length} condition${detectedConditions.length > 1 ? "s" : ""} that may need attention. Review the details below and compare the recommended products.`
                  : "Your skin looks healthy. Review the results and explore products that help maintain your current routine."}
              </p>
            </div>
          </div>

          <SkinResults results={finalResults} />

          <ProductCards
            products={recommendedProducts}
            detectedConditions={detectedConditions}
          />

          <div className="action-buttons">
            <button className="analyze-again-btn" onClick={handleAnalyzeAgain}>
              <RefreshCw size={18} />
              Analyze Again
            </button>
          </div>
        </main>

        <footer className="results-footer">
          <p>
            Disclaimer: This analysis is for informational purposes only and should not replace
            professional dermatological advice.
          </p>
        </footer>
      </div>
    );
  }

  // Camera Screen (default for step === "camera")
  return (
    <div className="app-container camera-screen">
      <header className="camera-header">
        <div className="header-content">
          <div className="logo-small">
            <Scan size={24} />
          </div>
          <h1>SkinScan AI</h1>
        </div>
        <button className="cancel-btn" onClick={handleStartOver}>
          Cancel
        </button>
      </header>

      <main className="camera-main">
        {modelsLoading ? (
          <div className="models-loading">
            <Loader message="Loading AI models" />
          </div>
        ) : (
          <Camera
            onVideoReady={handleVideoReady}
            faceDetected={faceDetected}
            detectionResult={detectionResult}
            detectionError={detectionError}
            onAnalyze={handleAnalyze}
            isAnalyzing={false}
          />
        )}
      </main>

      <footer className="camera-footer">
        <p>Position your face in the center of the frame</p>
        <p className="footer-subtitle">Good lighting improves accuracy</p>
      </footer>
    </div>
  );
}

export default App;
