import { useState } from 'react';
import { Apple, Droplet, Filter, Utensils, Coffee, FileBarChart } from 'lucide-react';
import NutritionTracker, { NutritionEntry } from '@/components/tracking/NutritionTracker';
import HydrationTracker, { HydrationEntry } from '@/components/tracking/HydrationTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { v4 as uuidv4 } from '@/lib/utils'; // Simulating UUID
import { AuthUser } from '@/types/auth';

// Mock nutrition entries
const mockNutritionEntries: NutritionEntry[] = [
  {
    id: '1',
    food: 'Greek yogurt with berries',
    category: 'dairy',
    portion: 'medium',
    mealTime: 'breakfast',
    date: '2025-04-11',
  },
  {
    id: '2',
    food: 'Chicken salad',
    category: 'proteins',
    portion: 'large',
    mealTime: 'lunch',
    date: '2025-04-11',
  },
  {
    id: '3',
    food: 'Apple',
    category: 'fruits',
    portion: 'medium',
    mealTime: 'snack',
    date: '2025-04-10',
  },
  {
    id: '4',
    food: 'Salmon with vegetables',
    category: 'proteins',
    portion: 'medium',
    mealTime: 'dinner',
    date: '2025-04-10',
  },
];

type NutritionProps = {
  user: AuthUser;
};

const Nutrition = ({ user }: NutritionProps) => {
  const [nutritionEntries, setNutritionEntries] = useState<NutritionEntry[]>(mockNutritionEntries);
  const [hydrationGoal] = useState(2000); // 2000ml (2L) daily goal
  const [currentHydration, setCurrentHydration] = useState(1500); // Current intake in ml
  
  const handleAddNutritionEntry = (entryData: Omit<NutritionEntry, 'id'>) => {
    const newEntry = {
      ...entryData,
      id: uuidv4(),
    };
    
    setNutritionEntries([newEntry, ...nutritionEntries]);
  };
  
  const handleAddWater = (amount: number) => {
    setCurrentHydration(prev => Math.min(prev + amount, hydrationGoal * 1.5)); // Cap at 150% of goal
  };
  
  // Function to get meal distribution
  const getMealDistribution = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = nutritionEntries.filter(entry => entry.date === today);
    
    const distribution = {
      breakfast: todayEntries.filter(entry => entry.mealTime === 'breakfast').length,
      lunch: todayEntries.filter(entry => entry.mealTime === 'lunch').length,
      dinner: todayEntries.filter(entry => entry.mealTime === 'dinner').length,
      snack: todayEntries.filter(entry => entry.mealTime === 'snack').length,
    };
    
    return distribution;
  };
  
  const mealDistribution = getMealDistribution();
  
  return (
    <div className="space-y-8">
      <div className="proglo-section-header">
        <h1 className="text-3xl font-bold proglo-gradient-text flex items-center">
          <Utensils className="mr-2 text-proglo-purple" size={28} />
          Nutrition & Hydration
        </h1>
        <p className="text-gray-600 mt-1">Track your meals and water intake</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-fade-in">
          <NutritionTracker entries={nutritionEntries} onAddEntry={handleAddNutritionEntry} />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <HydrationTracker 
              dailyGoal={hydrationGoal}
              currentIntake={currentHydration}
              onAddWater={handleAddWater}
            />
          </div>
          
          <Card className="proglo-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="proglo-card-header">
              <CardTitle className="text-lg font-semibold flex items-center">
                <FileBarChart size={18} className="mr-2 text-proglo-purple" />
                Today's Meal Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(mealDistribution).map(([meal, count]) => (
                  <div key={meal} className="bg-purple-50 p-3 rounded-lg border border-purple-100 text-center">
                    <div className="mb-1">
                      {meal === 'breakfast' && <Coffee size={18} className="inline text-orange-500 mr-1" />}
                      {meal === 'lunch' && <Utensils size={18} className="inline text-green-500 mr-1" />}
                      {meal === 'dinner' && <Utensils size={18} className="inline text-blue-500 mr-1" />}
                      {meal === 'snack' && <Apple size={18} className="inline text-red-500 mr-1" />}
                    </div>
                    <p className="text-sm font-medium capitalize">{meal}</p>
                    <p className="text-lg font-bold text-proglo-purple">{count}</p>
                    <p className="text-xs text-gray-500">{count === 1 ? 'item' : 'items'}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-3 bg-blue-50 rounded-md border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 flex items-center">
                  <Filter size={16} className="mr-1" />
                  Nutrition Tips
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Try to include protein with every meal and aim for at least 5 servings of fruits and vegetables daily. 
                  Stay hydrated by drinking water throughout the day.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
