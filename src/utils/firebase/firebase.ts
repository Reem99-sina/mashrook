import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC3Z-7Ng_AlRSQeJzBAIsJiu20aK_jp-HQ',
  authDomain: 'mashrook-d59e2.firebaseapp.com',
  projectId: 'mashrook-d59e2',
  storageBucket:  "mashrook-d59e2.appspot.com",
  messagingSenderId: '381192522995',
  appId: '1:381192522995:web:6f8c0bad7126e8fc79fb86',
  measurementId: 'G-CDR1LEWSFJ',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
