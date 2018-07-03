import {cancelled, put, takeLatest, all} from 'redux-saga/effects';
import StartupActions, {StartupTypes} from '../Redux/StartupRedux';

const startup = function* (api) {
  yield put(StartupActions.startupSuccess());
};

const startupSuccess = function* (api) {
};

export default () => {
  function* watcher(api) {
    try {
      yield all([
        takeLatest(StartupTypes.STARTUP, startup, api),
        takeLatest(StartupTypes.STARTUP_SUCCESS, startupSuccess, api),
      ])
    } finally {
      if (yield cancelled()) {
      }
    }
  }

  return {
    watcher,
  };
}
