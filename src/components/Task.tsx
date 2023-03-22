import { TaskInterface } from '../interfaces/interface';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

interface Props {
  task: TaskInterface;
  deleteHandler: (id: number) => void;
  editTask: (task: TaskInterface) => void;
}

export default function Task(props: Props) {
  const { id, task, header } = props.task;
  return (
    <>
      <div className='task'>
        <header>
          <h3>{header}</h3>
        </header>
        <AiOutlineEdit
          className='test'
          style={{ height: '20px', width: '20px', marginRight: '1rem' }}
          onClick={() => {
            props.editTask(props.task);
          }}
        />
        <AiOutlineDelete
          className='test'
          style={{ height: '20px', width: '20px' }}
          onClick={() => {
            props.deleteHandler(id);
          }}
        />
        {/* <img
          onClick={() => {
            props.clickHandler(id);
          }}
          src={trash}
          style={{ height: '20px', width: '20px' }}
          alt='delete icon'
        /> */}
        {task !== '' && <p>{task}</p>}
      </div>
    </>
  );
}
