import {createStore, applyMiddleware, compose} from 'redux'
import Rehydration from '../Services/Rehydration'
import ReduxPersist from '../Config/ReduxPersist'
import createSagaMiddleware from 'redux-saga'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Analytics Middleware ------------- */

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  const store = createStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}
