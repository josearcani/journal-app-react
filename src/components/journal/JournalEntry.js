import React from 'react';
import moment from 'moment';

export const JournalEntry = ({ id, title, body, url, date }) => {

  const noteDate = moment(date);

  return (
    <div className="journal__entry">

      {
        url && <div 
        className="journal__entry-picture"
        style={{
          backgroundColor: 'cover',
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
