import React from 'react'
import { Notifications, Permissions } from 'expo'
import {AsyncStorage} from 'react-native'

const NOTIFICATION_KEY = 'UdaciCards:notifications'


export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Quiz your knowledge!',
    body: "👋 don't forget to complete a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}


export function setLocalNotification (tomorrow=false) {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let startNotificationDate = new Date();
              if(tomorrow)
                startNotificationDate.setDate(startNotificationDate.getDate() + 1)
              startNotificationDate.setHours(8,0,0)

              Notifications.scheduleLocalNotificationAsync (
                createNotification(),
                {
                  time: startNotificationDate,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
