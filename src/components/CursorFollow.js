  import React, { useEffect, useRef, useState } from 'react';

  const CursorFollower = () => {
    const followerRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });
    const [isBig, setIsBig] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    const lerp = (start, end, amt) => start + (end - start) * amt;

    useEffect(() => {
      // Detect touch device
      const checkTouch = () => {
        setIsTouch(
          'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
        );
      };
      checkTouch();
      window.addEventListener('resize', checkTouch);
      return () => window.removeEventListener('resize', checkTouch);
    }, []);

    useEffect(() => {
      if (isTouch) return; // Don't run on touch devices

      const handleMouseMove = (e) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
      };

      const handleMouseOver = (e) => {
        const tagName = e.target.tagName.toLowerCase();
        if (['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'button'].includes(tagName)) {
          setIsBig(true);
        }
      };

      const handleMouseOut = (e) => {
        const tagName = e.target.tagName.toLowerCase();
        if (['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'button'].includes(tagName)) {
          setIsBig(false);
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('mouseout', handleMouseOut);

      const animate = () => {
        pos.current.x = lerp(pos.current.x, mousePos.current.x, 0.05);
        pos.current.y = lerp(pos.current.y, mousePos.current.y, 0.05);

        if (followerRef.current) {
          followerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
        }

        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseover', handleMouseOver);
        window.removeEventListener('mouseout', handleMouseOut);
      };
    }, [isTouch]);

    if (isTouch) return null; // Don't render on mobile/touch

    const style = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: isBig ? '60px' : '25px',
      height: isBig ? '60px' : '25px',
      pointerEvents: 'none',
      zIndex: 9999,
      borderRadius: '50%',
      background: isBig
        ? `
          radial-gradient(circle at 30% 30%, rgba(255, 127, 80, 0.7), rgba(255, 255, 255, 0.05) 60%),
          radial-gradient(circle at 70% 70%, rgba(255, 192, 203, 0.4), transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(173, 216, 230, 0.18), transparent 70%)
        `
        : `
          radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.05) 60%),
          radial-gradient(circle at 70% 70%, rgba(255, 192, 203, 0.3), transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(173, 216, 230, 0.15), transparent 70%)
        `,
      border: isBig
        ? '2px solid rgba(255,127,80,0.5)'
        : '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: isBig
        ? `
          0 0 24px 8px rgba(255,127,80,0.25),
          inset 0 0 8px rgba(255, 255, 255, 0.35),
          0 0 15px rgba(255, 255, 255, 0.08),
          5px 8px 15px rgba(0, 0, 0, 0.15)
        `
        : `
          inset 0 0 8px rgba(255, 255, 255, 0.35),
          0 0 15px rgba(255, 255, 255, 0.08),
          5px 8px 15px rgba(0, 0, 0, 0.15)
        `,
      backdropFilter: 'blur(2px)',
      mixBlendMode: 'screen',
      opacity: 0.7,
      transition: 'width 0.3s cubic-bezier(.4,2,.6,1), height 0.3s cubic-bezier(.4,2,.6,1), background 0.3s, border 0.3s, box-shadow 0.3s',
      animation: 'float 4s ease-in-out infinite',
    };

    return <div ref={followerRef} style={style} />;
  };

  export default CursorFollower;