
import { GoalCategory } from './constants';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  targetValue: number;
  currentValue: number;
  startValue: number;
  unit: string;
  deadline: string;
  createdAt: string;
}

export interface GoalFormData {
  title: string;
  description: string;
  category: GoalCategory;
  targetValue: number;
  currentValue: number;
  startValue: number;
  unit: string;
  deadline: string;
}

export interface GoalSettingProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newGoal: GoalFormData) => void;
  onUpdate: (updatedGoal: Goal) => void;
  goal: Goal | null;
}
