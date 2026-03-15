import { PushNotifications } from '@capacitor/push-notifications'
import { LocalNotifications } from '@capacitor/local-notifications'
import { Capacitor } from '@capacitor/core'

export async function registerPushNotifications() {
  if (!Capacitor.isNativePlatform()) return

  const permission = await PushNotifications.requestPermissions()
  if (permission.receive === 'granted') {
    await PushNotifications.register()
  }
}

export async function scheduleLocalNotification(title: string, body: string, delaySeconds = 1) {
  if (!Capacitor.isNativePlatform()) return
  await LocalNotifications.schedule({
    notifications: [{
      id: Date.now(),
      title,
      body,
      schedule: { at: new Date(Date.now() + delaySeconds * 1000) },
      sound: 'default',
      smallIcon: 'ic_stat_icon_config_sample',
    }],
  })
}
