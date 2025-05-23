import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Grid from './components/Grid';
import CursorFollow from './components/CursorFollow';

import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import CookieBox from "./components/CookieBox";

import PageTransition from './pages/PageTransition';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Router>
      <CookieBox />
      <PageTransition>
      <Navbar />
      <Grid />
      <CursorFollow />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageTransition>
    </Router>
  );
}

export default App;
