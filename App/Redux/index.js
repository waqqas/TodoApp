import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import configureStore from './CreateStore'
import ReduxPersist from '../Config/ReduxPersist'
import { reducer as formReducer } from 'redux-form'

/* ------------- Assemble The Reducers ------------- */
const reducers = combineReducers({
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

  let {store} = configureStore(finalReducers)

  return store
}
