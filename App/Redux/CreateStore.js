import {createStore} from 'redux'
import Rehydration from '../Services/Rehydration'
import ReduxPersist from '../Config/ReduxPersist'

// creates the store
export default (rootReducer) => {
  /* ------------- Redux Configuration ------------- */

  /* ------------- Analytics Middleware ------------- */

  /* ------------- Saga Middleware ------------- */


  /* ------------- Assemble Middleware ------------- */

  const store = createStore(rootReducer)

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  return {
    store,
  }
}
