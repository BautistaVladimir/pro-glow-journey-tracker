
import { ReactNode } from 'react';

type StatCardProps = {
  value: string | number;
  label: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'purple' | 'blue' | 'green' | 'orange' | 'teal';
};

const StatCard = ({ 
  value, 
  label, 
  icon, 
  trend, 
  trendValue,
  color = 'purple'
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

  return (
    <div className="proglo-card flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <p className="stat-label">{label}</p>
        {icon && (
          <div className={`p-2 rounded-full ${bgColorClasses[color]}`}>
            <span className={colorClasses[color]}>{icon}</span>
          </div>
        )}
      </div>
      <div className="flex items-baseline">
        <p className={`stat-value ${colorClasses[color]}`}>{value}</p>
        {trend && trendValue && (
          <span className={`ml-2 text-xs ${
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
