import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface PhotoResult {
  dataUrl: string;
  format: string;
}

class CameraService {
  async takePhoto(): Promise<PhotoResult> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      return {
        dataUrl: image.dataUrl!,
        format: image.format
      };
    } catch (error) {
      console.error('Error taking photo:', error);
      throw new Error('Failed to take photo');
    }
  }

  async selectFromGallery(): Promise<PhotoResult> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      return {
        dataUrl: image.dataUrl!,
        format: image.format
      };
    } catch (error) {
      console.error('Error selecting photo:', error);
      throw new Error('Failed to select photo');
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const permissions = await Camera.requestPermissions();
      return permissions.camera === 'granted' && permissions.photos === 'granted';
    } catch (error) {
      console.error('Error requesting camera permissions:', error);
      return false;
    }
  }
}

export const cameraService = new CameraService();