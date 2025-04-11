
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardCard from '../dashboard/DashboardCard';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';

// Define activity types
const activityTypes = [
  { value: 'walking', label: 'Walking' },
  { value: 'running', label: 'Running' },
  { value: 'cycling', label: 'Cycling' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'strength', label: 'Strength Training' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'other', label: 'Other' },
];

// Define intensity levels
const intensityLevels = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export type Activity = {
  id: string;
  type: string;
  duration: number; // in minutes
  intensity: string;
  date: string;
};

type ActivityTrackerProps = {
  activities: Activity[];
  onAddActivity: (activity: Omit<Activity, 'id'>) => void;
};

const ActivityTracker = ({ activities, onAddActivity }: ActivityTrackerProps) => {
  const [activityType, setActivityType] = useState('');
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activityType || !intensity) {
      toast.error('Please fill all fields');
      return;
    }
    
    const newActivity = {
      type: activityType,
      duration,
      intensity,
      date,
    };
    
    onAddActivity(newActivity);
    toast.success('Activity logged successfully!');
    
    // Reset form
    setActivityType('');
    setDuration(30);
    setIntensity('');
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Log New Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="activityType">Activity Type</Label>
                <Select value={activityType} onValueChange={setActivityType}>
                  <SelectTrigger id="activityType">
                    <SelectValue placeholder="Select activity" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="intensity">Intensity</Label>
                <Select value={intensity} onValueChange={setIntensity}>
                  <SelectTrigger id="intensity">
                    <SelectValue placeholder="Select intensity" />
                  </SelectTrigger>
                  <SelectContent>
                    {intensityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min={1}
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
            <Plus size={18} className="mr-2" />
            Log Activity
          </Button>
        </CardFooter>
      </Card>
      
      <div>
        <h3 className="font-semibold text-lg mb-4">Recent Activities</h3>
        {activities.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No activities logged yet</p>
        ) : (
          <div className="space-y-4">
            {activities.slice(0, 5).map((activity) => (
              <DashboardCard key={activity.id} title={getActivityTypeLabel(activity.type)} className="relative">
                <div className="absolute top-4 right-4 flex items-center text-sm text-muted-foreground">
                  <CalendarIcon size={14} className="mr-1" /> 
                  {format(new Date(activity.date), 'MMM d, yyyy')}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm bg-muted px-2 py-1 rounded-md">
                    {activity.duration} mins
                  </span>
                  <span className="text-sm bg-muted px-2 py-1 rounded-md capitalize">
                    {activity.intensity} intensity
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

// Helper function to get label from activity type value
function getActivityTypeLabel(value: string): string {
  const activity = activityTypes.find((type) => type.value === value);
  return activity ? activity.label : 'Unknown Activity';
}

export default ActivityTracker;
