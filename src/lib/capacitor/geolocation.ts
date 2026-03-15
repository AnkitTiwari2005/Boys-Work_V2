import { Geolocation } from '@capacitor/geolocation'
import { Capacitor } from '@capacitor/core'

export async function getCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
  if (!Capacitor.isNativePlatform()) {
    return { lat: 28.5672, lng: 77.2100 } // Default: Lajpat Nagar, Delhi
  }
  const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
  return { lat: position.coords.latitude, lng: position.coords.longitude }
}
