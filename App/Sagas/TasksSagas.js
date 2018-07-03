import {cancelled, all, takeLatest} from 'redux-saga/effects';
import {TasksTypes} from "../Redux/TasksRedux";


const addTask = function* (api) {
}

const updateTask = function* (api) {
}


export default () => {
  function* watcher(api) {
    try {
      yield all([
        takeLatest(TasksTypes.ADD_TASK, addTask, api),
        takeLatest(TasksTypes.UPDATE_TASK, updateTask, api),
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
