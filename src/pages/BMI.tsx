
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import BMICalculator from '@/components/bmi/BMICalculator';
import ProgressChart from '@/components/charts/ProgressChart';
import { AuthUser } from '@/contexts/AuthContext';

type BMIProps = {
  user: AuthUser | null;
  setUser: (user: any) => void;
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
      ...user,
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
      <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
        <h1 className="text-3xl font-bold text-proglo-purple">BMI Tracker</h1>
        <p className="text-muted-foreground mt-1">Monitor your Body Mass Index over time</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-fade-in">
          <BMICalculator user={user} onSave={handleSave} />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Card className="overflow-hidden border border-purple-100 shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-proglo-purple">Progress History</h3>
              <ProgressChart 
                data={bmiHistory}
                label="BMI History"
                color="#9b87f5"
              />
              
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="bg-purple-50 p-3 rounded-md border border-purple-100">
                  <p className="text-xs text-muted-foreground">Underweight</p>
                  <p className="text-sm font-medium">Below 18.5</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-md border border-purple-100">
                  <p className="text-xs text-muted-foreground">Healthy Weight</p>
                  <p className="text-sm font-medium">18.5 - 24.9</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-md border border-purple-100">
                  <p className="text-xs text-muted-foreground">Overweight</p>
                  <p className="text-sm font-medium">25 - 29.9</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-md border border-purple-100 col-span-2 sm:col-span-1">
                  <p className="text-xs text-muted-foreground">Obese</p>
                  <p className="text-sm font-medium">30 or higher</p>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Note: BMI is a screening tool, not a diagnostic tool. Consult with a healthcare 
                provider to evaluate your overall health and risks.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BMI;
