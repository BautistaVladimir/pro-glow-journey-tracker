import { useState } from 'react';
import { Activity, TrendingUp, Calendar, Award } from 'lucide-react';
import ActivityTracker, { Activity as ActivityType } from '@/components/tracking/ActivityTracker';
import ProgressChart from '@/components/charts/ProgressChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { v4 as uuidv4 } from '@/lib/utils'; // Simulating UUID
import { AuthUser } from '@/types/auth';

// Mock activities data
const mockActivities: ActivityType[] = [
  {
    id: '1',
    type: 'running',
    duration: 30,
    intensity: 'high',
    date: '2025-04-11',
  },
  {
    id: '2',
    type: 'cycling',
    duration: 45,
    intensity: 'medium',
    date: '2025-04-10',
  },
  {
    id: '3',
    type: 'strength',
    duration: 60,
    intensity: 'high',
    date: '2025-04-08',
  },
  {
    id: '4',
    type: 'walking',
    duration: 40,
    intensity: 'low',
    date: '2025-04-06',
  },
  {
    id: '5',
    type: 'yoga',
    duration: 30,
    intensity: 'medium',
    date: '2025-04-05',
  },
];

// Mock chart data for weekly activity minutes
const mockActivityChartData = [
  { date: '2025-04-05', value: 30 },
  { date: '2025-04-06', value: 40 },
  { date: '2025-04-07', value: 0 },
  { date: '2025-04-08', value: 60 },
  { date: '2025-04-09', value: 0 },
  { date: '2025-04-10', value: 45 },
  { date: '2025-04-11', value: 30 },
];

type ActivitiesProps = {
  user: AuthUser;
};

const Activities = ({ user }: ActivitiesProps) => {
  const [activities, setActivities] = useState<ActivityType[]>(mockActivities);
  const [activityChartData, setActivityChartData] = useState(mockActivityChartData);
  
  const handleAddActivity = (activityData: Omit<ActivityType, 'id'>) => {
    const newActivity = {
      ...activityData,
      id: uuidv4(),
    };
    
    setActivities([newActivity, ...activities]);
    
    // Update chart data
    const today = new Date().toISOString().split('T')[0];
    if (activityData.date === today) {
      // If it's today, update today's value in chart
      const existingTodayIndex = activityChartData.findIndex(record => record.date === today);
      
      if (existingTodayIndex >= 0) {
        // Add to today's value
        const updatedChartData = [...activityChartData];
        updatedChartData[existingTodayIndex].value += activityData.duration;
        setActivityChartData(updatedChartData);
      } else {
        // Add new entry for today
        setActivityChartData([...activityChartData, { date: today, value: activityData.duration }]);
      }
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="proglo-section-header">
        <h1 className="text-3xl font-bold proglo-gradient-text flex items-center">
          <Activity className="mr-2 text-proglo-purple" size={28} />
          Activity Tracker
        </h1>
        <p className="text-gray-600 mt-1">Log and monitor your fitness activities</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-fade-in">
          <ActivityTracker activities={activities} onAddActivity={handleAddActivity} />
        </div>
        
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Card className="proglo-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="proglo-card-header">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <TrendingUp size={18} className="mr-2 text-proglo-purple" />
                  Weekly Activity Minutes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ProgressChart 
                  data={activityChartData}
                  label="Minutes of Activity"
                  color="#9b87f5"
                  unit=" min"
                  height={220}
                />
                
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm bg-purple-50 p-3 rounded-md border border-purple-100">
                    <span className="flex items-center">
                      <Award size={16} className="mr-2 text-proglo-purple" />
                      Total this week:
                    </span>
                    <span className="font-medium">
                      {activityChartData.reduce((total, day) => total + day.value, 0)} minutes
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm bg-purple-50 p-3 rounded-md border border-purple-100">
                    <span className="flex items-center">
                      <Calendar size={16} className="mr-2 text-proglo-purple" />
                      Active days:
                    </span>
                    <span className="font-medium">
                      {activityChartData.filter(day => day.value > 0).length}/7 days
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="proglo-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader className="proglo-card-header">
                <CardTitle className="text-lg font-semibold">Activity Insights</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-md border border-green-100">
                    <h4 className="font-medium text-sm text-green-800">Most Active Day</h4>
                    <p className="text-sm text-gray-600">Tuesday (60 minutes)</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                    <h4 className="font-medium text-sm text-blue-800">Most Common Activity</h4>
                    <p className="text-sm text-gray-600">Running (3 sessions)</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-md border border-purple-100">
                    <h4 className="font-medium text-sm text-purple-800">Weekly Goal Progress</h4>
                    <p className="text-sm text-gray-600">69% (150 min goal)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
