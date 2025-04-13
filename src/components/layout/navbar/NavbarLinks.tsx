
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  name: string;
  icon: ReactNode;
}

interface NavbarLinksProps {
  navItems: NavItem[];
}

export const NavbarLinks = ({ navItems }: NavbarLinksProps) => {
  const location = useLocation();
  
  return (
    <div className="hidden md:flex items-center space-x-1">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-3 py-2 rounded-md text-sm font-medium flex items-center 
                     transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'text-white bg-gradient-to-r from-proglo-purple to-proglo-dark-purple shadow-sm'
                        : 'text-foreground hover:bg-purple-50 hover:text-proglo-purple'
                     }`}
        >
          <span className="mr-1.5">{item.icon}</span>
          {item.name}
        </Link>
      ))}
    </div>
  );
};
