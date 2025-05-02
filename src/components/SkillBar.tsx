import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons'; // Import IconType for typing

interface SkillBarProps {
  skill: string;
  percentage: number;
  icon: IconType; // Add icon prop
  isVisible: boolean; // Prop to trigger animation
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, percentage, icon: Icon, isVisible }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Trigger the animation when the component is visible
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, 150); // Slightly increased delay for better visual effect with icons
      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage]);

  return (
    <div className="mb-5"> {/* Increased margin-bottom slightly */}
      <div className="flex justify-between items-center mb-1.5"> {/* Added items-center and increased margin */}
        <div className="flex items-center gap-2"> {/* Container for icon and skill name */}
          <Icon className="text-accent-purple" size={20} /> {/* Render the icon */}
          <span className="text-base font-medium text-gray-200">{skill}</span>
        </div>
        <span className="text-sm font-medium text-accent-blue">{width}%</span>
      </div>
      <div className="w-full bg-dark-300 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-accent-purple to-accent-blue h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        >
        </div>
      </div>
    </div>
  );
};

export default SkillBar;

