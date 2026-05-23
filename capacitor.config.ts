import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sasalle.hotel',
  appName: 'Sasalle Hotel',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
