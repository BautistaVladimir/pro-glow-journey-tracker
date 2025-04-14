
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NavItem {
  path: string;
  name: string;
  icon: ReactNode;
  description?: string;
}

interface NavbarLinksProps {
  navItems: NavItem[];
}

export const NavbarLinks = ({ navItems }: NavbarLinksProps) => {
  const location = useLocation();
  
  return (
    <div className="hidden md:flex items-center space-x-1">
      {navItems.map((item) => (
        <TooltipProvider key={item.path} delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center 
                          transition-all duration-200 hover:scale-105 ${
                            location.pathname === item.path
                              ? 'text-white bg-gradient-to-r from-proglo-purple to-proglo-dark-purple shadow-sm'
                              : 'text-foreground hover:bg-purple-50 hover:text-proglo-purple'
                          }`}
              >
                <span className={`mr-1.5 ${location.pathname === item.path ? 'animate-pulse-slow' : ''}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            </TooltipTrigger>
            {item.description && (
              <TooltipContent side="bottom" className="bg-proglo-dark-purple text-white border-none">
                <p>{item.description}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};
