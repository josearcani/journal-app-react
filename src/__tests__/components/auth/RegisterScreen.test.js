import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

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

const wrapper = mount(
  <Provider store={ store }>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe('Test on <RegisterScreen /> component', () => {
  
  beforeEach(() => {
    store.clearActions()
    // store = mockStore(initState);
    // jest.clearAllMocks();
  });
  
  test('should RegisterScreen render normally', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should submit fail due to empty fields', () => {
    wrapper.find('input[type="email"]').simulate('change', {
      target: { name: 'email', value: '' }
    });
    // console.log(wrapper.find('input[type="email"]').html());
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    })

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Email is not valid'
    });
  });

  test('should show alert error message', () => {
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Email not correct!!'
      }
    };
    
    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe('Email not correct!!');
  });
});
