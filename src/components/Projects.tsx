import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";

// Progetti con descrizioni
const projects = [
  {
    key: "progetto-ust",
    label: "Progetto UST",
    img: "./lovable-uploads/ust.png", // Percorso immagine aggiornato
    to: "/projects/ust",
    description: "Conferenza online con il professor Vairo sul PCTO, inteso non solo come adempimento scolastico, ma come occasione per esplorare il mondo professionale e valorizzare le proprie capacità.",
    year: "2024/2025"
  },
  {
    key: "monta-smonta",
    label: "Monta & Smonta",
    img: "./lovable-uploads/ddd03ae5-6964-403a-85ba-f17aca4b21e7.png", // Percorso immagine aggiornato
    to: "/projects/monta-smonta",
    description: "Abbiamo analizzato vecchi computer, smontandoli e rimontandoli per esaminare da vicino i loro componenti principali, come la scheda madre, il processore, la RAM e l'alimentatore. Questo ci ha permesso di approfondire il loro funzionamento e acquisire competenze pratiche per la manutenzione e la riparazione.",
    year: "2024/2025"
  },
  {
    key: "linux",
    label: "Linux",
    img: "./lovable-uploads/f130323f-2218-4416-a290-4cac3c755853.png", // Percorso immagine aggiornato
    to: "/projects/linux",
    description: "Abbiamo partecipato a un corso di 6 ore su Linux, approfondendo storia, versioni ed evoluzione del sistema operativo. Attraverso esercitazioni pratiche su Ubuntu, abbiamo imparato a gestire file system, permessi e pacchetti. Il corso si è concluso con un test per verificare le competenze acquisite.",
    year: "2024/2025"
  },
  {
    key: "nonni-smart", // Nuovo progetto
    label: "Nonni Smart", // Nuovo progetto
    img: "./lovable-uploads/anziani-connessi.jpg", // Percorso immagine aggiornato
    to: "/projects/nonni-smart", // Nuovo progetto
    description: "Il progetto \"Nonni Smart\" è nato con l'obiettivo di avvicinare le persone anziane al mondo della tecnologia. Attraverso incontri pratici, abbiamo insegnato loro a utilizzare il computer e lo smartphone in modo semplice e sicuro.", // Descrizione in anteprima
    year: "2024/2025" // Anno 2024/2025
  }
];

// Filtri per anni scolastici
const yearTabs = [
  { key: "2024/2025", label: "Anno 2024/2025" },
  { key: "2025/2026", label: "Anno 2025/2026" },
  { key: "2026/2027", label: "Anno 2026/2027" }
];

const Projects: React.FC = () => {
  const [selectedYear, setSelectedYear] = React.useState("2024/2025");
  const navigate = useNavigate();

  // Filtra i progetti in base all'anno selezionato
  const filteredProjects = projects.filter(project => project.year === selectedYear);

  return (
    <section id="projects" className="py-16 md:py-20 lg:py-24 bg-dark-100">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text">Progetti Scolastici</h2>
          <div className="w-16 md:w-20 h-1 bg-accent-purple mx-auto"></div>
        </div>
        
        {/* Filtri per anni scolastici */}
        <div className="flex justify-center mb-8 md:mb-10">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 rounded-lg p-1 ring-1 ring-accent-purple bg-dark-200 shadow-lg">
            {yearTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedYear(tab.key)}
                className={`px-4 sm:px-5 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-md transition-all
                  ${selectedYear === tab.key
                    ? "bg-accent-purple text-white shadow"
                    : "bg-transparent text-gray-300 hover:bg-dark-300 hover:text-accent-purple"
                  }`}
                aria-current={selectedYear === tab.key ? "page" : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Griglia dei progetti */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.key}
                title={project.label}
                img={project.img}
                description={project.description}
                onClick={() => navigate(project.to)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-dark-200 rounded-xl p-6 md:p-8 text-center text-gray-400 shadow-lg max-w-2xl mx-auto">
            <span className="text-accent-purple font-semibold">Nessun progetto disponibile</span> per questo anno scolastico.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
