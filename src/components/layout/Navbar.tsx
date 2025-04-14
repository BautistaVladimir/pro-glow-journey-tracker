
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Home, Activity, Apple, Moon, Target, Shield, 
  Dumbbell, ChevronDown, Heart 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { NavbarUserMenu } from './navbar/NavbarUserMenu';
import { NavbarLinks } from './navbar/NavbarLinks';
import { NavbarMobileMenu } from './navbar/NavbarMobileMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    setIsMenuOpen(false);
  };
  
  // Define nav items with enhanced icons and active indicators
  const navItems = [
    { 
      path: '/', 
      name: 'Dashboard', 
      icon: <Home size={isMobile ? 22 : 18} className="transition-all" />,
      description: "Overview of your fitness journey"
    },
    { 
      path: '/bmi', 
      name: 'BMI', 
      icon: <Heart size={isMobile ? 22 : 18} className="transition-all" />,
      description: "Calculate your body mass index"
    },
    { 
      path: '/activities', 
      name: 'Activities', 
      icon: <Dumbbell size={isMobile ? 22 : 18} className="transition-all" />,
      description: "Track your workouts and activities" 
    },
    { 
      path: '/nutrition', 
      name: 'Nutrition', 
      icon: <Apple size={isMobile ? 22 : 18} className="transition-all" />,
      description: "Monitor your diet and nutrition" 
    },
    { 
      path: '/sleep', 
      name: 'Sleep', 
      icon: <Moon size={isMobile ? 22 : 18} className="transition-all" />,
      description: "Track your sleep patterns" 
    },
    { 
      path: '/goals', 
      name: 'Goals', 
      icon: <Target size={isMobile ? 22 : 18} className="transition-all" />,
      description: "Set and monitor your fitness goals"
    },
  ];

  // Add admin link if user is admin
  if (isAdmin) {
    navItems.push({ 
      path: '/admin', 
      name: 'Admin', 
      icon: <Shield size={isMobile ? 22 : 18} className="transition-all" />,
      description: "Administrator controls"
    });
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and brand with enhanced animation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative overflow-hidden rounded-full p-1 bg-gradient-to-r from-proglo-purple/80 to-proglo-dark-purple/80 mr-2 transition-all duration-500 
                              group-hover:shadow-glow-purple group-hover:scale-105">
                <img 
                  src="/lovable-uploads/d07601be-d85e-4bba-b589-4ea61e7bcd9f.png" 
                  alt="ProGlo Logo" 
                  className="h-12 w-auto" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-proglo-purple to-proglo-dark-purple 
                                group-hover:from-proglo-dark-purple group-hover:to-proglo-purple transition-all duration-300">
                  Pro-Glo
                </span>
                <span className="text-xs text-muted-foreground hidden sm:inline-block">
                  Fitness Journey Tracker
                </span>
              </div>
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
            
            {/* Enhanced Mobile menu using Sheet component */}
            {user ? (
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Menu"
                      className="text-foreground hover:bg-purple-50 relative"
                    >
                      <Menu size={24} className="text-proglo-purple" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-proglo-purple text-[10px] text-white">
                        {navItems.length}
                      </span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[85%] max-w-sm bg-white p-0 shadow-lg">
                    <div className="flex h-16 items-center px-4 border-b border-purple-100">
                      <div className="flex items-center space-x-2">
                        <div className="rounded-full bg-gradient-to-r from-proglo-purple to-proglo-dark-purple p-1">
                          <img 
                            src="/lovable-uploads/d07601be-d85e-4bba-b589-4ea61e7bcd9f.png" 
                            alt="ProGlo Logo" 
                            className="h-8 w-auto"
                          />
                        </div>
                        <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-proglo-purple to-proglo-dark-purple">
                          Pro-Glo
                        </span>
                      </div>
                    </div>
                    
                    {/* User profile section */}
                    <div className="px-4 py-6 border-b border-purple-100">
                      <NavbarUserMenu onMobileClose={() => setIsMenuOpen(false)} />
                    </div>
                    
                    <div className="flex flex-col py-2 overflow-y-auto">
                      <div className="px-4 py-2">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Navigation</h3>
                      </div>
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-start px-4 py-3 ${
                            location.pathname === item.path
                              ? 'bg-purple-50 text-proglo-purple'
                              : 'hover:bg-purple-50/50'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className={`mr-3 mt-0.5 rounded-md p-1.5 ${
                            location.pathname === item.path
                              ? 'bg-proglo-purple/10 text-proglo-purple'
                              : 'text-muted-foreground'
                          }`}>
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                      
                      <Separator className="my-2" />
                      
                      <button
                        className="flex items-start px-4 py-3 hover:bg-red-50/50 text-left"
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className="mr-3 mt-0.5 rounded-md p-1.5 text-destructive">
                          <X size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-destructive">Log out</h4>
                          <p className="text-xs text-muted-foreground">Sign out of your account</p>
                        </div>
                      </button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            ) : (
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Menu"
                      className="text-foreground hover:bg-purple-50"
                    >
                      <Menu size={24} className="text-proglo-purple" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[85%] max-w-sm bg-white p-0">
                    <div className="flex h-16 items-center px-4 border-b border-purple-100">
                      <div className="flex items-center space-x-2">
                        <div className="rounded-full bg-gradient-to-r from-proglo-purple to-proglo-dark-purple p-1">
                          <img 
                            src="/lovable-uploads/d07601be-d85e-4bba-b589-4ea61e7bcd9f.png" 
                            alt="ProGlo Logo" 
                            className="h-8 w-auto"
                          />
                        </div>
                        <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-proglo-purple to-proglo-dark-purple">
                          Pro-Glo
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 p-4">
                      <Button asChild variant="outline" className="w-full justify-center">
                        <Link to="/login">Log in</Link>
                      </Button>
                      <Button asChild className="w-full justify-center bg-gradient-to-r from-proglo-purple to-proglo-dark-purple">
                        <Link to="/register">Register</Link>
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Progress indicator animation at bottom */}
      <div className="h-0.5 w-full bg-gradient-to-r from-proglo-purple via-proglo-blue to-proglo-purple bg-[length:200%_100%] animate-gradient"></div>
    </header>
  );
};

export default Navbar;
