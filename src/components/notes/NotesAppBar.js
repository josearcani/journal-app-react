import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

  const dispatch = useDispatch();

  const { active } = useSelector(state => state.notes)
  const noteDate = moment(active.date);
  
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
      <div className="notes__appbar-datetime">
        <p>{ noteDate.format("MMMM Do YYYY") }</p>
        <p>{ noteDate.format("dddd, h:mm:ss a") }</p>
      </div>

      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={ handleFileChange }
      />

      <div className="notes__appbar-btn-container">
        <button
          className="btn btn-primary delete"
          onClick={ handleUploadPicture }
        >
          <i className="fas fa-trash"></i>&nbsp;
          Delete
        </button>
        <button
          className="btn btn-primary upload"
          onClick={ handleUploadPicture }
        >
          <i className="fas fa-image"></i>&nbsp;
          Upload
        </button>

        <button
          className="btn btn-primary save"
          onClick={ handleSave }
        >
          <i className="far fa-save"></i>&nbsp;
          Save
        </button>
      </div>
    </div>
  )
}
