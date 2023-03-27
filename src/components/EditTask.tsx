import { useState, useRef } from 'react';
import { TaskInterface } from '../interfaces/interface';

type Props = {
  task: TaskInterface;
  editTask: (task: TaskInterface) => void;
  handleClose: (task: TaskInterface) => void;
};

export default function EditTask(props: Props) {
  const { id, header, task } = props.task;
  const [newTask, setNewTask] = useState(task);
  const [newHeader, setNewHeader] = useState(header);
  const focusRef: any = useRef(null);
  const reset: TaskInterface = {
    id: '-1',
    task: '',
    header: '',
  };

  const handleSubmit = () => {
    if (newHeader.length === 0) {
      alert('Task must have a name');
      focusRef.current.focus();
      return;
    }

    const newTasks: TaskInterface = {
      id: id,
      task: newTask,
      header: newHeader,
    };

    // checks whether there is a change to the task or task header
    if (task !== newTasks.task || header !== newTasks.header) {
      console.log('ran');
      props.editTask(newTasks);

      props.handleClose(reset);
    } else return props.handleClose(reset);
  };

  return (
    <div className='editTask'>
      <div className='box'>
        <h2>Edit Task</h2>
        <div className='taskForm'>
          <label htmlFor='header'>*Task Name:</label>
          <input
            ref={focusRef}
            type='text'
            name='header'
            id='header'
            autoComplete='off'
            placeholder='Task Name'
            value={newHeader}
            onChange={(e) => setNewHeader(e.target.value)}
          />
          <label htmlFor='task'>Task Details:</label>
          <input
            type='text'
            name='task'
            id='task'
            autoComplete='off'
            placeholder='Task Details'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className='submit' onClick={(e) => handleSubmit()}>
            Edit Task
          </button>
          <button onClick={() => props.handleClose(reset)}>Close</button>
        </div>
      </div>
    </div>
  );
}
