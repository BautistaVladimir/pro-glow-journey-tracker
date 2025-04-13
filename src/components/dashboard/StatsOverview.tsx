
import { Activity, Droplet, Apple, Moon } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

const StatsOverview = () => {
  return (
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
  );
};

export default StatsOverview;
