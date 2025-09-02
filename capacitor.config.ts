import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.proglo.journey.tracker',
  appName: 'ProGlo Journey Tracker',
  webDir: 'dist',
  server: {
    url: 'https://339032d4-af90-487e-9dfa-fa5ca61c6644.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    },
    Geolocation: {
      permissions: ['location']
    }
  }
};

export default config;