import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // { auth, notes, ui }
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }
    
    const docRef = await addDoc(collection(db ,`${uid}/journal/notes`), newNote);

    console.log(docRef);
  }
}