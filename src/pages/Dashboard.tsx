
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardGreeting from '@/components/dashboard/DashboardGreeting';
import StatsOverview from '@/components/dashboard/StatsOverview';
import WeightTracker from '@/components/dashboard/WeightTracker';
import BMISummary from '@/components/dashboard/BMISummary';
import RecentActivities from '@/components/dashboard/RecentActivities';
import NutritionSummary from '@/components/dashboard/NutritionSummary';
import apiService from '@/services/apiService';

const Dashboard = () => {
  const { user } = useAuth();
  const [bmiData, setBmiData] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Fetch BMI data
          const bmiHistory = await apiService.getBMIHistory();
          setBmiData(bmiHistory);
          
          // Transform BMI data for weight tracking
          if (bmiHistory && bmiHistory.length > 0) {
            const transformedData = bmiHistory.map(item => ({
              date: item.date,
              value: item.weight
            }));
            setWeightData(transformedData);
          } else {
            // Use mock data if no real data is available
            setWeightData([
              { date: '2025-04-05', value: 72.5 },
              { date: '2025-04-06', value: 72.3 },
              { date: '2025-04-07', value: 72.1 },
              { date: '2025-04-08', value: 71.8 },
              { date: '2025-04-09', value: 71.6 },
              { date: '2025-04-10', value: 71.4 },
              { date: '2025-04-11', value: 71.2 },
            ]);
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
  }, [user]);
  
  return (
    <div className="space-y-8">
      {/* Greeting Section */}
      <DashboardGreeting name={user?.name || 'User'} />
      
      {/* Stats Overview */}
      <StatsOverview />
      
      {/* Weight Tracking and BMI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 stagger-animate-2">
          <WeightTracker data={weightData} isLoading={isLoading} />
        </div>
        
        <div className="lg:col-span-1 stagger-animate-2" style={{ animationDelay: "0.2s" }}>
          <BMISummary bmiData={bmiData.length > 0 ? bmiData[0] : null} isLoading={isLoading} />
        </div>
      </div>
      
      {/* Recent Activities and Nutrition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="stagger-animate-3">
          <RecentActivities />
        </div>
        
        <div className="stagger-animate-3" style={{ animationDelay: "0.2s" }}>
          <NutritionSummary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
