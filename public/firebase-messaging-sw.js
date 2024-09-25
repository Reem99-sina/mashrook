// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');
if ('serviceWorker' in navigator) {
  console.log(navigator,"navigator")
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  }
const firebaseConfig = {
  apiKey: 'your_keys',
  authDomain: 'your_keys',
  projectId: 'your_keys',
  storageBucket: 'your_keys',
  messagingSenderId: 'your_keys',
  appId: 'your_keys',
  measurementId: 'your_keys',
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };
  console.log(registration,"registration")
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

