import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

import { useForm } from '../../hooks/useForm';


export const LoginScreen = () => {
  
  const dispatch = useDispatch();

  const [ formValues, handleInputChange ] = useForm({
    email: 'test@test.com',
    password: '123456',
  })
  
  const { email, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(startLoginEmailPassword(email, password))

  }

  const handleGoogleLogin = () => {
    dispatch( startGoogleLogin() );
  }

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={ handleSubmit }>
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
          // disabled={true}
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
              <b>Sign in with google</b>
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
