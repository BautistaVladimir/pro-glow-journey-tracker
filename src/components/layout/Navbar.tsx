
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Home, Activity, Apple, Droplet, Moon, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type NavbarProps = {
  user: {
    name: string;
    avatar: string | null;
  };
};

const Navbar = ({ user }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const navItems = [
    { path: '/', name: 'Dashboard', icon: <Home size={18} /> },
    { path: '/bmi', name: 'BMI', icon: <Activity size={18} /> },
    { path: '/activities', name: 'Activities', icon: <Activity size={18} /> },
    { path: '/nutrition', name: 'Nutrition', icon: <Apple size={18} /> },
    { path: '/sleep', name: 'Sleep', icon: <Moon size={18} /> },
    { path: '/goals', name: 'Goals', icon: <Target size={18} /> },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-proglo-purple flex items-center justify-center mr-2">
                <span className="text-white font-bold">PG</span>
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-purple-gradient">Pro-Glo</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  location.pathname === item.path
                    ? 'text-proglo-purple bg-muted'
                    : 'text-foreground hover:bg-muted hover:text-proglo-purple'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center">
            <Link to="/profile">
              <Avatar className="h-8 w-8 cursor-pointer">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <AvatarFallback className="bg-proglo-purple text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>
          </div>
          
          <div className="flex md:hidden items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  location.pathname === item.path
                    ? 'text-white bg-proglo-purple'
                    : 'text-foreground hover:bg-muted hover:text-proglo-purple'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium flex items-center text-foreground hover:bg-muted hover:text-proglo-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={18} className="mr-2" />
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
