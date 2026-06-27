import { useEffect, useState } from "react";
import { ConditionResult } from "../utils/skinAnalyzer";

interface SkinResultsProps {
  results: ConditionResult[];
}

function SkinResults({ results }: SkinResultsProps) {
  const [animatedScores, setAnimatedScores] = useState<Record<string, number>>({});

  useEffect(() => {
    // Animate scores from 0 to actual value
    const animationDuration = 1000;
    const startTime = Date.now();
    const targetScores = results.reduce((acc, r) => {
      acc[r.id] = r.score;
      return acc;
    }, {} as Record<string, number>);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Ease-out function
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const newScores: Record<string, number> = {};
      for (const [id, target] of Object.entries(targetScores)) {
        newScores[id] = Math.round(target * easeOut);
      }

      setAnimatedScores(newScores);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [results]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "detected":
        return "status-detected";
      case "mild":
        return "status-mild";
      default:
        return "status-clear";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "detected":
        return "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)";
      case "mild":
        return "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)";
      default:
        return "linear-gradient(90deg, #10B981 0%, #059669 100%)";
    }
  };

  return (
    <div className="skin-results">
      <h2 className="results-title">Skin Analysis Results</h2>
      <p className="results-subtitle">
        Based on facial analysis, here's your skin health assessment:
      </p>

      <div className="results-grid">
        {results.map((result, index) => (
          <div
            key={result.id}
            className={`result-card ${getStatusClass(result.status)}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="result-header">
              <span className="result-icon">{result.icon}</span>
              <h3 className="result-name">{result.name}</h3>
            </div>

            <div className="result-score">
              <span className="score-value">{animatedScores[result.id] || 0}</span>
              <span className="score-label">/ 100</span>
            </div>

            <div className="progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${animatedScores[result.id] || 0}%`,
                  background: getProgressColor(result.status)
                }}
              />
            </div>

            <div className="result-footer">
              <span className={`status-badge ${getStatusClass(result.status)}`}>
                {result.status === "detected" && "Detected"}
                {result.status === "mild" && "Mild"}
                {result.status === "clear" && "Clear"}
              </span>
              <span className="confidence">
                {result.confidence}% confidence
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkinResults;
