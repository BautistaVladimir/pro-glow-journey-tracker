
import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/d07601be-d85e-4bba-b589-4ea61e7bcd9f.png" 
                alt="ProGlo Logo" 
                className="h-10 w-auto mr-2 hover-scale"
              />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-purple-gradient">
                Pro-Glo
              </span>
            </Link>
            <p className="text-sm text-gray-600 mt-1">Your Progress, Your Glo</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4">
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">Navigation</h3>
              <Link to="/" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors">
                Dashboard
              </Link>
              <Link to="/bmi" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors">
                BMI Tracker
              </Link>
              <Link to="/activities" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors">
                Activities
              </Link>
            </div>
            
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">Features</h3>
              <Link to="/nutrition" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors">
                Nutrition
              </Link>
              <Link to="/sleep" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors">
                Sleep
              </Link>
              <Link to="/goals" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors">
                Goals
              </Link>
            </div>
            
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">Account</h3>
              <Link to="/profile" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors">
                Profile
              </Link>
              <Link to="/login" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors">
                Register
              </Link>
            </div>
            
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">Social</h3>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-600 hover:text-proglo-purple transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-gray-600 hover:text-proglo-purple transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-gray-600 hover:text-proglo-purple transition-colors">
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-xs text-gray-600 mb-2 md:mb-0">
              © {currentYear} Pro-Glo. All rights reserved.
            </p>
            <div className="flex items-center text-xs text-gray-600">
              Made with <Heart size={12} className="mx-1 text-red-500" /> by Lovable
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
