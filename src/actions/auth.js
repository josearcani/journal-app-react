import Swal from 'sweetalert2';
import {
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile,
} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { startLoading, finishLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
      .catch((error) => {
        // {"code":"auth/user-not-found","customData":{},"name":"FirebaseError"}
        console.log(error.code, '****', error.message);
        Swal.fire(
          'Error',
          'The password is invalid or the user does is not registered',
          'error'
        )
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
      .catch((error) => {
        // console.log(error.message);
        Swal.fire(
          'Error',
          error.message,
          'error'
        )
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

export const logout = () => ({
  type: types.logout,
})

export const logoutCleaning = () => ({
  type: types.notesLogoutCleaning
})

export const startLogout = () => {
  return async (dispatch) => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(logout());
    dispatch(logoutCleaning());
  }
}
