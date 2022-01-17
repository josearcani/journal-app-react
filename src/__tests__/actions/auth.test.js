import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  auth: {
    uid: 'TESTING'
  },
  notes: {}
});

describe('Test on auth actions', () => {

  beforeEach(() => {
    store.clearActions();
  })

  test('should login and logout create the expected action', () => {
    const uid = 'MARI23M243OI11';
    const displayName = 'Richard';    

    const loginAction = login(uid, displayName);
    const logOutAction = logout();

    expect(loginAction).toEqual({ type: types.login, payload: { uid, displayName } });
    expect(logOutAction).toEqual({ type: types.logout });
  });
  
  
  test('should startLogout cleaning notes', async () => {
    
    await store.dispatch(startLogout());
    const actions = store.getActions();
    
    expect(actions[0]).toEqual({ type: types.logout });
    expect(actions[1]).toEqual({ type: types.notesLogoutCleaning });
  });

  test('should startLoginEmailPassword must start', async () => {
    const email = 'test@testing.com';
    const pass = 'secret';
  
    await store.dispatch(startLoginEmailPassword(email, pass));
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: types.uiStartLoading });
    expect(typeof actions[1].payload.uid).toBe('string');
    expect(actions[2]).toEqual({ type: types.uiFinishLoading });
  });
});
