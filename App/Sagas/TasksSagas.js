import {cancelled, all, takeLatest, call, put} from 'redux-saga/effects';
import TasksActions, {TasksTypes} from "../Redux/TasksRedux";


const addTask = function* (api, {form}) {
  const response = yield call(api.addTask, form)
  if (response.ok) {
    yield put(TasksActions.addTaskSuccess(response.data))
  }
  else if (response.problem === 'TIMEOUT_ERROR') {
  }
  else {
  }
}

const updateTask = function* (api, {form, id}) {
  const response = yield call(api.updateTask, form, id)
  if (response.ok) {
    yield put(TasksActions.updateTaskSuccess(response.data))
  }
  else if (response.problem === 'TIMEOUT_ERROR') {
  }
  else {
  }
}

const getTasks = function* (api) {
  const response = yield call(api.getTasks)
  if (response.ok) {
    yield put(TasksActions.getTasksSuccess(response.data))
  }
  else if (response.problem === 'TIMEOUT_ERROR') {
  }
  else {
  }
}

const deleteTask = function* (api, {task}) {
  const response = yield call(api.deleteTask, task.id)
  if (response.ok) {
    yield put(TasksActions.deleteTaskSuccess(response.data))
  }
  else if (response.problem === 'TIMEOUT_ERROR') {
  }
  else {
  }
}


export default () => {
  function* watcher(api) {
    try {
      yield all([
        takeLatest(TasksTypes.ADD_TASK, addTask, api),
        takeLatest(TasksTypes.UPDATE_TASK, updateTask, api),
        takeLatest(TasksTypes.GET_TASKS, getTasks, api),
        takeLatest(TasksTypes.DELETE_TASK, deleteTask, api),
      ]);

    } finally {
      if (yield cancelled()) {
      }
    }
  }

  return {
    watcher,
  };
}
