import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

import validator from 'validator';
import { removeError, setError } from '../../actions/ui';

import { useForm } from '../../hooks/useForm';


export const LoginScreen = () => {
  
  const dispatch = useDispatch();

  const { msgError, loading } = useSelector(state => state.ui);

  const [ formValues, handleInputChange ] = useForm({
    email: 'test1@test.com',
    password: 'secret',
  })
  
  const { email, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password))
    }
  }

  const handleGoogleLogin = () => {
    dispatch( startGoogleLogin() );
  }

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'))
      return false
    } else if (password.trim().length === 0) {
      dispatch(setError('no valid password'))
      return false
    }
    dispatch(removeError())
    return true
  }

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form
        onSubmit={ handleSubmit }
        className="animate__animated animate__fadeIn"
      >
        { msgError && <div className="auth__alert-error">
          { msgError }
        </div> }
        <input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          className="auth__input"
          value={ email }
          onChange={ handleInputChange }
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={ password }
          onChange={ handleInputChange }
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={ loading }
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div 
            className="google-btn"
            onClick={ handleGoogleLogin }
          >
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              Sign in with google
            </p>
          </div>
        </div>
        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  )
}
