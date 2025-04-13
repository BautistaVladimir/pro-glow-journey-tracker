
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  path: string;
  name: string;
  icon: ReactNode;
}

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  handleLogout: () => void;
}

export const NavbarMobileMenu = ({ isOpen, onClose, navItems, handleLogout }: NavbarMobileMenuProps) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden animate-fade-in bg-white border-b border-purple-100 shadow-lg">
      <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3">
        {user ? (
          <>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-2.5 rounded-lg text-base font-medium flex items-center 
                           transition-colors duration-200 hover:bg-purple-50 hover:text-proglo-purple 
                           active:bg-proglo-purple/10 active:scale-98"
                onClick={onClose}
              >
                <span className="mr-3 text-proglo-purple">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            <Link
              to="/profile"
              className="block px-4 py-2.5 rounded-lg text-base font-medium flex items-center 
                       transition-colors duration-200 hover:bg-purple-50 hover:text-proglo-purple 
                       active:bg-proglo-purple/10 active:scale-98"
              onClick={onClose}
            >
              <User size={18} className="mr-3 text-proglo-purple" />
              <span className="font-medium">Profile</span>
            </Link>

            <button
              className="w-full text-left block px-4 py-2.5 rounded-lg text-base flex items-center 
                        transition-colors duration-200 hover:bg-red-50 hover:text-destructive 
                        active:bg-red-50/30 active:scale-98"
              onClick={() => {
                handleLogout();
                onClose();
              }}
            >
              <LogOut size={18} className="mr-3 text-destructive" />
              <span className="font-medium">Log out</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col space-y-3 p-3">
            <Button asChild variant="outline" className="justify-center">
              <Link to="/login" onClick={onClose}>Log in</Link>
            </Button>
            <Button asChild className="justify-center bg-gradient-to-r from-proglo-purple to-proglo-dark-purple hover:shadow-md">
              <Link to="/register" onClick={onClose}>Register</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
