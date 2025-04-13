
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Scale, Ruler, Save } from 'lucide-react';

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
    if (!user) {
      toast.error('Please log in to save your BMI data');
      return;
    }
    
    onSave(height, weight, bmi);
    toast.success('BMI data saved successfully', {
      className: 'bg-proglo-purple text-white',
      descriptionClassName: 'text-white',
    });
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

  const getCategoryBackground = () => {
    switch (category) {
      case 'Underweight':
        return 'bg-blue-50 border-blue-100';
      case 'Healthy Weight':
        return 'bg-green-50 border-green-100';
      case 'Overweight':
        return 'bg-orange-50 border-orange-100';
      case 'Obese':
        return 'bg-red-50 border-red-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto border-purple-100 shadow-md card-hover-effect proglo-card">
      <CardHeader className="proglo-card-header">
        <CardTitle className="proglo-gradient-text flex items-center">
          <Scale className="mr-2" size={20} />
          BMI Calculator
        </CardTitle>
        <CardDescription className="text-gray-600">
          Body Mass Index (BMI) is a measure of body fat based on height and weight.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-3">
          <Label htmlFor="height" className="text-sm font-medium flex items-center">
            <Ruler className="h-4 w-4 mr-1 text-proglo-purple" />
            Height (cm)
          </Label>
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
              className="w-20 border-purple-100"
            />
          </div>
          <div className="bg-purple-50 rounded-md p-2 text-xs text-center text-gray-600">
            {height} cm ({(height / 30.48).toFixed(1)} ft)
          </div>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="weight" className="text-sm font-medium flex items-center">
            <Scale className="h-4 w-4 mr-1 text-proglo-purple" />
            Weight (kg)
          </Label>
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
              className="w-20 border-purple-100"
            />
          </div>
          <div className="bg-purple-50 rounded-md p-2 text-xs text-center text-gray-600">
            {weight} kg ({(weight * 2.205).toFixed(1)} lbs)
          </div>
        </div>
        
        <div className={`rounded-md p-5 text-center border ${getCategoryBackground()} transition-colors`}>
          <p className="text-sm text-gray-600">Your BMI</p>
          <h3 className="text-3xl font-bold text-proglo-purple">{bmi}</h3>
          <p className={`text-sm font-medium ${getCategoryColor()}`}>
            {category}
          </p>
          <p className="text-xs mt-2 text-gray-600">
            {category === 'Healthy Weight' 
              ? 'Your weight is within the healthy range for your height' 
              : `Consider consulting a healthcare professional about your ${category.toLowerCase()} BMI`}
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t border-purple-100 bg-gray-50">
        <Button 
          className="w-full bg-proglo-purple hover:bg-proglo-dark-purple" 
          onClick={handleSave}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Results
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BMICalculator;
