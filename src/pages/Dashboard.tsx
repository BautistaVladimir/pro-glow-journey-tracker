
import { useState, useEffect } from 'react';
import { Activity, Droplet, Apple, Moon, Weight, Target, TrendingUp, Award } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';
import ProgressChart from '@/components/charts/ProgressChart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100 shadow-sm animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">
              <span className="proglo-gradient-text">{getGreeting()}, {user?.name || 'User'}!</span>
            </h1>
            <p className="text-gray-600 mt-1">Your wellness journey awaits.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/goals">
              <Button className="bg-proglo-purple hover:bg-proglo-dark-purple shadow-sm hover:shadow">
                <Target size={18} className="mr-2" />
                Set New Goals
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stagger-animate-1">
          <StatCard 
            label="Activities This Week" 
            value="5" 
            icon={<Activity size={18} className="text-proglo-purple" />}
            trend="up"
            trendValue="2 more than last week"
            className="border-purple-100 hover:border-purple-200 card-hover-effect"
          />
        </div>
        <div className="stagger-animate-1" style={{ animationDelay: "0.1s" }}>
          <StatCard 
            label="Daily Hydration" 
            value="75%" 
            icon={<Droplet size={18} className="text-blue-500" />}
            color="blue"
            className="border-blue-100 hover:border-blue-200 card-hover-effect"
          />
        </div>
        <div className="stagger-animate-1" style={{ animationDelay: "0.2s" }}>
          <StatCard 
            label="Meals Logged" 
            value="18" 
            icon={<Apple size={18} className="text-green-500" />}
            color="green"
            className="border-green-100 hover:border-green-200 card-hover-effect"
          />
        </div>
        <div className="stagger-animate-1" style={{ animationDelay: "0.3s" }}>
          <StatCard 
            label="Avg. Sleep" 
            value="7.5h" 
            icon={<Moon size={18} className="text-indigo-500" />}
            color="purple"
            trend="up"
            trendValue="0.5h more"
            className="border-indigo-100 hover:border-indigo-200 card-hover-effect"
          />
        </div>
      </div>
      
      {/* Weight Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 stagger-animate-2">
          <DashboardCard 
            title="Weight Tracking" 
            icon={<Weight size={18} />}
            className="border-purple-100 card-hover-effect"
          >
            <div className="p-4">
              <ProgressChart 
                data={mockWeightData}
                label="Weight (kg)"
                color="#7c3aed"
                unit="kg"
              />
              <div className="flex justify-between items-center mt-4 text-sm">
                <div className="flex items-center text-green-600">
                  <TrendingUp size={16} className="mr-1" />
                  <span>-1.3kg this week</span>
                </div>
                <Link to="/bmi">
                  <Button variant="link" size="sm" className="text-proglo-purple p-0">
                    View Full History
                  </Button>
                </Link>
              </div>
            </div>
          </DashboardCard>
        </div>
        
        <div className="lg:col-span-1 stagger-animate-2" style={{ animationDelay: "0.2s" }}>
          <DashboardCard 
            title="BMI" 
            icon={<Activity size={18} />}
            className="border-purple-100 card-hover-effect"
          >
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-50 border-4 border-proglo-light-purple mb-4">
                <span className="text-3xl font-bold text-proglo-purple">22.8</span>
              </div>
              <div className="text-proglo-green font-medium">Healthy Weight</div>
              <div className="mt-4 text-sm text-gray-500">
                Your BMI indicates you're at a healthy weight for your height
              </div>
              <div className="mt-4">
                <Link to="/bmi">
                  <Button variant="outline" size="sm" className="border-proglo-purple text-proglo-purple hover:bg-proglo-purple hover:text-white">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="stagger-animate-3">
          <DashboardCard 
            title="Recent Activities" 
            icon={<Activity size={18} />}
            className="border-purple-100 card-hover-effect"
          >
            <div className="space-y-3 p-4">
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors">
                <div className="flex items-center">
                  <div className="bg-proglo-purple rounded-md p-2 mr-3">
                    <Activity size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Running</p>
                    <p className="text-sm text-gray-600">30 min • High intensity</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Today</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors">
                <div className="flex items-center">
                  <div className="bg-proglo-purple rounded-md p-2 mr-3">
                    <Award size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Strength Training</p>
                    <p className="text-sm text-gray-600">45 min • Medium intensity</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Yesterday</div>
              </div>
              <div className="mt-4 text-center">
                <Link to="/activities">
                  <Button variant="link" size="sm" className="text-proglo-purple">View All Activities</Button>
                </Link>
              </div>
            </div>
          </DashboardCard>
        </div>
        
        <div className="stagger-animate-3" style={{ animationDelay: "0.2s" }}>
          <DashboardCard 
            title="Nutrition Summary" 
            icon={<Apple size={18} />}
            className="border-purple-100 card-hover-effect"
          >
            <div className="space-y-4 p-4">
              <div className="grid grid-cols-3 gap-3">
                <Card className="bg-gradient-to-b from-purple-50 to-white p-3 rounded-lg text-center border border-purple-100">
                  <p className="text-sm text-gray-600">Proteins</p>
                  <p className="font-semibold text-lg text-proglo-purple">32%</p>
                </Card>
                <Card className="bg-gradient-to-b from-purple-50 to-white p-3 rounded-lg text-center border border-purple-100">
                  <p className="text-sm text-gray-600">Carbs</p>
                  <p className="font-semibold text-lg text-proglo-purple">48%</p>
                </Card>
                <Card className="bg-gradient-to-b from-purple-50 to-white p-3 rounded-lg text-center border border-purple-100">
                  <p className="text-sm text-gray-600">Fats</p>
                  <p className="font-semibold text-lg text-proglo-purple">20%</p>
                </Card>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Apple size={16} className="text-green-500 mr-2" />
                    <span className="text-sm font-medium">Last Meal:</span>
                  </div>
                  <span className="text-sm text-gray-600">2 hours ago</span>
                </div>
                <p className="text-sm mt-1">Greek yogurt with berries</p>
              </div>
              <div className="mt-4 text-center">
                <Link to="/nutrition">
                  <Button variant="link" size="sm" className="text-proglo-purple">View Nutrition Log</Button>
                </Link>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
