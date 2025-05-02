import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, BookOpen, Users, MessageSquare, BrainCircuit, GraduationCap, Globe, Speech, ArrowLeft, ArrowRight } from "lucide-react";
import PCTOMindMap from "@/components/PCTOMindMap";

// Percorsi corretti con "./" per GitHub Pages
const projects = [
  {
    key: "progetto-ust",
    label: "Progetto UST",
    img: "./lovable-uploads/ddd03ae5-6964-403a-85ba-f17aca4b21e7.png",
    to: "/projects/ust",
    description: "Incontro online con il prof. Vairo sul significato del PCTO...",
    year: "2024/2025"
  },
  {
    key: "monta-smonta",
    label: "Monta & Smonta",
    img: "./lovable-uploads/ad297a93-798e-4b62-b66c-55f1f8011d5e.png",
    to: "/projects/monta-smonta",
    description: "Abbiamo smontato e rimontato vecchi computer...",
    year: "2024/2025"
  },
  {
    key: "linux",
    label: "Linux",
    img: "./lovable-uploads/f130323f-2218-4416-a290-4cac3c755853.png",
    to: "/projects/linux",
    description: "Abbiamo partecipato a un corso di 6 ore su Linux...",
    year: "2024/2025"
  },
  {
    key: "nonni-smart",
    label: "Nonni Smart",
    img: "./images/placeholder-nonni-smart.png",
    to: "/projects/nonni-smart",
    description: "Il progetto \"Nonni Smart\" è nato con l'obiettivo...",
    year: "2024/2025"
  }
];

const AnpalDetail: React.FC = () => {
  const navigate = useNavigate();
  const currentProjectKey = "progetto-ust";

  const skills = [
    { name: "Competenza Digitale", icon: BrainCircuit, color: "text-accent-purple" },
    { name: "Competenza personale, sociale e capacità di imparare a imparare", icon: GraduationCap, color: "text-accent-blue" },
    { name: "Competenza in materia di cittadinanza", icon: Globe, color: "text-accent-pink" },
    { name: "Abilità comunicative", icon: Speech, color: "text-accent-purple" }
  ];

  const currentIndex = projects.findIndex(p => p.key === currentProjectKey);
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
            }, 100);
          }}
          className="group mb-8 inline-flex items-center gap-2 text-accent-purple font-medium text-base transition-all duration-300 hover:text-accent-blue hover:gap-3"
        >
          <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="underline underline-offset-2">Torna indietro</span>
        </button>

        <div className="flex justify-center mb-10 md:mb-12">
          <img
            src="./lovable-uploads/ust.png"
            alt="I PCTO: Prepararsi alle professioni di domani"
            className="rounded-2xl shadow-lg object-contain max-h-[350px] w-full border border-accent-purple/20"
            style={{ background: "#edf2f7" }}
          />
        </div>

        <div className="bg-dark-200/80 rounded-3xl px-6 sm:px-8 py-8 shadow-xl flex flex-col gap-4 md:text-lg">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3 font-playfair tracking-wide">Progetto UST</h1>
          <p className="mb-2 leading-relaxed text-gray-100 font-medium">
            All'inizio del nostro percorso <span className="gradient-text font-semibold">PCTO</span> abbiamo preso parte a un incontro...
          </p>
          <p>Attraverso la piattaforma Google Meet, il professore ci ha accompagnato...</p>
          <p>Durante l'incontro, con esempi chiari e pratici, ci ha spinti a vedere queste esperienze...</p>

          <PCTOMindMap />

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
          {nextProject && (
            <button
              onClick={() => navigate(nextProject.to)}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-dark-300 border border-accent-blue/30 text-gray-200 font-medium transition-all duration-300 hover:bg-accent-blue/20 hover:border-accent-blue hover:text-white hover:shadow-lg hover:shadow-accent-blue/20"
            >
              <span>{nextProject.label}</span>
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnpalDetail;
