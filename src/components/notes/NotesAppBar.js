import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

  const dispatch = useDispatch();

  const { active } = useSelector(state => state.notes)

  const handleSave = () => {
    dispatch(startSaveNote(active));
  }

  const handleUploadPicture = () => {
    document.querySelector('#fileSelector').click();
  }

  const handleFileChange = (e) => {
    // e.target => <input />
    // e.target.files ==> FileList {0: File, length: 1}
    const file = e.target.files[0];
    dispatch(startUploading(file));
  }

  return (
    <div className="notes__appbar">
      <span>28 de septiembre 2021</span>

      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={ handleFileChange }
      />

      <div>
        <button
          className="btn"
          onClick={ handleUploadPicture }
        >
          Picture
        </button>

        <button
          className="btn"
          onClick={ handleSave }
        >
          Save
        </button>
      </div>
    </div>
  )
}
