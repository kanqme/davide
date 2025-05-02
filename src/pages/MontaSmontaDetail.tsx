import React from "react";
import { useNavigate } from "react-router-dom";
import { Cpu, HardDrive, MemoryStick, Fan, Power, BrainCircuit, Calculator, Lightbulb, Users, ArrowLeft, ArrowRight } from "lucide-react";

// Import or define the projects array here (or pass it as props)
const projects = [
  {
    key: "progetto-ust",
    label: "Progetto UST",
    img: "./lovable-uploads/ddd03ae5-6964-403a-85ba-f17aca4b21e7.png",
    to: "/projects/ust",
    description: "Incontro online con il prof. Vairo sul significato del PCTO, visto non solo come obbligo scolastico, ma come opportunità per orientarsi nel mondo del lavoro e scoprire le proprie potenzialità.",
    year: "2024/2025"
  },
  {
    key: "monta-smonta",
    label: "Monta & Smonta",
    img: "./lovable-uploads/ad297a93-798e-4b62-b66c-55f1f8011d5e.png",
    to: "/projects/monta-smonta",
    description: "Abbiamo smontato e rimontato vecchi computer per studiarne i componenti interni, approfondendo il funzionamento di elementi chiave come scheda madre, processore, RAM e alimentatore, e sviluppando competenze utili per la manutenzione e la riparazione.",
    year: "2024/2025"
  },
  {
    key: "linux",
    label: "Linux",
    img: "./lovable-uploads/f130323f-2218-4416-a290-4cac3c755853.png",
    to: "/projects/linux",
    description: "Abbiamo partecipato a un corso di 6 ore su Linux, approfondendo storia, versioni ed evoluzione del sistema operativo. Attraverso esercitazioni pratiche su Ubuntu, abbiamo imparato a gestire file system, permessi e pacchetti. Il corso si è concluso con un test per verificare le competenze acquisite.",
    year: "2024/2025"
  },
  {
    key: "nonni-smart",
    label: "Nonni Smart",
    img: "./images/placeholder-nonni-smart.png",
    to: "/projects/nonni-smart",
    description: "Il progetto \"Nonni Smart\" è nato con l'obiettivo di avvicinare le persone anziane al mondo della tecnologia. Attraverso incontri pratici, abbiamo insegnato loro a utilizzare il computer e lo smartphone in modo semplice e sicuro.",
    year: "2024/2025"
  }
];

const computerComponents = [
  {
    name: "CPU",
    icon: Cpu,
    description: "Il processore è il cervello del computer. Esegue i calcoli e le operazioni logiche necessarie per far funzionare i programmi.",
    detailedDescription: "Il cervello del computer. Maggiore è la frequenza e il numero di core, più veloce sarà l'elaborazione.",
    imageSrc: "https://kanqme.github.io/davide/public/lovable-uploads/cpu.jpeg"
  },
  {
    name: "RAM",
    icon: MemoryStick,
    description: "La memoria RAM immagazzina temporaneamente i dati a cui il processore accede frequentemente, permettendo un'elaborazione più veloce.",
    detailedDescription: "Memoria temporanea per accesso veloce ai dati. Più RAM hai, più programmi puoi eseguire insieme.",
    imageSrc: "https://kanqme.github.io/ajazi/davide/lovable-uploads/ram.jpg"
  },
  {
    name: "Hard Disk",
    icon: HardDrive,
    description: "L'hard disk è la memoria di massa che conserva in modo permanente file, programmi e il sistema operativo.",
    detailedDescription: "La memoria permanente del computer. Può essere meccanico (HDD) o a stato solido (SSD).",
    imageSrc: "https://kanqme.github.io/davide/public/lovable-uploads/harddisk.jpg"
  },
  {
    name: "Alimentatore",
    icon: Power,
    description: "Fornisce l'energia elettrica necessaria a tutti i componenti del computer, convertendo la corrente alternata in corrente continua.",
    detailedDescription: "Fornisce energia a tutti i componenti. Garantisce stabilità al sistema.",
    imageSrc: "https://kanqme.github.io/davide/public/lovable-uploads/alimentatore.jpg"
  },
  {
    name: "Dissipatore",
    icon: Fan,
    description: "Sistema di raffreddamento che evita il surriscaldamento della CPU e di altri componenti durante il funzionamento.",
    detailedDescription: "Mantiene la CPU a temperature ottimali. Può essere ad aria o a liquido.",
    imageSrc: "https://kanqme.github.io/davide/public/lovable-uploads/dissipatore.jpg"
  }
];

