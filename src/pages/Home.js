import React, { useRef } from 'react';
import Particles from 'react-tsparticles';
import './Home.css';

const Home = () => {
  const leftText = [
    "I'm a passionate developer with a keen eye for detail and a commitment to creating exceptional user experiences.",
    "My journey in web development began with a curiosity about how things work on the internet, which quickly evolved into a deep passion for building digital solutions.",
    "I specialize in the MERN stack (MongoDB, Express, React, Node.js) and have experience with a wide range of modern web technologies.",
    "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community.",
    "I believe in writing clean, maintainable code and following best practices to ensure that my applications are not only functional but also scalable and secure.",
    "My approach to development is user-centered, focusing on creating intuitive interfaces that provide seamless experiences across all devices.",
    "I'm constantly learning and adapting to the ever-changing landscape of web development, staying up-to-date with the latest trends and technologies."
  ];

  const rightText = [
    "I have a strong foundation in front-end technologies, including HTML5, CSS3, JavaScript (ES6+), and modern frameworks like React.",
    "On the back-end, I'm proficient with Node.js, Express, and various database systems, including MongoDB, MySQL, and PostgreSQL.",
    "I'm experienced in building RESTful APIs and implementing authentication systems to ensure secure data exchange between client and server.",
    "My projects range from simple landing pages to complex full-stack applications, each designed with attention to performance, accessibility, and user experience.",
    "I'm a collaborative team player who thrives in agile environments, where I can contribute my skills while learning from others.",
    "Problem-solving is at the core of what I do, and I enjoy tackling complex challenges that push me to expand my knowledge and skills.",
    "I'm passionate about creating technology that makes a positive impact on people's lives, whether it's through improving efficiency, accessibility, or simply bringing joy."
  ];

  return (
    <div className="home-container">
      <Particles
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#ffffff", distance: 150 },
            collisions: { enable: true },
            move: { enable: true, speed: 2 },
            number: { value: 50 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
          },
        }}
      />

      <div className="infinite-scroll-container">
        <div className="column left-column">
          <div className="column-content">
            {[...leftText, ...leftText].map((text, i) => (
              <p key={`left-${i}`}>
                <span className="first-letter">{text.charAt(0)}</span>{text.slice(1)}
              </p>
            ))}
          </div>
        </div>

        <div className="column center-column">
          <div className="hero-section" >
            <div className="hero-profile-image">
              <img
                src="https://i.ibb.co/Wh1wP82/profile.jpg"
                alt="Ronak Saini Profile"
                className="profile-image"
              />
            </div>
            <h1 className="hero-title">RONAK</h1>
            <h2 className="hero-subtitle">Full Stack Developer | MERN Enthusiast</h2>

            <p className="hero-description">
              I design and build modern, scalable web experiences that users love. My work combines technical expertise with creative problem-solving to deliver exceptional digital solutions.
            </p>

            <a href="/projects" className="btn-glitch">
            <span className="text" >View My Work </span>
            <span className="decoration" >✦</span>
            </a>
          </div>
        </div>

        <div className="column right-column">
          <div className="column-content">
            {[...rightText, ...rightText].map((text, i) => (
              <p key={`right-${i}`}>
                <span className="first-letter">{text.charAt(0)}</span>{text.slice(1)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
