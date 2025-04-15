
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import GoalForm from './GoalForm';
import { Goal, GoalFormData, GoalSettingProps } from './types';

const GoalSetting = ({ open, onClose, onAdd, onUpdate, goal }: GoalSettingProps) => {
  const [formData, setFormData] = useState<GoalFormData>({
    title: '',
    description: '',
    category: 'fitness',
    targetValue: 0,
    currentValue: 0,
    startValue: 0,
    unit: '',
    deadline: '',
  });

  const handleFormChange = (data: GoalFormData) => {
    setFormData(data);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.targetValue || !formData.unit) {
      toast.error('Please fill all required fields');
      return;
    }

    if (goal) {
      // Update existing goal
      onUpdate({
        ...goal,
        ...formData,
      });
      toast.success('Goal updated successfully!');
    } else {
      // Add new goal
      onAdd(formData);
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
        <GoalForm goal={goal} onChange={handleFormChange} />
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
