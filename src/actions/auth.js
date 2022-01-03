import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';

// async action
export const startLoginEmailPassword = (email, password) => {
  // use fetch or axios to get data

  return (dispatch) => {
    setTimeout(() => {
      dispatch( login('asfasi23534on32', 'Gerardo') )
    }, 1500);
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
  }
}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName
  }
})
