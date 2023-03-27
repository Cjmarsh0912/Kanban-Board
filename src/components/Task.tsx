import { TaskInterface } from '../interfaces/interface';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

type Props = {
  task: TaskInterface;
  deleteHandler: (id: string) => void;
  editTask: (task: TaskInterface) => void;
};

export default function Task(props: Props) {
  const { id, task, header } = props.task;
  return (
    <>
      <div className='task'>
        <div>
          <header>
            <h3>{header}</h3>
          </header>
          <AiOutlineEdit
            className='icon'
            style={{ height: '20px', width: '20px', marginRight: '1rem' }}
            onClick={() => {
              props.editTask(props.task);
            }}
          />
          <AiOutlineDelete
            className='icon'
            style={{ height: '20px', width: '20px' }}
            onClick={() => {
              props.deleteHandler(id);
            }}
          />
        </div>
        {task !== '' && <p>{task}</p>}
      </div>
    </>
  );
}