const MontaSmontaDetail: React.FC = () => {
  const navigate = useNavigate();
  
  // For now, hardcoding current project for MontaSmontaDetail
  const currentProjectKey = "monta-smonta"; 
  
  const skills = [
    {
      name: "Competenza Digitale",
      icon: BrainCircuit,
      color: "text-accent-purple"
    },
    {
      name: "Competenza matematica, scientifica e tecnologica",
      icon: Calculator,
      color: "text-accent-blue"
    },
    {
      name: "Competenza imprenditoriale",
      icon: Lightbulb,
      color: "text-accent-pink"
    },
    {
      name: "Teamwork e problem solving",
      icon: Users,
      color: "text-accent-purple"
    }
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
        {/* Improved Back Button */}
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
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-10 md:mb-12">
          <img
            src="https://kanqme.github.io/davide/public/lovable-uploads/ad297a93-798e-4b62-b66c-55f1f8011d5e.png"
            alt="Monta e Smonta - interno PC"
            className="rounded-2xl shadow-lg flex-1 object-cover max-h-[280px] md:max-h-[310px] w-full border border-accent-purple/20"
            style={{ background: "#262a3a" }}
          />
          <img
            src="https://kanqme.github.io/davide/public/lovable-uploads/lol.jpg"
            alt="Monta e Smonta - motherboard"
            className="rounded-2xl shadow-lg flex-1 object-cover max-h-[280px] md:max-h-[310px] w-full border border-accent-blue/20"
            style={{ background: "#262a3a" }}
          />
        </div>

        <div className="bg-dark-200/80 rounded-3xl px-6 sm:px-8 py-8 shadow-xl flex flex-col gap-4 md:text-lg">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3 font-playfair tracking-wide">
            Monta &amp; Smonta
          </h1>
          <p className="mb-2 leading-relaxed text-gray-100 font-medium">
            L&#39;attività <span className="gradient-text font-semibold"> di Monta e Smonta di un computer</span> è stata una vera <span className="text-accent-purple font-semibold">esperienza immersiva</span> che ci ha permesso di mettere le mani sui componenti reali della macchina!
          </p>
          <p>
            Dopo aver studiato la teoria, abbiamo <span className="text-accent-blue"> smontato attentamente</span> tutte le parti del PC, osservato da vicino ogni elemento e ragionato sulla loro funzione. Poi, con la stessa cura, abbiamo rimontato il computer verificandone il corretto funzionamento.
          </p>
          <p className="mb-6">
            L&#39;attività si è conclusa con un <span className="font-semibold text-accent-pink">test pratico</span> che ci ha permesso di dimostrare le competenze acquisite "sul campo".
          </p>
          
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-8 font-playfair">
            Componenti Principali
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {computerComponents.map((component, index) => (
              <div key={index} className="group perspective-1000">
                <div className="relative w-full h-[320px] transition-all duration-500 transform-style-3d rounded-xl cursor-pointer group-hover:rotate-y-180">
                  <div className="absolute inset-0 bg-dark-200 rounded-xl border border-accent-purple/30 overflow-hidden backface-hidden shadow-xl">
                    <div className="w-full h-[240px] overflow-hidden bg-dark-300 flex items-center justify-center">
                      <img 
                        src={component.imageSrc} 
                        alt={component.name}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <div className="p-4 flex items-center justify-center">
                      <h3 className="text-xl font-semibold text-accent-blue">{component.name}</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-300 to-dark-200 rounded-xl border border-accent-blue/30 overflow-hidden backface-hidden shadow-xl rotate-y-180">
                    <div className="flex flex-col items-center justify-between h-full py-8 px-6">
                      <div className="p-3 rounded-full bg-dark-300/50 text-accent-purple">
                        <component.icon size={32} />
                      </div>
                      <h3 className="text-xl font-semibold text-accent-purple my-4">{component.name}</h3>
                      <p className="text-gray-200 text-center">{component.detailedDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-semibold mt-6 mb-6 text-2xl gradient-text">Competenze sviluppate</h2>
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

        {/* Animated Navigation Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          {prevProject && (
            <button 
              onClick={() => navigate(prevProject.to)}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-dark-300 border border-accent-purple/30 text-gray-200 font-medium transition-all duration-300 hover:bg-accent-purple/20 hover:border-accent-purple hover:text-white hover:shadow-lg hover:shadow-accent-purple/20"
            >
              <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span>{prevProject.label}</span>
            </button>
          )} 
          {!prevProject && <div className="w-full sm:w-auto"></div>} {/* Placeholder to maintain layout */} 
          
          {nextProject && (
            <button 
              onClick={() => navigate(nextProject.to)}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-dark-300 border border-accent-blue/30 text-gray-200 font-medium transition-all duration-300 hover:bg-accent-blue/20 hover:border-accent-blue hover:text-white hover:shadow-lg hover:shadow-accent-blue/20"
            >
              <span>{nextProject.label}</span>
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
          {!nextProject && <div className="w-full sm:w-auto"></div>} {/* Placeholder to maintain layout */} 
        </div>
      </div>
    </section>
  );
};

export default MontaSmontaDetail;
