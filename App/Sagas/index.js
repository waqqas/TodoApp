import {take, fork, cancel, all} from 'redux-saga/effects';
import getStartupSaga from './StartupSagas';
import getAppSaga from './AppSagas';

import {AppTypes} from '../Redux/AppRedux'

import API from '../Services/Api';

const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

const root = function* root() {
  yield all([
    fork(getStartupSaga().watcher, api),
    fork(getAppSaga().watcher, api),
  ]);

  while (yield take(AppTypes.START_APP)) {

    const tasks = yield all([])

    yield take(AppTypes.STOP_APP)

    yield cancel(...tasks)
  }

};

export default root;
