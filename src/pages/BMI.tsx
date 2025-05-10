import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import BMICalculator from '@/components/bmi/BMICalculator';
import ProgressChart from '@/components/charts/ProgressChart';
import { AuthUser } from '@/types/auth';
import { Activity, TrendingDown, Award, Info } from 'lucide-react';

type BMIProps = {
  user: AuthUser | null;
  setUser: (userData: Partial<AuthUser>) => Promise<AuthUser | undefined>;
};

// Mock BMI history data
const mockBMIHistory = [
  { date: '2025-03-15', value: 23.5 },
  { date: '2025-03-22', value: 23.2 },
  { date: '2025-03-29', value: 22.9 },
  { date: '2025-04-05', value: 22.8 },
  { date: '2025-04-11', value: 22.7 },
];

const BMI = ({ user, setUser }: BMIProps) => {
  const [bmiHistory, setBMIHistory] = useState(mockBMIHistory);
  
  const handleSave = (height: number, weight: number, bmi: number) => {
    if (!user) return;
    
    // Update user data
    setUser({
      height,
      weight,
    });
    
    // Add new BMI record
    const today = new Date().toISOString().split('T')[0];
    
    // Check if we already have a record for today
    const existingTodayIndex = bmiHistory.findIndex(record => record.date === today);
    
    if (existingTodayIndex >= 0) {
      // Update today's record
      const updatedHistory = [...bmiHistory];
      updatedHistory[existingTodayIndex] = { date: today, value: bmi };
      setBMIHistory(updatedHistory);
    } else {
      // Add new record
      setBMIHistory([...bmiHistory, { date: today, value: bmi }]);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="proglo-section-header">
        <h1 className="text-3xl font-bold proglo-gradient-text flex items-center">
          <Activity className="mr-2 text-proglo-purple" size={28} />
          BMI Tracker
        </h1>
        <p className="text-gray-600 mt-1">Monitor your Body Mass Index over time</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-fade-in">
          <BMICalculator user={user} onSave={handleSave} />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Card className="overflow-hidden border-purple-100 shadow-md proglo-card">
            <div className="proglo-card-header">
              <h3 className="text-xl font-semibold proglo-gradient-text flex items-center">
                <TrendingDown className="mr-2" size={18} />
                Progress History
              </h3>
            </div>
            <CardContent className="pt-6">
              <ProgressChart 
                data={bmiHistory}
                label="BMI History"
                color="#9b87f5"
                height={220}
              />
              
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gradient-to-b from-blue-50 to-white p-3 rounded-md border border-blue-100 text-center">
                  <p className="text-xs text-gray-600">Underweight</p>
                  <p className="text-sm font-medium text-blue-600">Below 18.5</p>
                </div>
                <div className="bg-gradient-to-b from-green-50 to-white p-3 rounded-md border border-green-100 text-center">
                  <Award className="h-3 w-3 mx-auto mb-1 text-green-600" />
                  <p className="text-xs text-gray-600">Healthy Weight</p>
                  <p className="text-sm font-medium text-green-600">18.5 - 24.9</p>
                </div>
                <div className="bg-gradient-to-b from-orange-50 to-white p-3 rounded-md border border-orange-100 text-center">
                  <p className="text-xs text-gray-600">Overweight</p>
                  <p className="text-sm font-medium text-orange-600">25 - 29.9</p>
                </div>
                <div className="bg-gradient-to-b from-red-50 to-white p-3 rounded-md border border-red-100 text-center">
                  <p className="text-xs text-gray-600">Obese</p>
                  <p className="text-sm font-medium text-red-600">30 or higher</p>
                </div>
              </div>
              
              <div className="mt-6 flex items-start p-3 bg-blue-50 rounded-md border border-blue-100">
                <Info className="h-5 w-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600">
                  BMI is a screening tool, not a diagnostic tool. Consult with a healthcare 
                  provider to evaluate your overall health and risks. BMI doesn't differentiate
                  between muscle and fat, and may not be accurate for athletes, elderly, or pregnant women.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BMI;
