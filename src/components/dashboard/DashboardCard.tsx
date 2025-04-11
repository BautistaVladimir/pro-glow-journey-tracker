
import { ReactNode } from 'react';

type DashboardCardProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

const DashboardCard = ({ title, icon, children, className = '' }: DashboardCardProps) => {
  return (
    <div className={`proglo-card ${className}`}>
      <div className="flex items-center mb-4">
        {icon && <div className="mr-2 text-proglo-purple">{icon}</div>}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardCard;
