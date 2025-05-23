import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Nebula Explorer',
    description: 'A stunning space visualization app with interactive star maps.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1920&q=90',
    github: 'https://github.com/ronak922',
    demo: 'https://recipe-realm.demo',
    tech: ['React', 'Three.js', 'NASA API'],
    year: 2024,
    features: [
      'Interactive 3D star maps',
      'Real-time space data from NASA',
      'Smooth zoom and pan',
      'Dark/light mode'
    ]
  },
  {
    id: 2,
    title: 'Synthwave Music Player',
    description: 'A retro-themed music player with synthwave vibes and animations.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=90',
    github: 'https://github.com/ronak922',
    demo: '#',
    tech: ['Vue', 'Howler.js', 'Sass'],
    year: 2023,
    features: [
      'Custom playlists',
      'Animated visualizer',
      'Keyboard shortcuts',
      'Offline support'
    ]
  },
  {
    id: 3,
    title: 'Crypto Dashboard',
    description: 'Real-time cryptocurrency price tracker with portfolio management.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=90',
    github: 'https://github.com/ronak922',
    demo: '#',
    tech: ['Angular', 'Chart.js', 'CoinGecko API'],
    year: 2022,
    features: [
      'Live price updates',
      'Portfolio tracking',
      'Customizable charts',
      'News feed integration'
    ]
  },
  {
    id: 4,
    title: 'Pixel Art Editor',
    description: 'A simple and intuitive pixel art editor with layers and animation support.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=90',
    github: 'https://github.com/ronak922',
    demo: '#',
    tech: ['React', 'Redux', 'Canvas API'],
    year: 2024,
    features: [
      'Layer support',
      'Frame-by-frame animation',
      'Export to GIF/PNG',
      'Color palette management'
    ]
  },
  {
    id: 5,
    title: 'Weather Wizard',
    description: 'A sleek weather app with dynamic backgrounds and 7-day forecasts.',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1920&q=90',
    github: 'https://github.com/ronak922',
    demo: '#',
    tech: ['Next.js', 'OpenWeatherMap API', 'Styled Components'],
    year: 2023,
    features: [
      'Dynamic weather backgrounds',
      '7-day forecast',
      'Location search',
      'Responsive design'
    ]
  },
  {
    id: 6,
    title: 'TaskFlow Pro',
    description: 'A productivity tool for managing tasks and tracking progress visually.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1920&q=90',
    github: 'https://github.com/ronak922',
    demo: '#',
    tech: ['React', 'Firebase', 'D3.js'],
    year: 2024,
    features: [
      'Kanban board',
      'Progress analytics',
      'Team collaboration',
      'Drag & drop tasks'
    ]
  },
  {
    id: 7,
    title: 'Recipe Realm',
    description: 'Discover, save, and share recipes with a vibrant food community.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=90',
    github: 'https://github.com/ronak922',
    demo: 'https://recipe-realm.demo',
    tech: ['Vue', 'Node.js', 'MongoDB'],
    year: 2022,
    features: [
      'Recipe search & filters',
      'User profiles',
      'Favorites & collections',
      'Comment & rating system'
    ]
  }
];

// Four possible directions
const directions = ['up', 'down', 'left', 'right'];

// Smoother, clearer, more responsive animation
const variants = {
  enter: (custom) => {
    const { directionType } = custom;
    const base = {
      opacity: 0,
      scale: 0.98,
      filter: "blur(3px)",
      transition: { duration: 0.55, type: "tween", ease: [0.22, 1, 0.36, 1] }
    };
    switch (directionType) {
      case 'up': return { ...base, y: '-100vh', x: 0 };
      case 'down': return { ...base, y: '100vh', x: 0 };
      case 'left': return { ...base, x: '-100vw', y: 0 };
      case 'right': return { ...base, x: '100vw', y: 0 };
      default: return { ...base, y: '100vh' };
    }
  },
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, type: "tween", ease: [0.22, 1, 0.36, 1] }
  },
  exit: (custom) => {
    const { directionType } = custom;
    const base = {
      opacity: 0,
      scale: 1.02,
      filter: "blur(3px)",
      transition: { duration: 0.55, type: "tween", ease: [0.22, 1, 0.36, 1] }
    };
    switch (directionType) {
      case 'up': return { ...base, y: '100vh', x: 0 };
      case 'down': return { ...base, y: '-100vh', x: 0 };
      case 'left': return { ...base, x: '100vw', y: 0 };
      case 'right': return { ...base, x: '-100vw', y: 0 };
      default: return { ...base, y: '-100vh' };
    }
  }
};

const Projects = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [directionType, setDirectionType] = useState('down');
  const numProjects = projects.length;
  const touchStartY = useRef(null);
  const scrollTimeout = useRef(null);

  // Helper to get a random direction
  const getRandomDirection = () => directions[Math.floor(Math.random() * directions.length)];

  // Scroll navigation
  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollTimeout.current) return;
      const randomDir = getRandomDirection();
      setDirectionType(randomDir);
      if (e.deltaY > 10) paginate(1);
      else if (e.deltaY < -10) paginate(-1);
      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 350);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // Touch navigation for mobile
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const randomDir = getRandomDirection();
    setDirectionType(randomDir);
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY > 60) paginate(-1);
    if (deltaY < -60) paginate(1);
    touchStartY.current = null;
  };

  // Keyboard navigation (optional)
  useEffect(() => {
    const handleKey = (e) => {
      const randomDir = getRandomDirection();
      setDirectionType(randomDir);
      if (e.key === "ArrowDown" || e.key === "PageDown") paginate(1);
      if (e.key === "ArrowUp" || e.key === "PageUp") paginate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const paginate = (newDirection) => {
    setPage(([prevPage]) => {
      let next = prevPage + newDirection;
      if (next < 0) next = 0;
      if (next >= numProjects) next = numProjects - 1;
      if (next === prevPage) return [prevPage, 0];
      return [next, newDirection];
    });
  };

  // Get current project details
  const { title, description, image, github, demo, tech, year, features } = projects[page];

  return (
    <div
      className="project-fullpage-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      <AnimatePresence initial={false} custom={{ directionType }}>
        <motion.div
          key={page}
          className="project-fullpage-card split"
          custom={{ directionType }}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <div className="project-split-left">
            <img src={image} alt={title} className="project-image" />
          </div>
          <div className="project-split-right">
            <div className="project-info">
              <h2>{title}</h2>
              <div className="accent-line"></div>
              <p>{description}</p>
              <ul className="project-meta">
                <li><strong>Year:</strong> {year}</li>
                <li><strong>Tech:</strong> {tech.join(', ')}</li>
              </ul>
              <ul className="project-features">
                {features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <div className="project-links">
                <a href={github} target="_blank" rel="noreferrer">GitHub</a>
                {demo && demo !== '#' && (
                  <a href={demo} target="_blank" rel="noreferrer">Live Demo</a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="project-nav">
        <span>
          {page + 1} / {numProjects}
        </span>
      </div>
    </div>
  );
};

export default Projects;