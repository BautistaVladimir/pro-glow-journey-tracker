
import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook, Youtube, Dumbbell } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/d07601be-d85e-4bba-b589-4ea61e7bcd9f.png" 
                alt="ProGlo Logo" 
                className="h-12 w-auto mr-3 hover-scale"
              />
              <div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-purple-gradient">
                  Pro-Glo
                </span>
                <p className="text-sm text-gray-600">Your fitness journey, your glow-up</p>
              </div>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-6">
            <div className="flex flex-col space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                <Dumbbell size={16} className="mr-2 text-proglo-purple" />
                Navigation
              </h3>
              <Link to="/" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors hover:translate-x-1 duration-200 flex items-center">
                Dashboard
              </Link>
              <Link to="/bmi" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors hover:translate-x-1 duration-200 flex items-center">
                BMI Tracker
              </Link>
              <Link to="/activities" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors hover:translate-x-1 duration-200 flex items-center">
                Activities
              </Link>
            </div>
            
            <div className="flex flex-col space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                <Dumbbell size={16} className="mr-2 text-proglo-purple" />
                Features
              </h3>
              <Link to="/nutrition" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors hover:translate-x-1 duration-200 flex items-center">
                Nutrition
              </Link>
              <Link to="/sleep" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors hover:translate-x-1 duration-200 flex items-center">
                Sleep
              </Link>
              <Link to="/goals" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors hover:translate-x-1 duration-200 flex items-center">
                Goals
              </Link>
            </div>
            
            <div className="flex flex-col space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                <Dumbbell size={16} className="mr-2 text-proglo-purple" />
                Account
              </h3>
              <Link to="/profile" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors hover:translate-x-1 duration-200 flex items-center">
                Profile
              </Link>
              <Link to="/login" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors hover:translate-x-1 duration-200 flex items-center">
                Login
              </Link>
              <Link to="/register" className="text-sm text-gray-600 hover:text-proglo-purple transition-colors hover:translate-x-1 duration-200 flex items-center">
                Register
              </Link>
            </div>
            
            <div className="flex flex-col space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                <Dumbbell size={16} className="mr-2 text-proglo-purple" />
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-proglo-purple transition-colors hover:scale-110 duration-200">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-proglo-purple transition-colors hover:scale-110 duration-200">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-proglo-purple transition-colors hover:scale-110 duration-200">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-proglo-purple transition-colors hover:scale-110 duration-200">
                  <Youtube size={20} />
                </a>
              </div>
              
              <div className="mt-4 bg-purple-50 p-3 rounded-lg border border-purple-100">
                <p className="text-xs text-gray-600">Join our community for fitness tips, nutrition advice, and motivation!</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-sm text-gray-500 mb-4 md:mb-0">
              © {currentYear} Pro-Glo Health Tracker. All rights reserved.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              Made with <Heart size={14} className="mx-1 text-red-500 animate-heartbeat" /> by Lovable
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
