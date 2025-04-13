
import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';

const BMISummary = () => {
  return (
    <DashboardCard 
      title="BMI" 
      icon={<Activity size={18} />}
      className="border-purple-100 card-hover-effect"
    >
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-50 border-4 border-proglo-light-purple mb-4">
          <span className="text-3xl font-bold text-proglo-purple">22.8</span>
        </div>
        <div className="text-proglo-green font-medium">Healthy Weight</div>
        <div className="mt-4 text-sm text-gray-500">
          Your BMI indicates you're at a healthy weight for your height
        </div>
        <div className="mt-4">
          <Link to="/bmi">
            <Button variant="outline" size="sm" className="border-proglo-purple text-proglo-purple hover:bg-proglo-purple hover:text-white">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </DashboardCard>
  );
};

export default BMISummary;
