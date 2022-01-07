import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { startLoading, finishLoading } from './ui';

// async action
export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        dispatch(finishLoading())
      })
  }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then( async ({ user }) => {
        await updateProfile( user, { displayName: name })
        console.log(user)
        dispatch(login(user.uid, user.displayName))
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch(finishLoading())
      })
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
