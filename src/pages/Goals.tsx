import { useState } from 'react';
import GoalSetting, { Goal } from '@/components/goals/GoalSetting';
import { v4 as uuidv4 } from '@/lib/utils'; // Simulating UUID
import { AuthUser } from '@/contexts/AuthContext';

// Mock goals
const mockGoals: Goal[] = [
  {
    id: '1',
    type: 'weight',
    target: 68,
    unit: 'kg',
    deadline: '2025-08-01',
    currentValue: 71,
  },
  {
    id: '2',
    type: 'workout',
    target: 5,
    unit: 'sessions',
    currentValue: 3,
  },
  {
    id: '3',
    type: 'hydration',
    target: 8,
    unit: 'glasses',
    currentValue: 6,
  },
];

type GoalsProps = {
  user: AuthUser;
};

const Goals = ({ user }: GoalsProps) => {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  
  const handleAddGoal = (goalData: Omit<Goal, 'id'>) => {
    const newGoal = {
      ...goalData,
      id: uuidv4(),
    };
    
    setGoals([newGoal, ...goals]);
  };
  
  const handleUpdateGoal = (id: string, currentValue: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, currentValue } : goal
    ));
  };
  
  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Goals</h1>
        <p className="text-muted-foreground mt-1">Set and track your health and fitness goals</p>
      </div>
      
      <GoalSetting 
        goals={goals}
        onAddGoal={handleAddGoal}
        onUpdateGoal={handleUpdateGoal}
        onDeleteGoal={handleDeleteGoal}
      />
    </div>
  );
};

export default Goals;
