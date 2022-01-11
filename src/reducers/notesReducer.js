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
    default:
      return state;
  }
}