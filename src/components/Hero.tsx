import React from "react";
import { ArrowDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleArrowClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("projects");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const section = document.getElementById("projects");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-center py-40 md:py-48 lg:py-52 bg-gradient-to-b from-dark-200 to-dark-100">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 font-playfair">
        Benvenuto nel mio Portfolio
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
        Esplora i miei progetti scolastici, le competenze acquisite e i percorsi formativi affrontati.
      </p>

      <div className="absolute bottom-10 w-full flex justify-center animate-float">
        <button onClick={handleArrowClick} className="text-white">
          <ArrowDown size={30} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
