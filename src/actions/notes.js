import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
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

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes))
  }
}

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})


export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    // conectar a firebase y actualizar
    // uid del usuario
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url
    }

    // to avoid save the id
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    const noteRef = doc(db, `${ uid }/journal/notes/${ note.id }`);

    try {
      await updateDoc(noteRef, noteToFirestore);
      // we dispatch note with its id
      dispatch(refreshNote(note));
      Swal.fire('Saved', note.title, 'success');
      
    } catch (error) {
      Swal.fire('Not Saved', error.code, 'error');
    }
  }
}

export const refreshNote = (note) => ({
  type: types.notesUpdate,
  payload: note
})