
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Droplet, Plus } from 'lucide-react';

export type HydrationEntry = {
  id: string;
  glasses: number;
  ml: number;
  date: string;
  percentage: number;
};

type HydrationTrackerProps = {
  dailyGoal: number; // in ml
  currentIntake: number; // in ml
  onAddWater: (amount: number) => void;
};

const HydrationTracker = ({ dailyGoal, currentIntake, onAddWater }: HydrationTrackerProps) => {
  const [amount, setAmount] = useState(250); // Default to 250ml (1 glass)
  
  const percentComplete = Math.min(100, Math.round((currentIntake / dailyGoal) * 100));
  
  const handleQuickAdd = (ml: number) => {
    onAddWater(ml);
    toast.success(`Added ${ml}ml of water`);
  };
  
  const handleCustomAdd = () => {
    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    onAddWater(amount);
    toast.success(`Added ${amount}ml of water`);
    setAmount(250); // Reset to default
  };
  
  // Calculate glasses (1 glass = 250ml)
  const glassesTotal = Math.floor(dailyGoal / 250);
  const glassesDrunk = Math.floor(currentIntake / 250);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Droplet className="mr-2 text-proglo-blue" size={20} />
          Hydration Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-5xl font-bold text-proglo-blue">{percentComplete}%</div>
          <p className="text-sm text-muted-foreground mt-1">of daily goal</p>
          <div className="mt-4">
            <Progress value={percentComplete} className="h-2" />
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>0ml</span>
            <span>{dailyGoal}ml</span>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div>
              <span className="text-xl font-bold">{currentIntake}ml</span>
              <span className="text-sm text-muted-foreground"> / {dailyGoal}ml</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm">
              <span className="font-medium">{glassesDrunk}</span> of {glassesTotal} glasses
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Quick Add</h4>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickAdd(250)}
              className="flex-1"
            >
              1 Glass (250ml)
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickAdd(500)}
              className="flex-1"
            >
              500ml
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickAdd(1000)}
              className="flex-1"
            >
              1L
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Label htmlFor="custom-amount">Custom Amount (ml)</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="custom-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min={0}
                  step={50}
                />
                <Button onClick={handleCustomAdd}>
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground italic">
          Aim to drink water consistently throughout the day.
        </div>
      </CardFooter>
    </Card>
  );
};

export default HydrationTracker;
