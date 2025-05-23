import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import "./About.css";

const experiences = [
  { role: "Computer Science Student", company: "MDU University", year: "2022–2025" },
  { role: "Freelance Developer", company: "Remote", year: "2024" },
  { role: "Frontend Intern", company: "Enouf Design Pvt. Ltd.", year: "Nov 2024 - Feb 2025" },
];

const words = ["creative", "bold", "playful", "unique"];

const About = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(true);

  // Ref for timeline wrapper and inView detection
  const timelineRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, { amount: 0.2, once: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 700); // glitch lasts 700ms
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-container">
      <div className="background-blob"></div>

      <motion.h1
        className="headline"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        I build{" "}
        <span
          className={`highlight ${isGlitching ? "glitch" : ""}`}
          data-text={words[currentWordIndex]}
        >
          {words[currentWordIndex]}
        </span>{" "}
        web experiences.
      </motion.h1>

      <motion.p
        className="bio"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        I’m a full-stack developer who blends creativity with code. I design with intention,
        animate with purpose, and build digital stuff that just feels right.
      </motion.p>

      {/* Timeline with useInView hook for animation */}
      <motion.div
        ref={timelineRef}
        className="timeline-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTimelineInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {experiences.map((exp, idx) => (
          <div className="timeline-block" key={idx}>
            <div className="dot" />
            <div className="timeline-text">
              <h3>{exp.role}</h3>
              <span>
                {exp.company} • {exp.year}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.a
        href="https://drive.google.com/file/d/1HJSYDrpCKzL-Q66kz6W8TlLlXwRb0vKh/view?usp=drive_link"
        download
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <span className="box">Download Resume</span>
      </motion.a>

      <motion.div
        className="about-socials"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <a href="https://instagram.com/ronaak007" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://github.com/ronak922" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/ronak922" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </motion.div>
    </div>
  );
};

export default About;
