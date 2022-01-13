import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';

import { JournalScreen } from '../components/journal/JournalScreen';
import { Spinner } from '../components/iu/Spinner';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const [checking, setChecking] = useState(true);
  // to check if someone is authenticated before using routes
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // if logged cannot see login screen | private and public routes

  const dispatch = useDispatch()

  // this is very important to keep auth when reloading
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      // if not authenticated user = null
      if (user?.uid) {
        // means that user has properties and this wont crash
        dispatch(login(user.uid, user.displayName));
        dispatch(startLoadingNotes(user.uid))
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setChecking(false);
    })
    // dependency of dispatch does not change actually
  }, [ dispatch, setChecking, setIsLoggedIn ])

  if (checking) {
    return <Spinner />
  }

  return (
    <BrowserRouter>
      <div>
        <Switch>

          <PublicRoute
            path="/auth"
            component={ AuthRouter }
            isAuth={ isLoggedIn }
          />

          <PrivateRoute
            exact
            path="/"
            component={ JournalScreen }
            isAuth={ isLoggedIn }
          />

          <Redirect to="/auth/login" />

        </Switch>
      </div>
    </BrowserRouter>
  )
  

}
