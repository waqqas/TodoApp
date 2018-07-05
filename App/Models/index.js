// @flow

export type Task = {
  _id: string;
  _synced: boolean;
  _deleted: boolean;
  id?: string;
  title: string;
  done: boolean;
}

export type AddTaskFormValues = {
  title: string;
  done: boolean;
}

export type ConnectionInfo = {
  type: string;
  effectiveType: string;
}


export type TasksState = {
  list: Array<Task>;
}

export type AppState = {
  connectionInfo: ConnectionInfo;
  getTasks: {
    fetching: boolean;
  }
}

export type StartupState = {
  success: boolean;
}

export type State = {
  tasks: TasksState,
  app: AppState,
  startup: StartupState,
}
