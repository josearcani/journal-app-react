import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { NoteScreen } from '../../../components/notes/NoteScreen';
import { noteActive } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
  noteActive: jest.fn()
}))

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
    active: {
      id: '1234',
      title: 'Hello',
      body: 'world',
      date: 699669
    },
    notes: [],
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <NoteScreen />
  </Provider>
);

describe('Test on <NoteScreen />', () => {

  test('should NoteScreen render normally', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call activeNote action when changing values', () => {
    wrapper.find('input[type="text"]').simulate('change', {
      target: { name: 'title', value: 'secret' }
    })

    expect(noteActive).toHaveBeenCalled(); 
    expect(noteActive).toHaveBeenLastCalledWith('1234', {
      id: '1234',
      title: 'secret',
      body: 'world',
      date: 699669
    });
  });
});
