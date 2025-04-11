
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

// Define food categories
const foodCategories = [
  { value: 'fruits', label: 'Fruits' },
  { value: 'vegetables', label: 'Vegetables' },
  { value: 'grains', label: 'Grains' },
  { value: 'proteins', label: 'Proteins' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'snacks', label: 'Snacks' },
];

// Define portion sizes
const portionSizes = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

export type NutritionEntry = {
  id: string;
  food: string;
  category: string;
  portion: string;
  mealTime: string;
  date: string;
};

type NutritionTrackerProps = {
  entries: NutritionEntry[];
  onAddEntry: (entry: Omit<NutritionEntry, 'id'>) => void;
};

const NutritionTracker = ({ entries, onAddEntry }: NutritionTrackerProps) => {
  const [food, setFood] = useState('');
  const [category, setCategory] = useState('');
  const [portion, setPortion] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!food || !category || !portion || !mealTime) {
      toast.error('Please fill all fields');
      return;
    }
    
    const newEntry = {
      food,
      category,
      portion,
      mealTime,
      date,
    };
    
    onAddEntry(newEntry);
    toast.success('Food logged successfully!');
    
    // Reset form
    setFood('');
    setCategory('');
    setPortion('');
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Log Food Intake</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="food">Food Item</Label>
                <Input
                  id="food"
                  type="text"
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                  placeholder="e.g. Apple, Chicken Salad"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Food Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {foodCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="portion">Portion Size</Label>
                <Select value={portion} onValueChange={setPortion}>
                  <SelectTrigger id="portion">
                    <SelectValue placeholder="Select portion" />
                  </SelectTrigger>
                  <SelectContent>
                    {portionSizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mealTime">Meal Time</Label>
                <Select value={mealTime} onValueChange={setMealTime}>
                  <SelectTrigger id="mealTime">
                    <SelectValue placeholder="Select meal time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
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
            Log Food
          </Button>
        </CardFooter>
      </Card>
      
      <div>
        <h3 className="font-semibold text-lg mb-4">Recent Food Entries</h3>
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No food entries logged yet</p>
        ) : (
          <div className="space-y-4">
            {entries.slice(0, 5).map((entry) => (
              <DashboardCard key={entry.id} title={entry.food} className="relative">
                <div className="absolute top-4 right-4 flex items-center text-sm text-muted-foreground">
                  <CalendarIcon size={14} className="mr-1" /> 
                  {format(new Date(entry.date), 'MMM d, yyyy')}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm bg-muted px-2 py-1 rounded-md capitalize">
                    {getFoodCategoryLabel(entry.category)}
                  </span>
                  <span className="text-sm bg-muted px-2 py-1 rounded-md capitalize">
                    {entry.portion} portion
                  </span>
                  <span className="text-sm bg-muted px-2 py-1 rounded-md capitalize">
                    {entry.mealTime}
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

// Helper function to get label from category value
function getFoodCategoryLabel(value: string): string {
  const category = foodCategories.find((cat) => cat.value === value);
  return category ? category.label : 'Other';
}

export default NutritionTracker;
