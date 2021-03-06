import { types } from "../types/types";

const initialState = {
  loading: false,
  msgError: null,
  toggle: false,
}

export const uiReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      }
  
    case types.uiRemoveError:
      return {
        ...state,
        msgError: null,
    }
    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
    }
    case types.uiFinishLoading:
      return {
        ...state,
        loading: false,
    }
    case types.uiToggle:
      return {
        ...state,
        toggle: !state.toggle
      }
    case types.uiOpenToggle:
      return {
        ...state,
        toggle: false
      }
      case types.uiCloseToggle:
        return {
          ...state,
        toggle: true
      }
    default:
      return state;
  }
}
