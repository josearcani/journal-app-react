import { authReducer } from '../../reducers/authReducer'
import { types } from '../../types/types';

describe('Test on authReducer', () => {
  
  const prevState = {
    name:'sheng',
    uid:'2123kn123un'
  }

  test('should return uid and name using action login', () => {
    const action = {
      type: types.login,
      payload: {
        uid: '523234jb523k4jbkb',
        displayName: 'sheng'
      }
    }
    const state = authReducer(prevState, action);
    expect(state).toEqual({ uid: '523234jb523k4jbkb', name: 'sheng' });
  })
  
  test('should return an empty state using logout action', () => {
    const state = authReducer(prevState, { type: types.logout });
    expect(state).toEqual({});
  })

  test('should return the same state using no valid action', () => {
    const state = authReducer(prevState, { type: types.notesDelete });
    expect(state).toEqual(prevState);
  })

})
