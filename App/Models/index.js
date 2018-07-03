// @flow

export type Task = {
  id: string;
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

