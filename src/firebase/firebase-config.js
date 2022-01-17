import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// const firebaseConfigTesting = {
//   apiKey: "AIzaSyCMyU5ArcC33s4ylvoY7m9h8NAW_1emHlw",
//   authDomain: "firestore-test-journal.firebaseapp.com",
//   projectId: "firestore-test-journal",
//   storageBucket: "firestore-test-journal.appspot.com",
//   messagingSenderId: "419151579130",
//   appId: "1:419151579130:web:dbe842f2cec2926078c643"
// };

// if (process.env.NODE_ENV === 'test') {
//   // test env
//   initializeApp(firebaseConfigTesting);
// } else {
//   // produc or dev
//   initializeApp(firebaseConfig);
// }

initializeApp(firebaseConfig);

// inicialize firebase
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
}
