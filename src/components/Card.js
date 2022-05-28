import React from 'react';

export default function Card(props) {
  return (
    <>
      <div className='card'>
        <div className='box'>
          <h2>Add new task</h2>
          <input type='text' name='task' placeholder='Add Task' />
          <div>
            <button onClick={props.handleClose}>Add task</button>
            <button onClick={props.handleClose}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
