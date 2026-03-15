import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.boysatwork.app',
  appName: 'Boys@Work',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    cleartext: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2500,
      launchAutoHide: true,
      backgroundColor: '#F3732A',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'Dark',
      backgroundColor: '#0F0F1A',
      overlaysWebView: false,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#F3732A',
      sound: 'default',
    },
    Camera: {
      permissions: ['camera', 'photos'],
    },
    Geolocation: {
      permissions: ['location'],
    },
  },
}

export default config
