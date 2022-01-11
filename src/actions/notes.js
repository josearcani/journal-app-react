import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // { auth, notes, ui }
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }
    // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    const docRef = await addDoc(collection(db ,`${uid}/journal/notes`), newNote);
    dispatch(noteActive(docRef.id, newNote))
  }
}

export const noteActive = (id, newNote) => ({
  type: types.notesActive,
  payload: {
    id,
    ...newNote
  }
})
