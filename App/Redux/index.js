import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'
import { reducer as formReducer } from 'redux-form'

/* ------------- Assemble The Reducers ------------- */
const reducers = combineReducers({
  app: require('./AppRedux').reducer,
  startup: require('./StartupRedux').reducer,
  tasks: require('./TasksRedux').reducer,
  form: formReducer,
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    finalReducers = persistReducer(ReduxPersist.storeConfig, reducers)
  }

  let {store, sagasManager, sagaMiddleware} = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
