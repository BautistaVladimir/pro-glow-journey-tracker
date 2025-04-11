
import { useState } from 'react';
import NutritionTracker, { NutritionEntry } from '@/components/tracking/NutritionTracker';
import HydrationTracker, { HydrationEntry } from '@/components/tracking/HydrationTracker';
import { v4 as uuidv4 } from '@/lib/utils'; // Simulating UUID

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
  user: {
    name: string;
  };
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
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Nutrition & Hydration</h1>
        <p className="text-muted-foreground mt-1">Track your meals and water intake</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NutritionTracker entries={nutritionEntries} onAddEntry={handleAddNutritionEntry} />
        </div>
        
        <div className="lg:col-span-1">
          <HydrationTracker 
            dailyGoal={hydrationGoal}
            currentIntake={currentHydration}
            onAddWater={handleAddWater}
          />
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
