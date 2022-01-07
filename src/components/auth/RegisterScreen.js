import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

  const dispatch = useDispatch();

  // the cb inside useSelector returns the entire state { auth, ui }
  const { msgError } = useSelector( state => state.ui);

  // console.log( msgError);

  const [ formValues, handleInputChange ] = useForm({
    name: 'Joseph',
    email: 'test1@test.com',
    password: 'secret',
    password2: 'secret',
  })

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }

  }

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch( setError('name is required') )
      return false

    } else if (!validator.isEmail(email)) {
      dispatch( setError('Email is not valid') )
      return false

    } else if (!validator.isLength(password, { min: 5, max: 15 })) {
      dispatch( setError('password should be at least 6 characters') )
      return false

    } else if (password !== password2) {
      dispatch( setError('password should be the same') )
      return false

    }
    // true only when is valid
    dispatch( removeError())
    return true
  }

  return (
    <>
    <h3 className="auth__title">Register</h3>
    <form onSubmit={ handleRegister }>

      { msgError && <div className="auth__alert-error">
        { msgError }
      </div> }

      <input
        type="text"
        placeholder="Name"
        name="name"
        autoComplete="off"
        className="auth__input"
        value={ name }
        onChange={ handleInputChange }
      />

      <input
        type="email"
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

      <input
        type="password"
        placeholder="Confirm password"
        name="password2"
        autoComplete="off"
        className="auth__input"
        value={ password2 }
        onChange={ handleInputChange }
      />

      <button
        type="submit"
        className="btn btn-primary btn-block mb-1"
        // disabled={true}
      >
        Register
      </button>

      
      <Link to="/auth/login" className="link">
        Already registered?
      </Link>
    </form>
  </>
  )
}
