
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { format } from 'date-fns';
import { Goal } from '@/pages/Goals';

type GoalSettingProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (newGoal: Omit<Goal, 'id' | 'createdAt'>) => void;
  onUpdate: (updatedGoal: Goal) => void;
  goal: Goal | null;
};

const categoryOptions = [
  { value: 'fitness', label: 'Fitness' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'sleep', label: 'Sleep' },
  { value: 'weight', label: 'Weight' },
  { value: 'other', label: 'Other' },
];

const GoalSetting = ({ open, onClose, onAdd, onUpdate, goal }: GoalSettingProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'fitness' | 'nutrition' | 'sleep' | 'weight' | 'other'>('fitness');
  const [targetValue, setTargetValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [startValue, setStartValue] = useState(0);
  const [unit, setUnit] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    // Reset form or set form data for editing
    if (goal) {
      setTitle(goal.title);
      setDescription(goal.description);
      setCategory(goal.category);
      setTargetValue(goal.targetValue);
      setCurrentValue(goal.currentValue);
      setStartValue(goal.startValue);
      setUnit(goal.unit);
      setDeadline(goal.deadline);
    } else {
      // Reset form for new goal
      setTitle('');
      setDescription('');
      setCategory('fitness');
      setTargetValue(0);
      setCurrentValue(0);
      setStartValue(0);
      setUnit('');
      setDeadline('');
    }
  }, [goal, open]);

  const handleSubmit = () => {
    if (!title || !description || !targetValue || !unit) {
      toast.error('Please fill all required fields');
      return;
    }

    if (goal) {
      // Update existing goal
      onUpdate({
        ...goal,
        title,
        description,
        category,
        targetValue,
        currentValue,
        startValue,
        unit,
        deadline,
      });
      toast.success('Goal updated successfully!');
    } else {
      // Add new goal
      onAdd({
        title,
        description,
        category,
        targetValue,
        currentValue,
        startValue,
        unit,
        deadline,
      });
      toast.success('Goal added successfully!');
    }

    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{goal ? 'Edit Goal' : 'Create New Goal'}</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Increase Daily Steps"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your goal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={(val: 'fitness' | 'nutrition' | 'sleep' | 'weight' | 'other') => setCategory(val)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startValue">Start Value</Label>
              <Input
                id="startValue"
                type="number"
                value={startValue}
                onChange={(e) => setStartValue(Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentValue">Current Value</Label>
              <Input
                id="currentValue"
                type="number"
                value={currentValue}
                onChange={(e) => setCurrentValue(Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetValue">Target Value</Label>
              <Input
                id="targetValue"
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g., steps, kg, hours"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <Button onClick={handleSubmit} className="w-full">
            {goal ? 'Update Goal' : 'Add Goal'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default GoalSetting;
