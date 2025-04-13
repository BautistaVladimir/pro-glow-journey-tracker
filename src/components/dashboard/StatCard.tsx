
import { ReactNode } from 'react';

type StatCardProps = {
  value: string | number;
  label: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'purple' | 'blue' | 'green' | 'orange' | 'teal';
  className?: string;
};

const StatCard = ({ 
  value, 
  label, 
  icon, 
  trend, 
  trendValue,
  color = 'purple',
  className = ''
}: StatCardProps) => {
  const colorClasses = {
    purple: 'text-proglo-purple',
    blue: 'text-proglo-blue',
    green: 'text-proglo-green',
    orange: 'text-proglo-orange',
    teal: 'text-proglo-teal',
  };

  const bgColorClasses = {
    purple: 'bg-proglo-purple/10',
    blue: 'bg-proglo-blue/10',
    green: 'bg-proglo-green/10',
    orange: 'bg-proglo-orange/10',
    teal: 'bg-proglo-teal/10',
  };

  const gradientBorderClasses = {
    purple: 'before:from-proglo-purple before:to-purple-400',
    blue: 'before:from-proglo-blue before:to-blue-400',
    green: 'before:from-proglo-green before:to-green-400',
    orange: 'before:from-proglo-orange before:to-orange-400',
    teal: 'before:from-proglo-teal before:to-teal-400',
  };

  return (
    <div className={`
      fitness-card flex flex-col p-5 relative overflow-hidden transition-all duration-300 
      hover:-translate-y-1 hover:shadow-lg
      before:absolute before:bottom-0 before:left-0 before:h-1 before:w-full
      before:bg-gradient-to-r ${gradientBorderClasses[color]} ${className}
    `}>
      <div className="flex justify-between items-start mb-3">
        <p className="text-gray-600 font-medium">{label}</p>
        {icon && (
          <div className={`p-2 rounded-full ${bgColorClasses[color]} transform transition-transform duration-300 hover:scale-110`}>
            <span className={colorClasses[color]}>{icon}</span>
          </div>
        )}
      </div>
      <div className="flex items-baseline">
        <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
        {trend && trendValue && (
          <span className={`ml-2 text-xs flex items-center ${
            trend === 'up' 
              ? 'text-proglo-green' 
              : trend === 'down' 
                ? 'text-destructive' 
                : 'text-muted-foreground'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {trendValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
