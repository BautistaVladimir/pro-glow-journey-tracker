
import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Skeleton } from '@/components/ui/skeleton';

type BMISummaryProps = {
  bmiData?: {
    bmi_value: number;
    category: string;
  } | null;
  isLoading?: boolean;
};

const BMISummary = ({ bmiData, isLoading = false }: BMISummaryProps) => {
  const bmiValue = bmiData?.bmi_value || 22.8;
  const bmiCategory = bmiData?.category || 'Healthy Weight';
  
  return (
    <DashboardCard 
      title="BMI" 
      icon={<Activity size={18} />}
      className="border-purple-100 card-hover-effect"
    >
      <div className="text-center py-8">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="w-24 h-24 rounded-full" />
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-48 h-4" />
          </div>
        ) : (
          <>
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-50 border-4 border-proglo-light-purple mb-4">
              <span className="text-3xl font-bold text-proglo-purple">{bmiValue.toFixed(1)}</span>
            </div>
            <div className="text-proglo-green font-medium">{bmiCategory}</div>
            <div className="mt-4 text-sm text-gray-500">
              Your BMI indicates you're at a {bmiCategory.toLowerCase()} for your height
            </div>
            <div className="mt-4">
              <Link to="/bmi">
                <Button variant="outline" size="sm" className="border-proglo-purple text-proglo-purple hover:bg-proglo-purple hover:text-white">
                  View Details
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </DashboardCard>
  );
};

export default BMISummary;
