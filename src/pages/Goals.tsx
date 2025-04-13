
import { useState } from 'react';
import { Target, Award, Check, TrendingUp, Calendar } from 'lucide-react';
import GoalSetting, { Goal } from '@/components/goals/GoalSetting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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

  // Calculate goal progress percentages
  const getGoalProgressPercentage = (goal: Goal) => {
    if (goal.type === 'weight') {
      // For weight loss, we calculate differently
      const startWeight = goal.startValue || goal.currentValue + 5; // Assume starting weight if not provided
      const targetDiff = startWeight - goal.target;
      const currentDiff = startWeight - goal.currentValue;
      return Math.min(Math.floor((currentDiff / targetDiff) * 100), 100);
    }
    
    // For other goals
    return Math.min(Math.floor((goal.currentValue / goal.target) * 100), 100);
  };
  
  return (
    <div className="space-y-8">
      <div className="proglo-section-header">
        <h1 className="text-3xl font-bold proglo-gradient-text flex items-center">
          <Target className="mr-2 text-proglo-purple" size={28} />
          Goals
        </h1>
        <p className="text-gray-600 mt-1">Set and track your health and fitness goals</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-fade-in">
          <GoalSetting 
            goals={goals}
            onAddGoal={handleAddGoal}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
          />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <Card className="proglo-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="proglo-card-header">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Award size={18} className="mr-2 text-proglo-purple" />
                Goals Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {goals.map(goal => (
                  <div key={goal.id} className="bg-purple-50 p-3 rounded-md border border-purple-100">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="font-medium capitalize">{goal.type}</span>
                      </div>
                      <div className="text-sm">
                        {goal.currentValue} / {goal.target} {goal.unit}
                      </div>
                    </div>
                    <Progress 
                      value={getGoalProgressPercentage(goal)}
                      className="h-2 bg-purple-100"
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-600">
                      <div className="flex items-center">
                        <TrendingUp size={12} className="mr-1" />
                        <span>{getGoalProgressPercentage(goal)}% complete</span>
                      </div>
                      {goal.deadline && (
                        <div className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {goals.length > 0 && (
                <div className="mt-6 p-3 bg-green-50 rounded-md border border-green-100">
                  <h4 className="text-sm font-medium text-green-800 flex items-center">
                    <Check size={16} className="mr-1" />
                    Progress Tips
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Break your goals into smaller, achievable milestones. 
                    Track your progress regularly and celebrate small wins along the way.
                  </p>
                </div>
              )}
              
              {goals.length === 0 && (
                <div className="mt-6 p-3 bg-blue-50 rounded-md border border-blue-100 text-center">
                  <p className="text-sm text-blue-800">
                    No goals set yet. Create your first goal to track your progress.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="proglo-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="proglo-card-header">
              <CardTitle className="text-lg font-semibold flex items-center">
                <TrendingUp size={18} className="mr-2 text-proglo-purple" />
                Goal Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-md border border-purple-100">
                  <h4 className="font-medium text-sm">Top Goal</h4>
                  <p className="text-sm text-gray-600">
                    {goals.length > 0 
                      ? `${goals[0].type} (${getGoalProgressPercentage(goals[0])}% complete)`
                      : "No goals set yet"}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-md border border-purple-100">
                  <h4 className="font-medium text-sm">Active Goals</h4>
                  <p className="text-sm text-gray-600">{goals.length} goals</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-md border border-purple-100">
                  <h4 className="font-medium text-sm">Completed Goals</h4>
                  <p className="text-sm text-gray-600">
                    {goals.filter(goal => 
                      goal.type === 'weight' 
                        ? goal.currentValue <= goal.target
                        : goal.currentValue >= goal.target
                    ).length} goals
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Goals;
