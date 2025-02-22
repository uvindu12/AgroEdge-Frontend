import { useState } from "react";
import { CloudMoon, BarChart3, Users, ChartNoAxesColumn, BookOpenText, Droplets } from "lucide-react";

// Icon mapping object
const iconMapping = {
  weather: CloudMoon,
  chart: BarChart3,
  users: Users,
  link: ChartNoAxesColumn,
  cart: BookOpenText,
  laptop: Droplets
};

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 ${className || ''}`}>
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link || idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Hover Effect */}
          <div
            className={`absolute inset-0 h-full w-full bg-green-300 dark:bg-slate-800/50 rounded-3xl transition-opacity duration-300 ${
              hoveredIndex === idx ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Card Content */}
          <Card>
            <CardIcon icon={item.icon} />
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={`rounded-2xl h-full w-full p-4 overflow-hidden bg-white/50 dark:bg-slate-900/50 border border-gray-600 dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 backdrop-blur-lg transition-colors duration-300 ${className || ''}`}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardIcon = ({ icon, className }) => {
  const IconComponent = iconMapping[icon];
  return IconComponent ? (
    <div className={`flex justify-center ${className || ''}`}>
      <IconComponent className="w-8 h-8 text-gray-600 dark:text-gray-400" />
    </div>
  ) : null;
};

export const CardTitle = ({ className, children }) => {
  return <h4 className={`text-black dark:text-white font-bold tracking-wide mt-4 text-center ${className || ''}`}>{children}</h4>;
};

export const CardDescription = ({ className, children }) => {
  return <p className={`mt-8 text-gray-500 dark:text-gray-400 tracking-wide leading-relaxed text-sm text-center ${className || ''}`}>{children}</p>;
};
