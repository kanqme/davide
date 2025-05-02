import React from "react";

interface ProjectCardProps {
  title: string;
  img: string;
  description: string;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, img, description, onClick }) => {
  return (
    <div className="bg-dark-200 rounded-xl overflow-hidden shadow-lg border border-accent-purple/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent-purple/20 hover:scale-[1.02] h-full">
      <div 
        onClick={onClick}
        className="cursor-pointer h-full flex flex-col"
      >
        <div className="w-full h-48 overflow-hidden bg-dark-300">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
            draggable={false}
          />
        </div>
        <div className="p-4 md:p-6 flex-grow flex flex-col">
          <h3 className="text-lg md:text-xl font-bold text-accent-purple mb-2 md:mb-3 transition-colors duration-300 hover:text-accent-blue">{title}</h3>
          <p className="text-gray-300 text-xs md:text-sm flex-grow">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
