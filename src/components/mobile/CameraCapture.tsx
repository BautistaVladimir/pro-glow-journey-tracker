import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { cameraService, PhotoResult } from '@/services/cameraService';
import { toast } from 'sonner';

interface CameraCaptureProps {
  onPhotoTaken: (photo: PhotoResult) => void;
  title?: string;
  description?: string;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onPhotoTaken,
  title = "Take Photo",
  description = "Capture a photo using your device's camera"
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastPhoto, setLastPhoto] = useState<PhotoResult | null>(null);

  const handleTakePhoto = async () => {
    setIsLoading(true);
    try {
      const hasPermission = await cameraService.requestPermissions();
      if (!hasPermission) {
        toast.error('Camera permissions are required to take photos');
        return;
      }

      const photo = await cameraService.takePhoto();
      setLastPhoto(photo);
      onPhotoTaken(photo);
      toast.success('Photo captured successfully!');
    } catch (error) {
      console.error('Error taking photo:', error);
      toast.error('Failed to take photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFromGallery = async () => {
    setIsLoading(true);
    try {
      const hasPermission = await cameraService.requestPermissions();
      if (!hasPermission) {
        toast.error('Photo permissions are required to select images');
        return;
      }

      const photo = await cameraService.selectFromGallery();
      setLastPhoto(photo);
      onPhotoTaken(photo);
      toast.success('Photo selected successfully!');
    } catch (error) {
      console.error('Error selecting photo:', error);
      toast.error('Failed to select photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="proglo-card">
      <CardHeader className="proglo-card-header">
        <CardTitle className="flex items-center">
          <Camera className="h-5 w-5 mr-2 text-proglo-purple" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleTakePhoto}
            disabled={isLoading}
            className="flex-1 proglo-button"
          >
            <Camera className="h-4 w-4 mr-2" />
            {isLoading ? 'Taking Photo...' : 'Take Photo'}
          </Button>
          <Button
            onClick={handleSelectFromGallery}
            disabled={isLoading}
            variant="outline"
            className="flex-1"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Select from Gallery
          </Button>
        </div>

        {lastPhoto && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                Photo Ready
              </Badge>
              <span className="text-sm text-muted-foreground">
                Format: {lastPhoto.format}
              </span>
            </div>
            <div className="relative overflow-hidden rounded-lg border">
              <img
                src={lastPhoto.dataUrl}
                alt="Captured photo"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        )}

        <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Camera Tips:</p>
            <ul className="mt-1 list-disc list-inside text-blue-700">
              <li>Ensure good lighting for better quality</li>
              <li>Hold device steady when taking photos</li>
              <li>Photos are stored locally on your device</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};