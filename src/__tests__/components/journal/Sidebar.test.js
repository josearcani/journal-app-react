import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

import { Sidebar } from '../../../components/journal/Sidebar';

jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn(),
}));

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid:'1',
    name: 'Joseph'
  },
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

const wrapper = mount(
  <Provider store={ store }>
    <Sidebar />
  </Provider>
)

describe('Test on <Sidebar />', () => {
  test('should Sidebar render normally', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call startLogout', () => {
    wrapper.find('.btn').simulate('click');
    expect(startLogout).toHaveBeenCalled();
  });
  
  test('should call startNewNote', () => {
    wrapper.find('.journal__new-entry').simulate('click');
    wrapper.find('.journal__new-entry').simulate('click');
    expect(startNewNote).toHaveBeenCalledTimes(2);
  });
});
