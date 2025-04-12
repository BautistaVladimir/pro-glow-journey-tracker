
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

type BMICalculatorProps = {
  user: {
    height?: number;
    weight?: number;
  } | null | undefined;
  onSave: (height: number, weight: number, bmi: number) => void;
};

type BMICategory = 'Underweight' | 'Healthy Weight' | 'Overweight' | 'Obese';

const BMICalculator = ({ user, onSave }: BMICalculatorProps) => {
  // Set default values if user is undefined or height/weight are undefined
  const [height, setHeight] = useState(user?.height || 170);
  const [weight, setWeight] = useState(user?.weight || 70);
  const [bmi, setBMI] = useState(0);
  const [category, setCategory] = useState<BMICategory | ''>('');
  
  // Calculate BMI whenever height or weight changes
  useEffect(() => {
    if (height && weight) {
      // BMI = weight (kg) / (height (m))²
      const heightInMeters = height / 100;
      const calculatedBMI = weight / (heightInMeters * heightInMeters);
      setBMI(parseFloat(calculatedBMI.toFixed(1)));
      
      // Determine BMI category
      if (calculatedBMI < 18.5) {
        setCategory('Underweight');
      } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
        setCategory('Healthy Weight');
      } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
        setCategory('Overweight');
      } else {
        setCategory('Obese');
      }
    }
  }, [height, weight]);
  
  const handleSave = () => {
    onSave(height, weight, bmi);
    toast.success('BMI data saved successfully');
  };
  
  const getCategoryColor = () => {
    switch (category) {
      case 'Underweight':
        return 'text-blue-500';
      case 'Healthy Weight':
        return 'text-proglo-green';
      case 'Overweight':
        return 'text-orange-500';
      case 'Obese':
        return 'text-red-500';
      default:
        return '';
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
        <CardDescription>
          Body Mass Index (BMI) is a measure of body fat based on height and weight.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="height-slider"
              min={120}
              max={230}
              step={1}
              value={[height]}
              onValueChange={(values) => setHeight(values[0])}
              className="flex-1"
            />
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min={120}
              max={230}
              className="w-20"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="weight-slider"
              min={30}
              max={200}
              step={0.1}
              value={[weight]}
              onValueChange={(values) => setWeight(values[0])}
              className="flex-1"
            />
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              min={30}
              max={200}
              step={0.1}
              className="w-20"
            />
          </div>
        </div>
        
        <div className="bg-muted rounded-md p-4 text-center">
          <p className="text-sm">Your BMI</p>
          <h3 className="text-3xl font-bold">{bmi}</h3>
          <p className={`text-sm font-medium ${getCategoryColor()}`}>
            {category}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSave}>
          Save Results
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BMICalculator;
