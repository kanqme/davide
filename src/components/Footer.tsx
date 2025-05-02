
import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-dark-100 border-t border-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold gradient-text">Portfolio</h2>
            <p className="text-gray-400 mt-2">Un progetto per la scuola</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <nav className="flex flex-wrap justify-center gap-6">
              <a href="#home" className="text-gray-300 hover:text-accent-purple transition-colors">Home</a>
              <a href="#about" className="text-gray-300 hover:text-accent-purple transition-colors">Chi Sono</a>
              <a href="#projects" className="text-gray-300 hover:text-accent-purple transition-colors">Progetti</a>
              <a href="#skills" className="text-gray-300 hover:text-accent-purple transition-colors">Skills</a>
              <a href="#contact" className="text-gray-300 hover:text-accent-purple transition-colors">Contatti</a>
            </nav>
            
            <button 
              onClick={scrollToTop} 
              className="bg-dark-300 p-3 rounded-full hover:bg-accent-purple/20 transition-colors"
              aria-label="Torna all'inizio"
            >
              <ArrowUp className="text-accent-purple" size={20} />
            </button>
          </div>
        </div>
        
        <div className="border-t border-dark-300 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Portfolio Scolastico. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
