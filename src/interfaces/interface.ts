export interface Columns {
  0: {
    name: string;
    items: TaskInterface[];
  };
  1: {
    name: string;
    items: TaskInterface[];
  };
  2: {
    name: string;
    items: TaskInterface[];
  };
  3: {
    name: string;
    items: TaskInterface[];
  };
}

export interface TaskInterface {
  id: string;
  task: string;
  header: string;
}
