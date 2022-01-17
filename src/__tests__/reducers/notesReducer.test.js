import { notesReducer } from '../../reducers/notesReducer';
import { types } from '../../types/types';

describe('Test on noteReducer', () => {

  const prevState = {
    notes: [
      {
        id: 'asgkano4ro1i324oi5',
        title: 'title1',
        body:'body1'
      },
      {
        id: 'PPFSENINGK23N4KN3QK4N14KN',
        title: 'title2',
        body:'body2'
      },
    ],
    active: null
  }

  test('should action notesActive return payload', () => {
    
    const action = {
      type: types.notesActive,
      payload: {
        id: 'KJ4KSRNINGK23N4KN3QK4N14KN',
        title: 'title',
        body:'body'
      }
    }

    const state = notesReducer(prevState, action);

    expect(state.active).toEqual({
      id: 'KJ4KSRNINGK23N4KN3QK4N14KN',
      title: 'title',
      body:'body'
    })

  });
  
  test('should action notesAddNew return new note', () => {
    
    const payload = {
      id: 'kn1k234nk123n4123',
      title: 'new',
      body:'new body'
    }

    const action = {
      type: types.notesAddNew,
      payload
    }

    const state = notesReducer(prevState, action);

    expect(state.notes).toEqual([ payload, ...prevState.notes])

  });

  test('should action notesLoad return notes', () => {
    
    const payload = [
      {
        id: 'kn1k234nk123n41',
        title: 'new1',
        body:'new body'
      },
      {
        id: 'kn1k234nk12123',
        title: 'new2',
        body:'new body'
      },
      {
        id: 'kn1k234n3n4123',
        title: 'new3',
        body:'new body'
      },
    ]

    const action = {
      type: types.notesLoad,
      payload
    }

    const state = notesReducer(prevState, action);

    expect(state.notes).toEqual(payload)

  });

  test('should action notesUpdate return updated notes', () => {
    
    const payload = {
      id: 'asgkano4ro1i324oi5',
      title: 'notesUpdate action',
      body:'body1'
    }

    const action = {
      type: types.notesUpdate,
      payload
    }

    const state = notesReducer(prevState, action);

    expect(state.notes[0]).toEqual(payload);

  });

  test('should action notesDelete return less notes', () => {

    const action = {
      type: types.notesDelete,
      payload: 'asgkano4ro1i324oi5'
    }

    const state = notesReducer(prevState, action);

    expect(state.notes.length).toBe(prevState.notes.length - 1);
    expect(state.active).toBe(null);

  });

  test('should action notesLogoutCleaning clean state', () => {

    const action = {
      type: types.notesLogoutCleaning,
    }

    const state = notesReducer(prevState, action);

    expect(state.notes.length).toBe(0);
    expect(state.active).toBe(null);

  });

})
