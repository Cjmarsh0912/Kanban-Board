import { useState, useRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { TaskInterface } from '../interfaces/interface';

interface Props {
  addTask: (log: TaskInterface[]) => void;
  handleClose: () => void;
  tasks: TaskInterface[];
}

export default function AddTask(props: Props) {
  const tasks = props.tasks;
  const [task, setTask] = useState('');
  const [header, setHeader] = useState('');
  const focusRef: any = useRef(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (header.length === 0) {
      alert('Task must have a name');
      focusRef.current.focus();
      return;
    }
    const newTask = {
      id: uuid(),
      task: task,
      header: header,
    };
    props.addTask([...tasks, newTask]);
    setTask('');
    setHeader('');
    focusRef.current.focus();
  };

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return (
    <>
      <div className='addTask'>
        <div className='box'>
          <h2>Add new task:</h2>
          <div className='taskForm'>
            <label htmlFor='header'>*Task Name:</label>
            <input
              ref={focusRef}
              type='text'
              name='header'
              id='header'
              autoComplete='off'
              placeholder='Task Name'
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            />
            <label htmlFor='task'>Task Details:</label>
            <input
              type='text'
              name='task'
              id='task'
              autoComplete='off'
              placeholder='Task Details'
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className='submit' onClick={(e) => handleSubmit(e)}>
              Add Task
            </button>
            <button onClick={props.handleClose}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}
