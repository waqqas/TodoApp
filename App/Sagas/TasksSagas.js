import {cancelled, all, takeLatest, call, put, takeEvery, select} from 'redux-saga/effects';
import TasksActions, {getAllTaskList, TasksTypes} from "../Redux/TasksRedux";
import {Alert, NetInfo} from 'react-native'
import {channel} from 'redux-saga'
import _ from "lodash";


const passThroughChannel = channel();

const passThroughChannelWatcher = function* (action) {
  yield put(action);
}


const addTask = function* (api) {
  const connected = yield call(NetInfo.isConnected.fetch)
  if (connected) {
    yield put(TasksActions.syncTasks())
  }
}

const updateTask = function* (api) {
  const connected = yield call(NetInfo.isConnected.fetch)
  if (connected) {
    yield put(TasksActions.syncTasks())
  }
}

const getTasks = function* (api) {
  const response = yield call(api.getTasks)
  if (response.ok) {
    yield put(TasksActions.getTasksSuccess(response.data))
  }
}

const deleteTask = function* (api) {
  const connected = yield call(NetInfo.isConnected.fetch)
  if (connected) {
    yield put(TasksActions.syncTasks())
  }
}

const deleteAllTasks = function* (api) {
  const connected = yield call(NetInfo.isConnected.fetch)
  if (connected) {
    yield put(TasksActions.syncTasks())
  }
}

const syncTasks = function* (api) {
  const tasks = yield select(state => getAllTaskList(state))

  tasks.forEach(task => {
    if (task._synced === false) {
      passThroughChannel.put(TasksActions.syncTask(task))
    }
  })
}

const syncTask = function* (api, {task}) {
  let response = null

  // don't send local props to server
  const data = _.omit(task, ['_id', '_synced', '_deleted'])

  // only delete a task if it is already synced
  if (task._deleted === true) {
    if (task.id) {
      response = yield call(api.deleteTask, task.id)
      if (response.ok) {
        yield put(TasksActions.deleteTaskSuccess(task))
      }
    }
    else {
      yield put(TasksActions.deleteTaskSuccess(task))
    }

  }
  else {
    // 'id' parameter determines if client need to update or add
    if (task.id) {
      //update task
      response = yield call(api.updateTask, data)
    }
    else {
      // add task
      response = yield call(api.addTask, data)
    }

    if (response.ok) {
      // set synced === true
      // merge 'id' coming from server
      yield put(TasksActions.syncTaskSuccess(_.merge(response.data, task)))
    }
  }

}

export default () => {
  function* watcher(api) {
    try {
      yield all([
        takeEvery(passThroughChannel, passThroughChannelWatcher),
        takeLatest(TasksTypes.ADD_TASK, addTask, api),
        takeLatest(TasksTypes.UPDATE_TASK, updateTask, api),
        takeLatest(TasksTypes.GET_TASKS, getTasks, api),
        takeLatest(TasksTypes.DELETE_TASK, deleteTask, api),
        takeLatest(TasksTypes.SYNC_TASKS, syncTasks, api),
        takeEvery(TasksTypes.SYNC_TASK, syncTask, api),
        takeLatest(TasksTypes.DELETE_ALL_TASKS, deleteAllTasks, api),
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
