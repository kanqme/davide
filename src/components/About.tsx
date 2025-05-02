import React, { useEffect, useRef, useState } from 'react';
import SkillBar from './SkillBar';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaPhp, FaPython, 
  FaDatabase 
} from 'react-icons/fa';
import { 
  SiTypescript, SiDart, SiCplusplus, SiAssemblyscript 
} from 'react-icons/si';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target === sectionRef.current) {
              setIsVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skills = [
    { name: 'HTML', percentage: 100, icon: FaHtml5 },
    { name: 'CSS', percentage: 100, icon: FaCss3Alt },
    { name: 'Assembly', percentage: 100, icon: SiAssemblyscript },
    { name: 'Python', percentage: 100, icon: FaPython },
    { name: 'C++', percentage: 70, icon: SiCplusplus },
    { name: 'TypeScript', percentage: 50, icon: SiTypescript },
    { name: 'PHP', percentage: 45, icon: FaPhp },
    { name: 'JavaScript', percentage: 40, icon: FaJs },
    { name: 'SQL', percentage: 30, icon: FaDatabase },
    { name: 'Dart', percentage: 30, icon: SiDart }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-dark-200">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">Chi Sono</h2>
          <div className="w-20 h-1 bg-accent-purple mx-auto reveal"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="reveal">
            <div className="relative">
              <div className="w-full h-80 md:h-96 bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 rounded-3xl overflow-hidden flex items-center justify-center border-4 border-accent-blue">
                <img 
                  src="./lovable-uploads/hi.jpg" 
                  alt="Davide Ajazi" 
                  className="w-full h-full object-contain"
                  onError={(e) => (e.currentTarget.src = `${import.meta.env.BASE_URL}images/placeholder.png`)} 
                />
              </div>
            </div>
          </div>
          
          <div className="reveal">
            <h3 className="text-2xl font-bold mb-4 text-white">Studente & Developer</h3>
            <div className="text-gray-300 mb-6 space-y-3">
              <p>
                Mi chiamo Davide Ajazi, sono nato il 26 marzo 2008 e frequento l'Istituto Tecnico Blaise Pascal di Reggio Emilia. La mia vita è un equilibrio tra interessi creativi e tecnologici: suono il pianoforte, pratico basket e palestra, e nel tempo libero esploro diversi generi musicali, senza pregiudizi.
              </p>
              <p>
                Ogni estate da tre anni lavoro nell’azienda di mio padre, esperienza che mi ha insegnato il valore della costanza e della responsabilità. Ho conseguito una certificazione C1 in inglese e mi descriverei come una persona riflessiva, curiosa e socievole, ma anche capace di lasciarsi trasportare dall’energia del momento.
              </p>
              <p>
                Un tratto che mi caratterizza davvero è la mia empatia: riesco a mettermi facilmente nei panni degli altri, qualità che spero di portare nel mio futuro nel campo dell’<span className="text-accent-purple font-medium">Intelligenza Artificiale</span> e della <span className="text-accent-blue font-medium">Cybersecurity</span>, per creare tecnologie più umane e inclusive.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 reveal">
          <h4 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">Competenze Tecniche</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {skills.map((skill, index) => (
              <SkillBar 
                key={index}
                skill={skill.name}
                percentage={skill.percentage}
                icon={skill.icon}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
