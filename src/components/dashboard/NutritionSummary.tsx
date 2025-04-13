
import { Apple } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Card } from '@/components/ui/card';

const NutritionSummary = () => {
  return (
    <DashboardCard 
      title="Nutrition Summary" 
      icon={<Apple size={18} />}
      className="border-purple-100 card-hover-effect"
    >
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-gradient-to-b from-purple-50 to-white p-3 rounded-lg text-center border border-purple-100">
            <p className="text-sm text-gray-600">Proteins</p>
            <p className="font-semibold text-lg text-proglo-purple">32%</p>
          </Card>
          <Card className="bg-gradient-to-b from-purple-50 to-white p-3 rounded-lg text-center border border-purple-100">
            <p className="text-sm text-gray-600">Carbs</p>
            <p className="font-semibold text-lg text-proglo-purple">48%</p>
          </Card>
          <Card className="bg-gradient-to-b from-purple-50 to-white p-3 rounded-lg text-center border border-purple-100">
            <p className="text-sm text-gray-600">Fats</p>
            <p className="font-semibold text-lg text-proglo-purple">20%</p>
          </Card>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Apple size={16} className="text-green-500 mr-2" />
              <span className="text-sm font-medium">Last Meal:</span>
            </div>
            <span className="text-sm text-gray-600">2 hours ago</span>
          </div>
          <p className="text-sm mt-1">Greek yogurt with berries</p>
        </div>
        <div className="mt-4 text-center">
          <Link to="/nutrition">
            <Button variant="link" size="sm" className="text-proglo-purple">View Nutrition Log</Button>
          </Link>
        </div>
      </div>
    </DashboardCard>
  );
};

export default NutritionSummary;
