
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/d07601be-d85e-4bba-b589-4ea61e7bcd9f.png" 
                alt="ProGlo Logo" 
                className="h-8 w-auto mr-2"
              />
              <span className="text-base font-bold bg-clip-text text-transparent bg-purple-gradient">
                Pro-Glo
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">Your Progress, Your Glo</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:space-x-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-proglo-purple mb-2 sm:mb-0">
              Dashboard
            </Link>
            <Link to="/bmi" className="text-sm text-muted-foreground hover:text-proglo-purple mb-2 sm:mb-0">
              BMI Tracker
            </Link>
            <Link to="/profile" className="text-sm text-muted-foreground hover:text-proglo-purple">
              Profile
            </Link>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pro-Glo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
