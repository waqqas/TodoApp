import {cancelled, all, takeLatest, put} from 'redux-saga/effects';
import {AppTypes} from "../Redux/AppRedux";
import TasksActions from "../Redux/TasksRedux";

const changeConnectionInfo = function* (api, {connectionInfo}) {
  if (connectionInfo.type !== 'offline' || connectionInfo.type !== 'unknown') {
    yield put(TasksActions.syncTasks())
  }
}

export default () => {
  function* watcher(api) {
    try {
      yield all([
        takeLatest(AppTypes.CHANGE_CONNECTION_INFO, changeConnectionInfo, api),
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
