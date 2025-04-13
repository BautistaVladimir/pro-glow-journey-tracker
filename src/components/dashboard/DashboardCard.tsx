
import { ReactNode } from 'react';

type DashboardCardProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

const DashboardCard = ({ title, icon, children, className = '' }: DashboardCardProps) => {
  return (
    <div className={`fitness-card group transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="p-5 flex items-center border-b border-purple-100 bg-gradient-to-r from-white to-purple-50">
        {icon && <div className="mr-2.5 text-proglo-purple group-hover:scale-110 transition-transform duration-300">{icon}</div>}
        <h3 className="font-semibold text-gray-800 group-hover:text-proglo-purple transition-colors duration-300">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};

export default DashboardCard;
