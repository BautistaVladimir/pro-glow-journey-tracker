
import { useState } from 'react';
import { Moon, TrendingUp, Clock, Calendar, AlertCircle } from 'lucide-react';
import SleepTracker, { SleepEntry } from '@/components/tracking/SleepTracker';
import ProgressChart from '@/components/charts/ProgressChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { v4 as uuidv4 } from '@/lib/utils'; // Simulating UUID
import { AuthUser } from '@/contexts/AuthContext';

// Mock sleep entries
const mockSleepEntries: SleepEntry[] = [
  { id: '1', hoursSlept: 7.5, date: '2025-04-11' },
  { id: '2', hoursSlept: 6.5, date: '2025-04-10' },
  { id: '3', hoursSlept: 8, date: '2025-04-09' },
  { id: '4', hoursSlept: 7, date: '2025-04-08' },
  { id: '5', hoursSlept: 7.5, date: '2025-04-07' },
  { id: '6', hoursSlept: 8.5, date: '2025-04-06' },
  { id: '7', hoursSlept: 6, date: '2025-04-05' },
];

type SleepProps = {
  user: AuthUser;
};

const Sleep = ({ user }: SleepProps) => {
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>(mockSleepEntries);
  const [targetHours] = useState(8); // Target hours of sleep
  
  const handleAddSleepEntry = (entryData: Omit<SleepEntry, 'id'>) => {
    const newEntry = {
      ...entryData,
      id: uuidv4(),
    };
    
    setSleepEntries([newEntry, ...sleepEntries]);
  };
  
  // Format entries for chart
  const sleepChartData = [...sleepEntries]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: entry.date,
      value: entry.hoursSlept,
    }));
  
  // Calculate average sleep time for the last 7 days
  const avgSleep = sleepEntries.slice(0, 7).reduce((total, entry) => total + entry.hoursSlept, 0) / 
    Math.min(sleepEntries.length, 7);
    
  // Determine sleep quality based on average sleep time
  const getSleepQualityInfo = () => {
    if (avgSleep >= targetHours) {
      return {
        status: 'Excellent',
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-100',
        message: 'You are getting adequate sleep'
      };
    } else if (avgSleep >= targetHours - 1) {
      return {
        status: 'Good',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        message: 'You are getting close to adequate sleep'
      };
    } else if (avgSleep >= targetHours - 2) {
      return {
        status: 'Fair',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-100',
        message: 'You are getting less sleep than recommended'
      };
    } else {
      return {
        status: 'Poor',
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-100',
        message: 'You are significantly sleep deprived'
      };
    }
  };
  
  const sleepQuality = getSleepQualityInfo();
  
  return (
    <div className="space-y-8">
      <div className="proglo-section-header">
        <h1 className="text-3xl font-bold proglo-gradient-text flex items-center">
          <Moon className="mr-2 text-proglo-purple" size={28} />
          Sleep Tracker
        </h1>
        <p className="text-gray-600 mt-1">Monitor your sleep patterns</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-fade-in">
          <SleepTracker 
            entries={sleepEntries} 
            onAddEntry={handleAddSleepEntry} 
            targetHours={targetHours} 
          />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <Card className="proglo-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="proglo-card-header">
              <CardTitle className="text-lg font-semibold flex items-center">
                <TrendingUp size={18} className="mr-2 text-proglo-purple" />
                Sleep History
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ProgressChart 
                data={sleepChartData}
                label="Hours Slept"
                color="#9b87f5"
                unit="h"
                height={220}
              />
              
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm bg-purple-50 p-3 rounded-md border border-purple-100">
                  <span className="flex items-center">
                    <Clock size={16} className="mr-2 text-proglo-purple" />
                    7-day average:
                  </span>
                  <span className="font-medium">
                    {avgSleep.toFixed(1)} hours
                  </span>
                </div>
                
                <div className="flex justify-between text-sm bg-purple-50 p-3 rounded-md border border-purple-100">
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-2 text-proglo-purple" />
                    Recommended:
                  </span>
                  <span className="font-medium">{targetHours} hours</span>
                </div>

                <div className={`p-3 rounded-md border ${sleepQuality.bg} ${sleepQuality.border}`}>
                  <div className="flex justify-between text-sm">
                    <span>Sleep quality:</span>
                    <span className={`font-medium ${sleepQuality.color}`}>{sleepQuality.status}</span>
                  </div>
                  <p className="text-xs mt-1 text-gray-600">{sleepQuality.message}</p>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-blue-50 rounded-md border border-blue-100">
                <h4 className="text-sm font-medium text-blue-800 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  Sleep tip
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Aim for consistent sleep and wake times, 
                  even on weekends, to regulate your body's internal clock and improve sleep quality.
                  Avoid screens at least 1 hour before bedtime.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sleep;
