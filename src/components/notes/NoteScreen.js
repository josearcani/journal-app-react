import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">

      <NotesAppBar />

      <div className="notes__content">

        <input
          type="text"
          placeholder="Some delightful thought"
          className="notes__title-input"
          autoComplete="off"
        />

        <textarea
          placeholder="Hey write over here..."
          className="notes__textarea"
        ></textarea>


        <div className="notes__image">
          <img
            src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/130238819/original/d4096d4950eba421600f21c6c753c19375222eb6/draw-you-a-landscape-image-with-ms-paint.png"
            alt="shotsss"
          />

        </div>

      </div>

    </div>
  )
}
