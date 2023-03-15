import trash from '../assets/images/delete.svg';
import { TaskInterface } from '../interfaces/interface';

interface Props {
  task: TaskInterface;
  clickHandler: (id: number) => void;
}

export default function Task(props: Props) {
  const { id, task, header } = props.task;
  return (
    <>
      <div className='task'>
        <header>
          <h3>{header}</h3>
        </header>
        <img
          onClick={() => {
            props.clickHandler(id);
          }}
          src={trash}
          style={{ height: '20px', width: '20px' }}
          alt='delete icon'
        />
        {task !== '' && <p>{task}</p>}
      </div>
    </>
  );
}
