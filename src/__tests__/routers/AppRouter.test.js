import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom'; ????

import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/auth';
import { act } from '@testing-library/react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// SweetAlert Mock
/**
 * import Swal from 'sweetalert2'
 * 
 * jest.mock('sweetalert2', () => ({
 *  fire: jest.fn()
 * }));
 */

jest.mock('../../actions/auth', () => ({
  login: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: {},
    notes: [],
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Test on <AppRouter />', () => {
  test('should call login action if it is authenticated', async () => {
    let user;
    await act( async () => {
      // sign before usign AppRouter so it can useEffect can use login action
      const auth = getAuth();
      const userCred = await signInWithEmailAndPassword(auth, 'test@testing.com', 'secret');
      user = userCred.user;

      mount(
        <Provider store={ store }>
          <AppRouter />;
        </Provider>
      )
    });

    // console.log(user);
    expect(login).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith(user.uid, user.displayName);    
  });
});
