import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));

const wrapper = mount(
  <Provider store={ store }>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe('Test on <LoginScreen />', () => {

  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  })

  test('should LoginScreen render normally', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should startGoogleLogin action been called', () => {
    wrapper.find('.google-btn').simulate('click');

    expect(startGoogleLogin).toHaveBeenCalled();
  })
  
  test('should startLoginEmailPassword use correct values', () => {
    // email: 'test@testing.com',
    // password: 'secret',

    // this is not necesary for testing
    wrapper.find('input[type="text"]').simulate('change', {
      target: { name: 'email', value: 'test@testing.com' }
    });
    wrapper.find('input[type="password"]').simulate('change', {
      target: { name: 'password', value: 'secret' }
    });
    wrapper.find('form').simulate('submit', { preventDefault(){} });

    expect(startLoginEmailPassword).toHaveBeenCalled();
    expect(startLoginEmailPassword).toHaveBeenLastCalledWith('test@testing.com', 'secret');
  });
});
