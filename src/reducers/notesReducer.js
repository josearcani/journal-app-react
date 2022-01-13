/*

{
  notes: [],
  active: null // cuano no haya nota,
  active: {
    id: 'KJ4KSRNINGK23N4KN3QK4N14KN',
    title: '',
    body:'',
    imageUrl: '',
    date: 132412341
  }
}

*/

import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null
}
export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        }
      }
    
    case types.notesLoad:
      return {
        ...state,
        notes: [ ...action.payload ]
      }

    case types.notesUpdate:
      return {
        ...state,
        notes: state.notes.map(
          note => note.id === action.payload.id
            ? action.payload
            : note
        )
      }

    default:
      return state;
  }
}