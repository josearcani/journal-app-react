import { uiReducer } from '../../reducers/uiReducer';
import { types } from '../../types/types';

describe('Test on uiReducer', () => {

  const prevState = {
    loading: false,
    msgError: null
  }

  test('should action uiSetError return data on msgError', () => {
    const action = {
      type: types.uiSetError,
      payload: 'There is and error'
    }

    const state = uiReducer(prevState, action);
    expect(state).toEqual({ ...prevState, msgError: 'There is and error' });
  });

  test('should action uiRemoveError return null on msgError', () => {
    const action = {
      type: types.uiRemoveError
    }

    const state = uiReducer(prevState, action);
    expect(state).toEqual({ ...prevState, msgError: null });
  });
  
  test('should action uiStartLoading return true', () => {
    const action = {
      type: types.uiStartLoading
    }

    const state = uiReducer(prevState, action);
    expect(state).toEqual({ ...prevState, loading: true });
  });

  test('should action uiFinishLoading return false', () => {
    const action = {
      type: types.uiFinishLoading
    }

    const state = uiReducer(prevState, action);
    expect(state).toEqual({ ...prevState, loading: false });
  });

})
