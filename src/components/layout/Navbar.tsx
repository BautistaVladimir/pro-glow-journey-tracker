
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Activity, Apple, Moon, Target, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { NavbarUserMenu } from './navbar/NavbarUserMenu';
import { NavbarLinks } from './navbar/NavbarLinks';
import { NavbarMobileMenu } from './navbar/NavbarMobileMenu';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    setIsMenuOpen(false);
  };
  
  // Define nav items
  const navItems = [
    { path: '/', name: 'Dashboard', icon: <Home size={isMobile ? 20 : 18} /> },
    { path: '/bmi', name: 'BMI', icon: <Activity size={isMobile ? 20 : 18} /> },
    { path: '/activities', name: 'Activities', icon: <Activity size={isMobile ? 20 : 18} /> },
    { path: '/nutrition', name: 'Nutrition', icon: <Apple size={isMobile ? 20 : 18} /> },
    { path: '/sleep', name: 'Sleep', icon: <Moon size={isMobile ? 20 : 18} /> },
    { path: '/goals', name: 'Goals', icon: <Target size={isMobile ? 20 : 18} /> },
  ];

  // Add admin link if user is admin
  if (isAdmin) {
    navItems.push({ path: '/admin', name: 'Admin', icon: <Shield size={isMobile ? 20 : 18} /> });
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative overflow-hidden rounded-full p-1 bg-gradient-to-r from-proglo-purple/80 to-proglo-dark-purple/80 mr-2 transition-all duration-300 group-hover:shadow-glow-purple">
                <img 
                  src="/lovable-uploads/d07601be-d85e-4bba-b589-4ea61e7bcd9f.png" 
                  alt="ProGlo Logo" 
                  className="h-8 w-auto" 
                />
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-proglo-purple to-proglo-dark-purple group-hover:from-proglo-dark-purple group-hover:to-proglo-purple transition-all duration-300">
                Pro-Glo
              </span>
            </Link>
          </div>
          
          {/* Navigation links - desktop */}
          {user && <NavbarLinks navItems={navItems} />}
          
          {/* Right side - auth buttons or user menu */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="hidden md:block">
                <NavbarUserMenu />
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="outline" asChild className="border-purple-200 hover:border-purple-300 hover:bg-purple-50">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-proglo-purple to-proglo-dark-purple hover:shadow-md transition-all duration-300">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="text-foreground hover:bg-purple-50"
              >
                {isMenuOpen ? 
                  <X size={24} className="text-proglo-purple" /> : 
                  <Menu size={24} />
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      <NavbarMobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        navItems={navItems}
        handleLogout={handleLogout}
      />
      
      {/* Fitness-themed decoration - pulsing gradient line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-proglo-purple via-proglo-blue to-proglo-purple bg-[length:200%_100%] animate-gradient"></div>
    </header>
  );
};

export default Navbar;
