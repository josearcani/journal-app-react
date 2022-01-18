import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { noteActive } from '../../actions/notes';

export const JournalEntry = ({ id, title, body, url, date }) => {

  const noteDate = moment(date);
  const dispatch = useDispatch();

  const handleEntryClick = () => {
    dispatch(noteActive(id, { title, body, date, url }));
  }

  return (
    <div
      className="journal__entry animate__animated animate__fadeInLeft animate__faster"
      onClick={ handleEntryClick }
    >

      {
        url && <div 
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${ url })`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
        ></div>
      }

      <div className="journal__entry-body">
        <p className="journal__entry-title">
          { title }
        </p>
        <p className="journal__entry-content">
          { body }
        </p>

      </div>

      <div className="journal__entry-date-box">
        <span>{ noteDate.format('dddd')}</span>
        <h4>{ noteDate.format('Do') }</h4>
      </div>


    </div>
  )
}
