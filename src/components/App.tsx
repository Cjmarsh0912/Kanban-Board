import '../assets/App.css';
import { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import AddTask from './AddTask';
import EditTask from './EditTask';
import Header from './Header';
import { TaskInterface, Columns } from '../interfaces/interface';

function App() {
  const [tasks, setTask] = useState((): TaskInterface[] => {
    return [];
  });
  const [columns, setColumns] = useState((): Columns => {
    return {
      0: {
        name: 'Tasks',
        items: [],
      },
      1: {
        name: 'Doing',
        items: [],
      },
      2: {
        name: 'Testing',
        items: [],
      },
      3: {
        name: 'Done',
        items: [],
      },
    };
  });
  const [editTask, setEditTask] = useState<TaskInterface>({
    id: '-1',
    header: '',
    task: '',
  });
  const [showCard, setShowCard] = useState(false);

  const updateTask = useCallback(
    (task: TaskInterface) => {
      let newColumns: Columns = {
        0: {
          name: 'Tasks',
          items: [],
        },
        1: {
          name: 'Doing',
          items: [],
        },
        2: {
          name: 'Testing',
          items: [],
        },
        3: {
          name: 'Done',
          items: [],
        },
      };
      let newTasks = [...tasks].map((item) => {
        if (item.id == task.id) return task;
        else return item;
      });

      for (let i = 0; i <= 3; i++) {
        newColumns[i as keyof Columns].items = columns[
          i as keyof Columns
        ].items.map((item) => {
          if (item.id == task.id) return task;
          else return item;
        });
      }

      setTask(newTasks);
      setColumns(newColumns);
    },
    [tasks, columns]
  );

  const addTask = useCallback(
    (log: TaskInterface[]) => {
      const newTask = log[log.length - 1];
      setTask(log);
      setColumns({
        ...columns,
        0: {
          name: 'Tasks',
          items: [...columns[0].items, newTask],
        },
      });
    },
    [tasks, columns]
  );

  const toggleAddTask = useCallback(() => setShowCard(!showCard), [showCard]);

  const toggleEditTask = useCallback(
    (task: TaskInterface) => setEditTask(task),
    [editTask]
  );

  // Handles when the user stops dragging a task
  const onDragEnd = (result: any, columns: Columns, setColumns: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId as keyof Columns];
      const destColumn = columns[destination.droppableId as keyof Columns];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId as keyof Columns];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const deleteContact = useCallback(
    (id: string): void => {
      let newColumns: Columns = {
        0: {
          name: 'Tasks',
          items: [],
        },
        1: {
          name: 'Doing',
          items: [],
        },
        2: {
          name: 'Testing',
          items: [],
        },
        3: {
          name: 'Done',
          items: [],
        },
      };
      let newTasks = [...tasks].filter((i: any) => {
        return i.id !== id;
      });

      for (let i = 0; i <= 3; i++) {
        newColumns[i as keyof Columns].items = columns[
          i as keyof Columns
        ].items.filter((t) => {
          return t.id !== id;
        });
      }

      setTask(newTasks);
      setColumns(newColumns);
    },
    [tasks, columns]
  );

  const deleteAllTasks = () => {
    if (tasks.length > 0) {
      setColumns(() => {
        return {
          0: {
            name: 'Tasks',
            items: [],
          },
          1: {
            name: 'Doing',
            items: [],
          },
          2: {
            name: 'Testing',
            items: [],
          },
          3: {
            name: 'Done',
            items: [],
          },
        };
      });
      setTask(() => {
        return [];
      });
    }
  };

  useEffect(() => {
    const retrieveColumns: Columns = JSON.parse(
      localStorage.getItem('columns')!
    );
    const retrieveTasks: TaskInterface[] = JSON.parse(
      localStorage.getItem('tasks')!
    );
    if (retrieveColumns) {
      setTask(retrieveTasks);
      setColumns(retrieveColumns);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [columns, tasks]);

  return (
    <div className='wrapper'>
      <main>
        <div className='board'>
          <DragDropContext
            onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([id, column]) => {
              return (
                <Droppable key={id} droppableId={id}>
                  {(provided: any, snapshot: any) => {
                    return (
                      <div className='taskContainer'>
                        <Header
                          columnName={column.name}
                          columnClassName={column.name}
                        />
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={`column${column.name}`}
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'lightgrey'
                              : 'white',
                          }}
                        >
                          {column.items.map(
                            (item: TaskInterface, index: number) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided: any, snapshot: any) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <Task
                                          deleteHandler={deleteContact}
                                          task={item}
                                          editTask={toggleEditTask}
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            }
                          )}
                          {provided.placeholder}
                        </div>
                      </div>
                    );
                  }}
                </Droppable>
              );
            })}
          </DragDropContext>
        </div>

        <div className='btnContainer'>
          <button className='newTaskBtn' onClick={toggleAddTask}>
            New Task
          </button>
          <button onClick={deleteAllTasks} className='delAllBtn'>
            Delete All
          </button>
        </div>
        {showCard && (
          <AddTask
            tasks={tasks}
            addTask={addTask}
            handleClose={toggleAddTask}
          />
        )}
        {editTask.id !== '-1' && (
          <EditTask
            task={editTask}
            handleClose={toggleEditTask}
            editTask={updateTask}
          />
        )}
      </main>
    </div>
  );
}

export default App;
