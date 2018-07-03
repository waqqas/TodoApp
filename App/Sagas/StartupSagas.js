import {cancelled, put, takeLatest, all} from 'redux-saga/effects'
import DeviceInfo from 'react-native-device-info'

import StartupActions, {StartupTypes} from '../Redux/StartupRedux'
import AppActions from '../Redux/AppRedux'

const startup = function* (api) {
  yield put(AppActions.startApp())
  yield put(StartupActions.startupSuccess());
};

const startupSuccess = function* (api) {
  api.setHeader('authorization', `Bearer ${DeviceInfo.getUniqueID()}`)
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
