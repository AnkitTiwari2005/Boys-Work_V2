import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { Capacitor } from '@capacitor/core'

export async function capturePhoto(): Promise<string | null> {
  if (!Capacitor.isNativePlatform()) {
    // Web fallback: use file input
    return null
  }
  const photo = await Camera.getPhoto({
    quality: 85,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
  })
  return photo.dataUrl ?? null
}

export async function pickFromGallery(): Promise<string | null> {
  if (!Capacitor.isNativePlatform()) return null
  const photo = await Camera.getPhoto({
    quality: 85,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Photos,
  })
  return photo.dataUrl ?? null
}
