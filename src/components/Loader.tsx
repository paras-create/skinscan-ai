import { useEffect, useState } from "react";

interface LoaderProps {
  message?: string;
}

function Loader({ message = "Analyzing your skin..." }: LoaderProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <div className="loader-animation">
        <div className="loader-ring">
          <div className="ring-segment" />
          <div className="ring-segment" />
          <div className="ring-segment" />
          <div className="ring-segment" />
        </div>
        <div className="loader-center">
          <svg className="face-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="1" fill="#1A56DB" />
            <circle cx="16" cy="8" r="1" fill="#1A56DB" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#1A56DB" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <p className="loader-message">
        {message}
        <span className="loader-dots">{dots}</span>
      </p>
      <p className="loader-tip">
        Detecting skin conditions and formulating recommendations
      </p>
    </div>
  );
}

export default Loader;
