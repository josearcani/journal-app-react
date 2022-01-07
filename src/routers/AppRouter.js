import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';


export const AppRouter = () => {
  
  const dispatch = useDispatch()

  // this is very important to keep auth when reloading
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // if not authenticated user = null
      console.log(user)
      if (user?.uid) {
        // means that user has properties and this wont crash
        dispatch(login(user.uid, user.displayName))
      }
    })
    // dependency of dispatch does not change actually
  }, [dispatch])

  return (
    <BrowserRouter>
      <div>
        <Switch>

          <Route path="/auth" component={ AuthRouter } />
          <Route exact path="/" component={ JournalScreen } />
          <Redirect to="/auth/login" />

        </Switch>
      </div>
    </BrowserRouter>
  )
  

}
