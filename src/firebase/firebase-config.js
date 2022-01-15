import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAv30DCKQLGl7ELxQPLqFOrlnv7f2hcDcU",
  authDomain: "react-app-udemy-52a38.firebaseapp.com",
  projectId: "react-app-udemy-52a38",
  storageBucket: "react-app-udemy-52a38.appspot.com",
  messagingSenderId: "102652422381",
  appId: "1:102652422381:web:17a11232a76a38dfa8c4e4"
};

const firebaseConfigTesting = {
  apiKey: "AIzaSyCMyU5ArcC33s4ylvoY7m9h8NAW_1emHlw",
  authDomain: "firestore-test-journal.firebaseapp.com",
  projectId: "firestore-test-journal",
  storageBucket: "firestore-test-journal.appspot.com",
  messagingSenderId: "419151579130",
  appId: "1:419151579130:web:dbe842f2cec2926078c643"
};

if (process.env.NODE_ENV === 'test') {
  // test env
  initializeApp(firebaseConfigTesting);
} else {
  // produc or dev
  initializeApp(firebaseConfig);
}

// inicialize firebase
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
}
