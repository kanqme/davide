import React from "react";
import { useNavigate } from "react-router-dom";
import { Terminal, BrainCircuit, Calculator, Lightbulb, ArrowLeft, ArrowRight } from "lucide-react";
import AnimatedTerminal from "@/components/AnimatedTerminal";

// Import or define the projects array here (or pass it as props)
const projects = [
  {
    key: "progetto-ust",
    label: "Progetto UST",
    img: "./lovable-uploads/ddd03ae5-6964-403a-85ba-f17aca4b21e7.png",  // Percorso relativo corretto
    to: "/projects/ust",
    description: "Incontro online con il prof. Vairo sul significato del PCTO, visto non solo come obbligo scolastico, ma come opportunità per orientarsi nel mondo del lavoro e scoprire le proprie potenzialità.",
    year: "2024/2025"
  },
  {
    key: "monta-smonta",
    label: "Monta & Smonta",
    img: "./lovable-uploads/ad297a93-798e-4b62-b66c-55f1f8011d5e.png",  // Percorso relativo corretto
    to: "/projects/monta-smonta",
    description: "Abbiamo smontato e rimontato vecchi computer per studiarne i componenti interni, approfondendo il funzionamento di elementi chiave come scheda madre, processore, RAM e alimentatore, e sviluppando competenze utili per la manutenzione e la riparazione.",
    year: "2024/2025"
  },
  {
    key: "linux",
    label: "Linux",
    img: "./lovable-uploads/f130323f-2218-4416-a290-4cac3c755853.png",  // Percorso relativo corretto
    to: "/projects/linux",
    description: "Abbiamo partecipato a un corso di 6 ore su Linux, approfondendo storia, versioni ed evoluzione del sistema operativo. Attraverso esercitazioni pratiche su Ubuntu, abbiamo imparato a gestire file system, permessi e pacchetti. Il corso si è concluso con un test per verificare le competenze acquisite.",
    year: "2024/2025"
  },
  {
    key: "nonni-smart",
    label: "Nonni Smart",
    img: "./images/placeholder-nonni-smart.png",  // Percorso relativo corretto
    to: "/projects/nonni-smart",
    description: "Il progetto \"Nonni Smart\" è nato con l'obiettivo di avvicinare le persone anziane al mondo della tecnologia. Attraverso incontri pratici, abbiamo insegnato loro a utilizzare il computer e lo smartphone in modo semplice e sicuro.",
    year: "2024/2025"
  }
];

const LinuxDetail: React.FC = () => {
  const navigate = useNavigate();
  // Assuming the route is /projects/:projectKey
  const currentProjectKey = "linux"; 

  const skills = [
    { name: "Competenza Digitale", icon: BrainCircuit, color: "text-accent-purple" },
    { name: "Competenze matematiche e scientifiche", icon: Calculator, color: "text-accent-blue" },
    { name: "Competenze pratiche sull'uso dei sistemi Linux", icon: Terminal, color: "text-accent-pink" },
    { name: "Autonomia nell'apprendimento", icon: Lightbulb, color: "text-accent-purple" }
  ];

  // Find current project index
  const currentIndex = projects.findIndex(p => p.key === currentProjectKey);
  
  // Calculate previous and next project indices with wrapping
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;
  
  const prevProject = projects[prevIndex];
  const nextProject = projects[nextIndex];

  return (
    <section className="py-16 md:py-20 bg-dark-100 min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <button
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }, 100); // Small delay for navigation
          }}
          className="group mb-8 inline-flex items-center gap-2 text-accent-purple font-medium text-base transition-all duration-300 hover:text-accent-blue hover:gap-3"
        >
          <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="underline underline-offset-2">Torna indietro</span>
        </button>

        {/* Gallery */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-10 md:mb-12">
          <img
            src="./lovable-uploads/f2f0766b-4edb-4dea-8b78-36dea93072d8.png"  // Percorso relativo corretto
            alt="Linux Ubuntu wallpaper"
            className="rounded-2xl shadow-lg flex-1 object-cover max-h-[280px] md:max-h-[310px] w-full border border-accent-purple/20"
            style={{ background: "#45465f" }}
          />
          <img
            src="./lovable-uploads/9f1f0f58-41ea-4168-9aef-1eced60db98f.png"  // Percorso relativo corretto
            alt="Linux Tux Mascotte"
            className="rounded-2xl shadow-lg flex-1 object-cover max-h-[280px] md:max-h-[310px] w-full border border-accent-blue/20"
            style={{ background: "#eceaf5" }}
          />
        </div>

        {/* Content */}
        <div className="bg-dark-200/80 rounded-3xl px-6 sm:px-8 py-8 shadow-xl flex flex-col gap-4 md:text-lg">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3 font-playfair tracking-wide">
            Linux
          </h1>
          <p className="mb-2 leading-relaxed text-gray-100 font-medium">
            Il corso su <span className="gradient-text font-semibold">Linux</span> ci ha fatto scoprire la <span className="text-accent-purple font-semibold">potenza del mondo open source</span>, alternando teoria e attività pratiche con l'utilizzo diretto del sistema!
          </p>
          <p>
            Abbiamo partecipato a un corso di 6 ore su Linux, approfondendo <span className="text-accent-blue">storia, versioni ed evoluzione</span> del sistema operativo.
          </p>
          <p>
            Attraverso esercitazioni pratiche su Ubuntu, abbiamo imparato a gestire <span className="text-accent-pink">file system, permessi e pacchetti</span>. Il corso si è concluso con un test per verificare le competenze acquisite.
          </p>

          {/* Terminal Introduction */}
          <p className="mt-6 text-gray-300 italic text-base">
            Abbiamo esplorato il terminale di Linux, imparando a usare comandi fondamentali per navigare, modificare file e aggiornare il sistema.
          </p>
          
          {/* Animated Terminal */}
          <AnimatedTerminal />

          <h2 className="font-semibold mt-8 mb-6 text-2xl gradient-text">Competenze sviluppate</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-4 bg-dark-300/50 rounded-xl border border-transparent hover:border-accent-purple/30 hover:bg-dark-300/70 transition-all duration-300"
              >
                <div className={`p-2 rounded-lg bg-dark-300/80 ${skill.color}`}>
                  <skill.icon size={24} />
                </div>
                <span className="text-gray-100 font-medium text-sm md:text-base">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Navigation Buttons - Optimized Responsive */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          {prevProject && (
            <button 
              onClick={() => navigate(prevProject.to)}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-dark-300 border border-accent-purple/30 text-gray-200 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-accent-purple/20 hover:border-accent-purple hover:text-white hover:shadow-lg hover:shadow-accent-purple/20"
            >
              <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span>{prevProject.label}</span>
            </button>
          )} 
          {!prevProject && <div className="w-full sm:w-auto"></div>} {/* Placeholder to maintain layout */} 
          
          {nextProject && (
            <button 
              onClick={() => navigate(nextProject.to)}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-dark-300 border border-accent-blue/30 text-gray-200 font-medium text-sm sm:text-base transition-all duration-300 hover:bg-accent-blue/20 hover:border-accent-blue hover:text-white hover:shadow-lg hover:shadow-accent-blue/20"
            >
              <span>{nextProject.label}</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
          {!nextProject && <div className="w-full sm:w-auto"></div>} {/* Placeholder to maintain layout */}
        </div>
      </div>
    </section>
  );
};

export default LinuxDetail;
