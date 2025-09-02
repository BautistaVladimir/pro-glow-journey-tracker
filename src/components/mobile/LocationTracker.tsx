import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import { locationService, LocationResult } from '@/services/locationService';
import { toast } from 'sonner';

interface LocationTrackerProps {
  onLocationCaptured: (location: LocationResult) => void;
  title?: string;
  description?: string;
}

export const LocationTracker: React.FC<LocationTrackerProps> = ({
  onLocationCaptured,
  title = "Track Location",
  description = "Get your current location for activity tracking"
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationResult | null>(null);

  const handleGetLocation = async () => {
    setIsLoading(true);
    try {
      const hasPermission = await locationService.requestPermissions();
      if (!hasPermission) {
        toast.error('Location permissions are required for location tracking');
        return;
      }

      const location = await locationService.getCurrentLocation();
      setCurrentLocation(location);
      onLocationCaptured(location);
      toast.success('Location captured successfully!');
    } catch (error) {
      console.error('Error getting location:', error);
      toast.error('Failed to get location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  const formatAccuracy = (accuracy: number) => {
    return accuracy < 1000 ? `${Math.round(accuracy)}m` : `${(accuracy / 1000).toFixed(1)}km`;
  };

  return (
    <Card className="proglo-card">
      <CardHeader className="proglo-card-header">
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-proglo-purple" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleGetLocation}
          disabled={isLoading}
          className="w-full proglo-button"
        >
          <Navigation className="h-4 w-4 mr-2" />
          {isLoading ? 'Getting Location...' : 'Get Current Location'}
        </Button>

        {currentLocation && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                Location Found
              </Badge>
              <span className="text-sm text-muted-foreground">
                Accuracy: {formatAccuracy(currentLocation.accuracy)}
              </span>
            </div>
            
            <div className="space-y-2 p-3 bg-slate-50 rounded-lg border">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">Coordinates:</span>
                <span className="text-sm font-mono text-slate-600">
                  {formatCoordinates(currentLocation.latitude, currentLocation.longitude)}
                </span>
              </div>
              
              {currentLocation.address && (
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-slate-700">Address:</span>
                  <span className="text-sm text-slate-600 text-right max-w-[200px]">
                    {currentLocation.address}
                  </span>
                </div>
              )}
            </div>

            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="text-sm font-medium text-purple-800 mb-2">Location Data:</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-medium">Latitude:</span>
                  <br />
                  <span className="font-mono">{currentLocation.latitude.toFixed(6)}</span>
                </div>
                <div>
                  <span className="font-medium">Longitude:</span>
                  <br />
                  <span className="font-mono">{currentLocation.longitude.toFixed(6)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Location Tips:</p>
            <ul className="mt-1 list-disc list-inside text-blue-700">
              <li>Enable location services for accurate tracking</li>
              <li>GPS works best outdoors with clear sky view</li>
              <li>Location data is stored locally on your device</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};