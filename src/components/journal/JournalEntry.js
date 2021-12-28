import React from 'react';

export const JournalEntry = ({ entry }) => {
  return (
    <div className="journal__entry">

      <div 
        className="journal__entry-picture"
        style={{
          backgroundColor: 'cover',
          backgroundImage: 'url(https://images.theconversation.com/files/405990/original/file-20210611-13-pcdwbd.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">
          A new day 
        </p>
        <p className="journal__entry-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, animi! Quia, non.
        </p>

      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>22</h4>
      </div>


    </div>
  )
}
