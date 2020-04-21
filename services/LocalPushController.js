import PushNotification from 'react-native-push-notification'
PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      console.log('LOCAL NOTIFICATION ==>', notification)
    },
  popInitialNotification: true,
    requestPermissions: true
  })
  export const LocalNotification = (title, largeMessage) => {
    PushNotification.localNotification({
      autoCancel: true,
      title: title,
      message: 'Expand me to see more',
      bigText:largeMessage,
      color: "red",
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',

    })
  }
  export const LocalNotificationSchedule=()=>{
    PushNotification.localNotificationSchedule({
      message: "My Notification Message", // (required)
      date: new Date(Date.now() + 5 * 1000)
    })
  }