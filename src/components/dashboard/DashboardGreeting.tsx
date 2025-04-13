
import { Link } from 'react-router-dom';
import { Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DashboardGreetingProps = {
  name: string;
};

const DashboardGreeting = ({ name }: DashboardGreetingProps) => {
  // Time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100 shadow-sm animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="proglo-gradient-text">{getGreeting()}, {name || 'User'}!</span>
          </h1>
          <p className="text-gray-600 mt-1">Your wellness journey awaits.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/goals">
            <Button className="bg-proglo-purple hover:bg-proglo-dark-purple shadow-sm hover:shadow">
              <Target size={18} className="mr-2" />
              Set New Goals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardGreeting;
