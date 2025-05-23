import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

const codingPhrases = [
  'Compiling awesomeness...',
  'Injecting semicolons...',
  'Brewing fresh code ',
  'Splicing the array of destiny...',
  'Rendering pixels in real-time...',
  'Debugging the matrix...',
  'Optimizing with caffeine...',
  'Launching into hyperspace ',
  'Refactoring the universe...',
  'Aligning flexbox stars...',
];

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const [phrase, setPhrase] = useState(codingPhrases[0]);

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
      setLoading(true);
      setPhrase(codingPhrases[Math.floor(Math.random() * codingPhrases.length)]); // pick random phrase

      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
        setLoading(false);
      }, 2000); // match CSS animation duration

      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader">{phrase}</div>
        </div>
      )}

      <div
        key={displayLocation.pathname}
        className={`page-transition ${transitionStage}`}
      >
        {children}
      </div>
    </>
  );
};

export default PageTransition;
