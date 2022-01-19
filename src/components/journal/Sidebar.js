import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { JournalEntries } from './JournalEntries';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {

  const dispatch = useDispatch();

  // useSelector gets the state from store
  const { name } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(startLogout())
    // later clean notes and journal for current user
  }

  const handleAddNew = () => {
    dispatch(startNewNote());
  }

  return (
    <aside className="journal__sidebar">

      <div className="journal__sidebar-navbar">
        <h3 className="mt-1">
          <i className="fas fa-book" />
          <span>{ name }</span>
        </h3>

        {/* dropdown to implement */}
        <button
          className="btn btn-danger"
          onClick={ handleLogout }
        >
          <i className="fas fa-sign-out-alt"></i>&nbsp;
          Logout
        </button>

      </div>

      <div className="journal__forecast">
        <div className="journal__forecast-datetime">
          <p>Friday</p>
          <span >January 13, 2022</span>
        </div>
        <div className="journal__forecast-temperature">
          <p className="unit">
            <i className="far fa-sun"></i>&nbsp;34<i>&deg;</i>
          </p>
          <span>Seul</span>
        </div>

      </div>

      <div
        className="journal__new-entry"
        onClick={ handleAddNew }
      >
        <i className="fas fa-sticky-note" />&nbsp;
        <p>New entry</p>
      </div>


      <JournalEntries />

    </aside>
  )
}
