import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Camera, MapPin, Database, Users, Shield } from 'lucide-react';
import { CameraCapture } from '@/components/mobile/CameraCapture';
import { LocationTracker } from '@/components/mobile/LocationTracker';
import { PhotoResult } from '@/services/cameraService';
import { LocationResult } from '@/services/locationService';
import { localDB } from '@/services/localDatabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const MobileDemo = () => {
  const { user } = useAuth();
  const [capturedPhotos, setCapturedPhotos] = useState<PhotoResult[]>([]);
  const [trackedLocations, setTrackedLocations] = useState<LocationResult[]>([]);

  const handlePhotoTaken = async (photo: PhotoResult) => {
    setCapturedPhotos(prev => [...prev, photo]);
    
    // Save activity with photo to local database
    if (user) {
      try {
        await localDB.addActivity({
          user_id: user.id,
          type: 'photo_activity',
          duration: 1,
          calories_burned: 0,
          intensity: 'low',
          date: new Date().toISOString().split('T')[0],
          photo: photo.dataUrl
        });
        toast.success('Activity with photo saved locally!');
      } catch (error) {
        console.error('Error saving activity:', error);
      }
    }
  };

  const handleLocationCaptured = async (location: LocationResult) => {
    setTrackedLocations(prev => [...prev, location]);
    
    // Save activity with location to local database
    if (user) {
      try {
        await localDB.addActivity({
          user_id: user.id,
          type: 'location_activity',
          duration: 1,
          calories_burned: 0,
          intensity: 'low',
          date: new Date().toISOString().split('T')[0],
          location: {
            lat: location.latitude,
            lng: location.longitude,
            address: location.address
          }
        });
        toast.success('Activity with location saved locally!');
      } catch (error) {
        console.error('Error saving activity:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100 shadow-sm animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight proglo-gradient-text">ProGlo Journey Tracker</h1>
            <p className="text-gray-600 mt-1">Mobile Health & Fitness Companion</p>
          </div>
          <Badge className="bg-proglo-purple hover:bg-proglo-dark-purple">
            <Smartphone className="h-3.5 w-3.5 mr-1" />
            Mobile App
          </Badge>
        </div>
      </div>

      {/* App Features Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="proglo-card stagger-animate-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Multi-Page App</CardTitle>
            <Users className="h-4 w-4 text-proglo-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-proglo-purple">8+</div>
            <p className="text-xs text-muted-foreground">
              Login, Register, Dashboard, Profile, BMI, Activities, Nutrition, Sleep
            </p>
          </CardContent>
        </Card>
        
        <Card className="proglo-card stagger-animate-1" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hardware APIs</CardTitle>
            <Camera className="h-4 w-4 text-proglo-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-proglo-purple">2</div>
            <p className="text-xs text-muted-foreground">
              Camera & GPS Location Services
            </p>
          </CardContent>
        </Card>
        
        <Card className="proglo-card stagger-animate-1" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Local Database</CardTitle>
            <Database className="h-4 w-4 text-proglo-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-proglo-purple">Offline</div>
            <p className="text-xs text-muted-foreground">
              Complete offline data storage with Capacitor Preferences
            </p>
          </CardContent>
        </Card>
        
        <Card className="proglo-card stagger-animate-1" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Secure Auth</CardTitle>
            <Shield className="h-4 w-4 text-proglo-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-proglo-purple">Local</div>
            <p className="text-xs text-muted-foreground">
              Secure local authentication system
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Problem Statement */}
      <Card className="proglo-card">
        <CardHeader className="proglo-card-header">
          <CardTitle className="text-xl font-bold proglo-gradient-text">The Problem We Solve</CardTitle>
          <CardDescription>Why ProGlo Journey Tracker exists</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">Fragmented Health Data</h3>
              <p className="text-sm text-red-700">
                People use multiple apps to track different aspects of their health, making it hard to see the complete picture.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2">Lack of Context</h3>
              <p className="text-sm text-orange-700">
                Most fitness apps don't capture where and when activities happen, missing valuable context.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">No Visual Evidence</h3>
              <p className="text-sm text-yellow-700">
                Traditional health apps rely on manual logging without visual proof of activities and meals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solution */}
      <Card className="proglo-card">
        <CardHeader className="proglo-card-header">
          <CardTitle className="text-xl font-bold proglo-gradient-text">Our Mobile Solution</CardTitle>
          <CardDescription>How ProGlo solves these problems using mobile technology</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-proglo-purple mb-3 flex items-center">
                <Camera className="h-4 w-4 mr-2" />
                Camera Integration
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Photo documentation of meals for nutrition tracking</li>
                <li>• Before/after progress photos</li>
                <li>• Activity proof and motivation</li>
                <li>• Visual food diary</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-proglo-purple mb-3 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                GPS Location Services
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Automatic activity location tracking</li>
                <li>• Route mapping for outdoor activities</li>
                <li>• Location-based recommendations</li>
                <li>• Contextual activity logging</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Demo Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <CameraCapture
          onPhotoTaken={handlePhotoTaken}
          title="📸 Camera Demo"
          description="Test the camera functionality - take photos or select from gallery"
        />
        
        <LocationTracker
          onLocationCaptured={handleLocationCaptured}
          title="🗺️ GPS Demo"
          description="Test location services - get your current coordinates"
        />
      </div>

      {/* Demo Results */}
      {(capturedPhotos.length > 0 || trackedLocations.length > 0) && (
        <Card className="proglo-card">
          <CardHeader className="proglo-card-header">
            <CardTitle>Demo Results</CardTitle>
            <CardDescription>Hardware API test results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {capturedPhotos.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">📸 Photos Captured: {capturedPhotos.length}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {capturedPhotos.slice(-4).map((photo, index) => (
                    <img
                      key={index}
                      src={photo.dataUrl}
                      alt={`Captured ${index + 1}`}
                      className="w-full h-20 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>
            )}
            
            {trackedLocations.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">🗺️ Locations Tracked: {trackedLocations.length}</h3>
                <div className="space-y-2">
                  {trackedLocations.slice(-3).map((location, index) => (
                    <div key={index} className="p-2 bg-slate-50 rounded text-sm">
                      <div className="font-mono">
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                      </div>
                      {location.address && (
                        <div className="text-slate-600">{location.address}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Technical Architecture */}
      <Card className="proglo-card">
        <CardHeader className="proglo-card-header">
          <CardTitle className="text-xl font-bold proglo-gradient-text">Technical Architecture</CardTitle>
          <CardDescription>Built with modern mobile-first technologies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Frontend</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• React 18 + TypeScript</li>
                <li>• Tailwind CSS + Design System</li>
                <li>• Capacitor for Native APIs</li>
                <li>• Responsive Mobile-First Design</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Mobile APIs</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• @capacitor/camera</li>
                <li>• @capacitor/geolocation</li>
                <li>• @capacitor/preferences</li>
                <li>• Native iOS/Android deployment</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">Data Storage</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Local-first architecture</li>
                <li>• Offline data persistence</li>
                <li>• Secure local authentication</li>
                <li>• Cross-platform compatibility</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDemo;