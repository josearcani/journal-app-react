import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { noteActive } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const notes = {
  id: 123,
  title: 'Test title',
  body: 'I am a body',
  url: 'https://somehow.test/noPicture.jpg',
  date: 8998989
}

const wrapper = mount(
  <Provider store={ store }>
    <JournalEntry { ...notes } />
  </Provider>
);

describe('Test on <JournalEntry />', () => {
  test('should JournalEntry render normally', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('should call activeNote action', () => {
    wrapper.find('.journal__entry').simulate('click');

    expect(store.dispatch).toHaveBeenCalledWith(
      noteActive(notes.id, { ...notes })
    )
  });
});
