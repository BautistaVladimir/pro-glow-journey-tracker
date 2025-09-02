import { Geolocation } from '@capacitor/geolocation';

export interface LocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
  address?: string;
}

class LocationService {
  async getCurrentLocation(): Promise<LocationResult> {
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });

      const result: LocationResult = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        accuracy: coordinates.coords.accuracy
      };

      // Try to get address from coordinates
      try {
        result.address = await this.reverseGeocode(result.latitude, result.longitude);
      } catch (error) {
        console.warn('Failed to get address:', error);
      }

      return result;
    } catch (error) {
      console.error('Error getting location:', error);
      throw new Error('Failed to get current location');
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const permissions = await Geolocation.requestPermissions();
      return permissions.location === 'granted';
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      return false;
    }
  }

  private async reverseGeocode(lat: number, lng: number): Promise<string> {
    try {
      // Using a free geocoding service - in production, consider using a paid service
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      return data.locality || data.city || data.principalSubdivision || 'Unknown location';
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return 'Unknown location';
    }
  }
}

export const locationService = new LocationService();