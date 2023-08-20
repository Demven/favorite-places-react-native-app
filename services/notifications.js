import { Alert, Platform } from 'react-native';
import {
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  scheduleNotificationAsync,
  setNotificationChannelAsync,
  setNotificationHandler
} from 'expo-notifications';

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

let pushToken = '';

export function sendNotification (place) {
  return scheduleNotificationAsync({
    content: {
      title: 'New favorite place added',
      body: `"${place.title}" - ${place.address}`,
      data: place,
    },
    trigger: {
      seconds: 3,
    },
  });
}

export function sendNotificationViaAPI (place) {
  return fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: pushToken,
      title: 'New favorite place added',
      body: `"${place.title}" - ${place.address}`,
    }),
  });
}

export async function configurePushNotifications () {
  const { status } = await getPermissionsAsync();

  if (status !== 'granted') {
    const { status } = await requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission is required', 'The app requires Push Notifications access');
      return;
    }
  }

  pushToken = (await getExpoPushTokenAsync()).data;

  if (Platform.OS === 'android') {
    await setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.DEFAULT,
    });
  }

  return pushToken;
}
