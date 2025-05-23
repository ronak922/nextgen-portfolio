import React, { useState, useEffect } from "react";
import "./CookieBox.css";

const CookieBox = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookieAccepted")) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-box" role="alert" aria-live="polite">
      <span className="cookie-emoji" aria-hidden="true">🍪</span>
      <span className="cookie-message">
        This website uses cookies to enhance your experience.{" "}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">Learn more</a>
      </span>
      <button onClick={handleAccept} className="cookie-btn">
        <span role="img" aria-label="check">✔️</span> Got it!
      </button>
    </div>
  );
};

export default CookieBox;