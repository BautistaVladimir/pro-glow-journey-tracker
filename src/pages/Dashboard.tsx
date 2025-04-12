
import { useState, useEffect } from 'react';
import { Activity, Droplet, Apple, Moon, Weight, Target } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';
import ProgressChart from '@/components/charts/ProgressChart';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Mock data for initial dashboard
  const mockWeightData = [
    { date: '2025-04-05', value: 72.5 },
    { date: '2025-04-06', value: 72.3 },
    { date: '2025-04-07', value: 72.1 },
    { date: '2025-04-08', value: 71.8 },
    { date: '2025-04-09', value: 71.6 },
    { date: '2025-04-10', value: 71.4 },
    { date: '2025-04-11', value: 71.2 },
  ];

  // Time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">{getGreeting()}, {user?.name || 'User'}!</h1>
          <p className="text-muted-foreground mt-1">Your wellness journey awaits.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/goals">
            <Button>
              <Target size={18} className="mr-2" />
              Set New Goals
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Activities This Week" 
          value="5" 
          icon={<Activity size={18} />}
          trend="up"
          trendValue="2 more than last week"
        />
        <StatCard 
          label="Daily Hydration" 
          value="75%" 
          icon={<Droplet size={18} />}
          color="blue"
        />
        <StatCard 
          label="Meals Logged" 
          value="18" 
          icon={<Apple size={18} />}
          color="green"
        />
        <StatCard 
          label="Avg. Sleep" 
          value="7.5h" 
          icon={<Moon size={18} />}
          color="purple"
          trend="up"
          trendValue="0.5h more"
        />
      </div>
      
      {/* Weight Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard title="Weight Tracking" icon={<Weight size={18} />}>
            <ProgressChart 
              data={mockWeightData}
              label="Weight (kg)"
              unit="kg"
            />
          </DashboardCard>
        </div>
        
        <div className="lg:col-span-1">
          <DashboardCard title="BMI" icon={<Activity size={18} />}>
            <div className="text-center py-6">
              <div className="text-5xl font-bold text-proglo-purple">22.8</div>
              <div className="text-sm text-proglo-green font-medium mt-1">Healthy Weight</div>
              <div className="mt-4">
                <Link to="/bmi">
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Recent Activities" icon={<Activity size={18} />}>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-muted rounded-md">
              <div>
                <p className="font-medium">Running</p>
                <p className="text-sm text-muted-foreground">30 min • High intensity</p>
              </div>
              <div className="text-sm text-muted-foreground">Today</div>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted rounded-md">
              <div>
                <p className="font-medium">Strength Training</p>
                <p className="text-sm text-muted-foreground">45 min • Medium intensity</p>
              </div>
              <div className="text-sm text-muted-foreground">Yesterday</div>
            </div>
            <div className="mt-4 text-center">
              <Link to="/activities">
                <Button variant="link" size="sm">View All Activities</Button>
              </Link>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Nutrition Summary" icon={<Apple size={18} />}>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-muted p-3 rounded-md text-center">
                <p className="text-sm text-muted-foreground">Proteins</p>
                <p className="font-semibold">32%</p>
              </div>
              <div className="bg-muted p-3 rounded-md text-center">
                <p className="text-sm text-muted-foreground">Carbs</p>
                <p className="font-semibold">48%</p>
              </div>
              <div className="bg-muted p-3 rounded-md text-center">
                <p className="text-sm text-muted-foreground">Fats</p>
                <p className="font-semibold">20%</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link to="/nutrition">
                <Button variant="link" size="sm">View Nutrition Log</Button>
              </Link>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
