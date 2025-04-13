import React, { useState } from 'react';
import { Dumbbell, Target, Award, Plus, Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from '@/lib/utils';
import GoalSetting from '@/components/goals/GoalSetting';

export type Goal = {
  id: string;
  title: string;
  description: string;
  category: 'fitness' | 'nutrition' | 'sleep' | 'weight' | 'other';
  targetValue: number;
  currentValue: number;
  startValue: number; // Added missing property
  unit: string;
  deadline: string;
  createdAt: string;
};

// Sample goals data
const sampleGoals: Goal[] = [
  {
    id: '1',
    title: 'Increase Daily Steps',
    description: 'Walk more steps every day to improve cardiovascular health',
    category: 'fitness',
    startValue: 3000, // Added missing property
    currentValue: 7500,
    targetValue: 10000,
    unit: 'steps',
    deadline: '2025-06-30',
    createdAt: '2025-04-01',
  },
  {
    id: '2',
    title: 'Reduce Body Weight',
    description: 'Lose weight to reach ideal BMI',
    category: 'weight',
    startValue: 85, // Added missing property
    currentValue: 80,
    targetValue: 75,
    unit: 'kg',
    deadline: '2025-07-15',
    createdAt: '2025-04-01',
  },
  {
    id: '3',
    title: 'Improve Sleep Quality',
    description: 'Get more restful sleep each night',
    category: 'sleep',
    startValue: 5.5, // Added missing property
    currentValue: 6.5,
    targetValue: 8,
    unit: 'hours',
    deadline: '2025-05-30',
    createdAt: '2025-04-01',
  },
  {
    id: '4',
    title: 'Increase Water Intake',
    description: 'Drink more water daily for better hydration',
    category: 'nutrition',
    startValue: 1.5, // Added missing property
    currentValue: 2.2,
    targetValue: 3,
    unit: 'liters',
    deadline: '2025-05-15',
    createdAt: '2025-04-01',
  },
];

const Goals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>(sampleGoals);
  const [isGoalSettingOpen, setIsGoalSettingOpen] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);

  const handleOpenGoalSetting = () => {
    setIsGoalSettingOpen(true);
    setEditingGoalId(null);
  };

  const handleCloseGoalSetting = () => {
    setIsGoalSettingOpen(false);
    setEditingGoalId(null);
  };

  const handleAddGoal = (newGoal: Omit<Goal, 'id' | 'createdAt'>) => {
    const goalToAdd = {
      ...newGoal,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setGoals([goalToAdd, ...goals]);
    setIsGoalSettingOpen(false);
  };

  const handleEditGoal = (goalId: string) => {
    setEditingGoalId(goalId);
    setIsGoalSettingOpen(true);
  };

  const handleUpdateGoal = (updatedGoal: Goal) => {
    const updatedGoals = goals.map(goal =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
    setIsGoalSettingOpen(false);
    setEditingGoalId(null);
  };

  const handleDeleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
  };

  const editingGoal = editingGoalId ? goals.find(goal => goal.id === editingGoalId) : null;

  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Dumbbell className="mr-2 h-6 w-6 text-proglo-purple" />
          <h1 className="text-3xl font-bold proglo-gradient-text">Your Goals</h1>
        </div>
        <Button onClick={handleOpenGoalSetting} className="bg-proglo-purple hover:bg-proglo-dark-purple">
          <Plus className="mr-2 h-4 w-4" />
          Add New Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => (
          <Card key={goal.id} className="fitness-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium leading-none flex items-center">
                {goal.title}
                <span className="ml-2 workout-tag">{goal.category}</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleEditGoal(goal.id)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteGoal(goal.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{goal.description}</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>{goal.currentValue} {goal.unit}</span>
                  <span>{goal.targetValue} {goal.unit}</span>
                </div>
                <Progress value={(goal.currentValue / goal.targetValue) * 100} className="h-2 rounded-full" />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">Deadline: {goal.deadline}</span>
                <span className="text-xs text-gray-500">Created: {goal.createdAt.substring(0, 10)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <GoalSetting
        open={isGoalSettingOpen}
        onClose={handleCloseGoalSetting}
        onAdd={handleAddGoal}
        onUpdate={handleUpdateGoal}
        goal={editingGoal}
      />
    </div>
  );
};

export default Goals;
