import { useEffect, useState } from 'react';
import { getMessaging, getToken,onMessage } from 'firebase/messaging';
import firebaseApp from '../firebase/firebase';

let messaging:any;
const useFcmToken = () => {
  const [token, setToken] = useState('');
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
           messaging = getMessaging(firebaseApp);
          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);
          // Check if permission is granted before retrieving the token
          if (permission === 'granted') {
            const currentToken = await getToken(messaging, {
              vapidKey:
                'BENmLvJ2YoRfDXqn-zonUTZyQBLqrLOxlaFuyzUHVVIUiWE-lUEPX-l-gB9MMr9Yka_ZsN-1q-MmqCjj_MWKdAc',
            });
            if (currentToken) {
              setToken(currentToken);
            } else {
              console.log(
                'No registration token available. Request permission to generate one.'
              );
            }
          }
        }
      } catch (error) {
        console.log('An error occurred while retrieving token:', error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus,messaging };
};
export const useMessage = () => {
  const [messages, setmessages] = useState<any>();
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      setmessages(payload)
      // ...
    });
  }
}catch (error) {
  console.log('An error occurred while retrieving token:', error);
}
  },[])
  return { messages };
}
export function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then(async(permission) => {
    if (permission === 'denied') {
    
      console.log('Notification permission granted.');
    }
    console.log(permission)
  })}
export default useFcmToken;