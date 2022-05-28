import React, { useState } from 'react';
import Card from './Card';

export default function Board() {
  const [showCard, setShowCard] = useState(false);

  function toggleCard() {
    return setShowCard(!showCard);
  }
  return (
    <>
      <div className='board'>
        <div className='tasks'></div>
        <div className='inProgress'></div>
        <div className='testing'></div>
        <div className='done'></div>
      </div>
      <button onClick={toggleCard}>New Task</button>
      {showCard && <Card handleClose={toggleCard} />}
    </>
  );
}
