import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { Capacitor } from '@capacitor/core'

export async function impactLight() {
  if (!Capacitor.isNativePlatform()) return
  await Haptics.impact({ style: ImpactStyle.Light })
}

export async function impactMedium() {
  if (!Capacitor.isNativePlatform()) return
  await Haptics.impact({ style: ImpactStyle.Medium })
}

export async function vibrate() {
  if (!Capacitor.isNativePlatform()) return
  await Haptics.vibrate({ duration: 200 })
}
