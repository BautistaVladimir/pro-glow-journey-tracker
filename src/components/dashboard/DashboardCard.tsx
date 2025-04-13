
import { ReactNode } from 'react';

type DashboardCardProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

const DashboardCard = ({ title, icon, children, className = '' }: DashboardCardProps) => {
  return (
    <div className={`fitness-card ${className}`}>
      <div className="p-5 flex items-center border-b border-purple-100">
        {icon && <div className="mr-2 text-proglo-purple">{icon}</div>}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default DashboardCard;
