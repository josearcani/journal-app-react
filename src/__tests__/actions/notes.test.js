import { deleteDoc, doc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../../firebase/firebase-config';
import { addNewNote, noteActive, startNewNote } from '../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  auth: {
    uid: 'TESTING'
  }
});

describe('Test on notes actions', () => {

  test('should action startNewNote create a new note', async () => {

    await store.dispatch(startNewNote());
    
    const actions = store.getActions(); // [ sync actions ]
    const { id, title, body, date } = actions[0].payload;

    expect(actions[0]).toEqual(noteActive(id, { title, body, date }));
    expect(actions[1]).toEqual(addNewNote(id, { title, body, date }));
    
    // await store.dispatch(startDeleting(id)); // THIS BRINGS AN ERROR FROM SWEETALERT
    // expect(actions[2]).toEqual(deleteNote(id));
    const noteRef = doc(db, `TESTING/journal/notes/${ id }`);
    await deleteDoc(noteRef);

  })

  

})
