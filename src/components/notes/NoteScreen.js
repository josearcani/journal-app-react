import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { noteActive } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

  const dispatch = useDispatch();
  const { active: note } = useSelector(state => state.notes);
  const [ formValues, handleInputChange, cleanForm ] = useForm(note);
  
  const activeId = useRef(note.id);
  // this ref is just for the first note

  useEffect(() => {
    if (activeId.current !== note.id) {
      cleanForm(note);
      activeId.current = note.id;
      // update the new id to reference and clean with new active note
    }
  }, [ note, cleanForm ])


  useEffect(() => {
    dispatch(noteActive(formValues.id, { ...formValues }))
  }, [ dispatch ,formValues ])

  return (
    <div className="notes__main-content">

      <NotesAppBar />

      <div className="notes__content">

        <input
          type="text"
          placeholder="Some delightful thought"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          onChange={ handleInputChange }
          value={ formValues.title }
        />

        <textarea
          placeholder="Hey write over here..."
          className="notes__textarea"
          name="body"
          onChange={ handleInputChange }
          value={ formValues.body }
        ></textarea>


        {
          note.url
            ?
              (<div className="notes__image">
                <img
                  src={ note.url }
                  alt="shotsss"
                />
              </div>)
            : 
              (<div className="notes__image">
                <img
                  src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/130238819/original/d4096d4950eba421600f21c6c753c19375222eb6/draw-you-a-landscape-image-with-ms-paint.png"
                  alt="shotsss"
                />
              </div>)
        }

      </div>

    </div>
  )
}
