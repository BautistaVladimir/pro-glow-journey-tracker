
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Target, Edit2, Check, Trash2 } from 'lucide-react';

export type Goal = {
  id: string;
  type: 'weight' | 'workout' | 'hydration';
  target: number;
  unit: string;
  deadline?: string;
  currentValue: number;
};

type GoalSettingProps = {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  onUpdateGoal: (id: string, currentValue: number) => void;
  onDeleteGoal: (id: string) => void;
};

const GoalSetting = ({ goals, onAddGoal, onUpdateGoal, onDeleteGoal }: GoalSettingProps) => {
  const [type, setType] = useState<'weight' | 'workout' | 'hydration'>('weight');
  const [target, setTarget] = useState(0);
  const [unit, setUnit] = useState('');
  const [deadline, setDeadline] = useState('');
  const [currentValue, setCurrentValue] = useState(0);
  
  // For goal progress update
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState(0);
  
  const getUnitOptions = () => {
    switch (type) {
      case 'weight':
        return [{ value: 'kg', label: 'kg' }, { value: 'lbs', label: 'lbs' }];
      case 'workout':
        return [{ value: 'sessions', label: 'sessions per week' }];
      case 'hydration':
        return [{ value: 'ml', label: 'ml per day' }, { value: 'glasses', label: 'glasses per day' }];
      default:
        return [];
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (target <= 0 || !unit) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const newGoal = {
      type,
      target,
      unit,
      deadline: deadline || undefined,
      currentValue,
    };
    
    onAddGoal(newGoal);
    toast.success('Goal added successfully!');
    
    // Reset form
    setTarget(0);
    setUnit('');
    setDeadline('');
    setCurrentValue(0);
  };
  
  const handleStartEdit = (goal: Goal) => {
    setEditingGoalId(goal.id);
    setEditValue(goal.currentValue);
  };
  
  const handleSaveEdit = (id: string) => {
    onUpdateGoal(id, editValue);
    setEditingGoalId(null);
    toast.success('Progress updated!');
  };
  
  const calculateProgress = (current: number, target: number) => {
    let percentage = Math.round((current / target) * 100);
    
    // For weight goals, the current might be higher than target (aiming to lose weight)
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    
    return percentage;
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 text-proglo-purple" size={20} />
            Set a New Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goalType">Goal Type</Label>
              <Select value={type} onValueChange={(val: 'weight' | 'workout' | 'hydration') => setType(val)}>
                <SelectTrigger id="goalType">
                  <SelectValue placeholder="Select goal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight">Weight Goal</SelectItem>
                  <SelectItem value="workout">Workout Frequency</SelectItem>
                  <SelectItem value="hydration">Daily Hydration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target">Target {type === 'weight' ? 'Weight' : type === 'workout' ? 'Frequency' : 'Amount'}</Label>
                <Input
                  id="target"
                  type="number"
                  value={target || ''}
                  onChange={(e) => setTarget(Number(e.target.value))}
                  min={0}
                  step={type === 'weight' ? 0.1 : 1}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {getUnitOptions().map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentValue">Current {type === 'weight' ? 'Weight' : type === 'workout' ? 'Frequency' : 'Amount'}</Label>
                <Input
                  id="currentValue"
                  type="number"
                  value={currentValue || ''}
                  onChange={(e) => setCurrentValue(Number(e.target.value))}
                  min={0}
                  step={type === 'weight' ? 0.1 : 1}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Target Date (Optional)</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Add Goal
          </Button>
        </CardFooter>
      </Card>
      
      <div>
        <h3 className="font-semibold text-lg mb-4">Your Goals</h3>
        {goals.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No goals set yet</p>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium capitalize">{goal.type} Goal</h4>
                      <p className="text-sm text-muted-foreground">
                        Target: {goal.target} {goal.unit}
                        {goal.deadline && ` by ${format(new Date(goal.deadline), 'MMM d, yyyy')}`}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      {editingGoalId !== goal.id ? (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleStartEdit(goal)}
                        >
                          <Edit2 size={16} />
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleSaveEdit(goal.id)}
                        >
                          <Check size={16} />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onDeleteGoal(goal.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">
                        {calculateProgress(goal.currentValue, goal.target)}%
                      </span>
                    </div>
                    <Progress 
                      value={calculateProgress(goal.currentValue, goal.target)} 
                      className="h-2" 
                    />
                    
                    {editingGoalId === goal.id ? (
                      <div className="mt-4">
                        <Label htmlFor={`edit-${goal.id}`} className="text-xs">Update current value</Label>
                        <div className="flex mt-1">
                          <Input
                            id={`edit-${goal.id}`}
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(Number(e.target.value))}
                            min={0}
                            step={goal.type === 'weight' ? 0.1 : 1}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">Current</span>
                        <span>{goal.currentValue} {goal.unit}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to format date
const format = (date: Date, formatStr: string) => {
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  
  return formatStr
    .replace('yyyy', yyyy)
    .replace('MM', mm)
    .replace('dd', dd)
    .replace('MMM', new Date(date).toLocaleDateString('en-US', { month: 'short' }));
};

export default GoalSetting;
