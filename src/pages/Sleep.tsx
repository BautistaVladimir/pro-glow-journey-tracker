import { useState } from 'react';
import SleepTracker, { SleepEntry } from '@/components/tracking/SleepTracker';
import ProgressChart from '@/components/charts/ProgressChart';
import { Card, CardContent } from '@/components/ui/card';
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
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Sleep Tracker</h1>
        <p className="text-muted-foreground mt-1">Monitor your sleep patterns</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SleepTracker 
            entries={sleepEntries} 
            onAddEntry={handleAddSleepEntry} 
            targetHours={targetHours} 
          />
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Sleep History</h3>
              
              <ProgressChart 
                data={sleepChartData}
                label="Hours Slept"
                color="#9b87f5"
                unit="h"
                height={250}
              />
              
              <div className="mt-6 text-sm">
                <div className="flex justify-between">
                  <span>7-day average:</span>
                  <span className="font-medium">
                    {(sleepEntries.slice(0, 7).reduce((total, entry) => total + entry.hoursSlept, 0) / 
                      Math.min(sleepEntries.length, 7)).toFixed(1)} hours
                  </span>
                </div>
                
                <div className="flex justify-between mt-2">
                  <span>Recommended:</span>
                  <span className="font-medium">{targetHours} hours</span>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-muted rounded-md">
                <p className="text-xs">
                  <span className="font-medium">Sleep tip:</span> Aim for consistent sleep and wake times, 
                  even on weekends, to regulate your body's internal clock and improve sleep quality.
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
