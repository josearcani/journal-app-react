/**
 * @jest-environment node
 */
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../../firebase/firebase-config';
import { addNewNote, noteActive, setNotes, startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  auth: {
    uid: 'TESTING'
  },
  notes: {
    active: {
      id: 'ZnWNg1rTKI7C179puWe4',
      title: 'hello',
      body: 'world'
    }
  }
});

// fileUpload triggered by startUploading
jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn()
}))

describe('Test on notes actions', () => {

  beforeEach(() => {
    store.clearActions()
  })

  test('should action startNewNote create a new note', async () => {

    await store.dispatch(startNewNote());
    
    const actions = store.getActions(); // [ sync actions ]
    const { id, title, body, date } = actions[0].payload;

    expect(actions[0]).toEqual(noteActive(id, { title, body, date }));
    expect(actions[1]).toEqual(addNewNote(id, { title, body, date }));
    
    const noteRef = doc(db, `TESTING/journal/notes/${ id }`);
    await deleteDoc(noteRef);

    store.clearActions();

  });

  test('should startLoadingNotes load notes', async () => {
    
    await store.dispatch(startLoadingNotes('TESTING'));

    const actions = store.getActions();

    expect(actions[0]).toEqual(setNotes(expect.any(Array)));

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    }

    expect(actions[0].payload[0]).toMatchObject(expected);

  });

  test('should startSaveNote update a note', async () => {
    
    const note = {
      id: '0xr8vL8mvJ3EdczUtXiy',
      title: 'Flutter',
      body: 'A new framework'
    }

    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    expect(actions[0].type).toBe(types.notesUpdate);

    const docRef = doc(db, `TESTING/journal/notes/${ note.id }`);
    const noteSnap = await getDoc(docRef)
    expect(noteSnap.data().title).toEqual(note.title);

  })

  test('should startUploading update url property of note', async () => {
    fileUpload.mockReturnValue('https://test.com/url.png');
    const file = [];
    // data that fileUpload returns
    await store.dispatch(startUploading(file));

    // verify changes
    const docRef = doc(db, `TESTING/journal/notes/0xr8vL8mvJ3EdczUtXiy`);
    const noteSnap = await getDoc(docRef)

    expect(noteSnap.data().url).toBe('https://test.com/url.png');
    
  });

});
