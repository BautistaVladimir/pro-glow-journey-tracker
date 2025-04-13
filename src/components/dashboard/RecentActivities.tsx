
import { Activity, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';

const RecentActivities = () => {
  return (
    <DashboardCard 
      title="Recent Activities" 
      icon={<Activity size={18} />}
      className="border-purple-100 card-hover-effect"
    >
      <div className="space-y-3 p-4">
        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors">
          <div className="flex items-center">
            <div className="bg-proglo-purple rounded-md p-2 mr-3">
              <Activity size={16} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Running</p>
              <p className="text-sm text-gray-600">30 min • High intensity</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">Today</div>
        </div>
        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors">
          <div className="flex items-center">
            <div className="bg-proglo-purple rounded-md p-2 mr-3">
              <Award size={16} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Strength Training</p>
              <p className="text-sm text-gray-600">45 min • Medium intensity</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">Yesterday</div>
        </div>
        <div className="mt-4 text-center">
          <Link to="/activities">
            <Button variant="link" size="sm" className="text-proglo-purple">View All Activities</Button>
          </Link>
        </div>
      </div>
    </DashboardCard>
  );
};

export default RecentActivities;
