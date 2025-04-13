
import { Weight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import ProgressChart from '@/components/charts/ProgressChart';

type WeightTrackerProps = {
  data: Array<{
    date: string;
    value: number;
  }>;
};

const WeightTracker = ({ data }: WeightTrackerProps) => {
  return (
    <DashboardCard 
      title="Weight Tracking" 
      icon={<Weight size={18} />}
      className="border-purple-100 card-hover-effect"
    >
      <div className="p-4">
        <ProgressChart 
          data={data}
          label="Weight (kg)"
          color="#7c3aed"
          unit="kg"
        />
        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex items-center text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span>-1.3kg this week</span>
          </div>
          <Link to="/bmi">
            <Button variant="link" size="sm" className="text-proglo-purple p-0">
              View Full History
            </Button>
          </Link>
        </div>
      </div>
    </DashboardCard>
  );
};

export default WeightTracker;
