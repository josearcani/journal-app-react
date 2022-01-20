import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { Sidebar } from './Sidebar';
import { NothingSelected } from './NothingSelected';

export const JournalScreen = () => {

  const { active } = useSelector(state => state.notes);
  const { toggle } = useSelector(state => state.ui);
  
  // const handleToogle = () => {
  //   console.log('asdfasdf');
  // }
  console.log(toggle);

  return (
    <div className="journal__main-context animate__animated animate__fadeIn animate__faster">

      <Sidebar />

      <main className={`journal__main ${toggle && 'is-full-width'}`}>

        {
          active
            ? <NoteScreen />
            : <NothingSelected />
        }

      </main>
    </div>
  )
}
