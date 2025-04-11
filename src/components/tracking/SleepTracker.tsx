
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Moon, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import DashboardCard from '../dashboard/DashboardCard';
import { Progress } from '@/components/ui/progress';

export type SleepEntry = {
  id: string;
  hoursSlept: number;
  date: string;
};

type SleepTrackerProps = {
  entries: SleepEntry[];
  onAddEntry: (entry: Omit<SleepEntry, 'id'>) => void;
  targetHours: number;
};

const SleepTracker = ({ entries, onAddEntry, targetHours }: SleepTrackerProps) => {
  const [hoursSlept, setHoursSlept] = useState(7);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
  // Calculate average sleep hours from the last 7 entries
  const recentEntries = entries.slice(0, 7);
  const averageSleep = recentEntries.length > 0
    ? recentEntries.reduce((total, entry) => total + entry.hoursSlept, 0) / recentEntries.length
    : 0;
  
  const averagePercentage = Math.round((averageSleep / targetHours) * 100);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (hoursSlept <= 0 || hoursSlept > 24) {
      toast.error('Please enter valid sleep hours (1-24)');
      return;
    }
    
    const newEntry = {
      hoursSlept,
      date,
    };
    
    onAddEntry(newEntry);
    toast.success('Sleep hours logged successfully!');
  };
  
  const getSleepQualityLabel = (hours: number): string => {
    if (hours < 6) return 'Insufficient';
    if (hours < 7) return 'Fair';
    if (hours < 9) return 'Good';
    return 'Excellent';
  };
  
  const getSleepQualityColor = (hours: number): string => {
    if (hours < 6) return 'text-red-500';
    if (hours < 7) return 'text-orange-500';
    if (hours < 9) return 'text-proglo-green';
    return 'text-proglo-blue';
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Moon className="mr-2 text-proglo-purple" size={20} />
            Log Sleep Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hoursSlept">Hours Slept</Label>
                <Input
                  id="hoursSlept"
                  type="number"
                  value={hoursSlept}
                  onChange={(e) => setHoursSlept(Number(e.target.value))}
                  min={0}
                  max={24}
                  step={0.5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Log Sleep
          </Button>
        </CardFooter>
      </Card>
      
      {entries.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Average Sleep</h3>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold">{averageSleep.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground ml-1">hours</span>
                </div>
                <div className="mt-2">
                  <Progress 
                    value={averagePercentage} 
                    className="h-2" 
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>0h</span>
                  <span>{targetHours}h target</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div>
        <h3 className="font-semibold text-lg mb-4">Recent Sleep Records</h3>
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No sleep records logged yet</p>
        ) : (
          <div className="space-y-4">
            {entries.slice(0, 5).map((entry) => (
              <DashboardCard key={entry.id} title="" className="relative">
                <div className="absolute top-4 right-4 flex items-center text-sm text-muted-foreground">
                  <CalendarIcon size={14} className="mr-1" /> 
                  {format(new Date(entry.date), 'MMM d, yyyy')}
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{entry.hoursSlept}</span>
                  <span className="ml-1 text-sm">hours</span>
                </div>
                <div className="mt-1">
                  <span className={`text-sm font-medium ${getSleepQualityColor(entry.hoursSlept)}`}>
                    {getSleepQualityLabel(entry.hoursSlept)}
                  </span>
                </div>
              </DashboardCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepTracker;
