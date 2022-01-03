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

// inicialize firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
}
