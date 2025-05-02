import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({});

  useEffect(() => {
    // Add particles.js script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      if (window.particlesJS) {
        // @ts-ignore
        window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: '#9333ea'
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000'
              }
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#9333ea',
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'grab'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
              },
              repulse: {
                distance: 200,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true
        });
      }
    };

    // --- Intersection Observer for Animations ---
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all elements with the 'reveal' class after a short delay
    const revealTimeout = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => animationObserver.observe(el));
    }, 300);

    // --- Intersection Observer for URL Hash Update ---
    const sectionIds = ['home', 'projects', 'about', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(el => el !== null) as HTMLElement[];
    
    const urlObserverOptions = {
      root: null, // relative to document viewport
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 50% of the section is visible
    };

    let currentSectionId: string | null = null;

    const urlObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const sectionId = entry.target.id;
          if (sectionId && sectionId !== currentSectionId) {
            // Update URL hash without adding to history
            window.history.replaceState(null, '', `#${sectionId}`);
            currentSectionId = sectionId;
            // Optional: Update active state in Navbar if needed
            // document.querySelectorAll('nav a').forEach(a => a.classList.remove('active-nav-link'));
            // document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.add('active-nav-link');
          }
        }
      });
      // Handle case where no section is dominant (e.g., scrolling fast between sections)
      // Or when scrolling back to the very top before 'home' is 50% visible
      if (!entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.5)) {
         // Check if scrolled to the top
         if (window.scrollY < window.innerHeight * 0.5) { // Adjust threshold as needed
            if (currentSectionId !== 'home') {
              window.history.replaceState(null, '', '#home');
              currentSectionId = 'home';
            }
         } 
      }

    }, urlObserverOptions);

    sections.forEach(section => {
      sectionRefs.current[section.id] = section;
      urlObserver.observe(section);
    });

    // Cleanup function
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      clearTimeout(revealTimeout);
      animationObserver.disconnect();
      urlObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-100 text-white">
      <div id="particles-js" className="absolute top-0 left-0 w-full h-screen pointer-events-none"></div>
      <Navbar />
      <section id="home"><Hero /></section>
      <section id="projects"><Projects /></section>
      <section id="about"><About /></section>
      <section id="contact"><Contact /></section>
      <Footer />
    </div>
  );
  

export default Index;
