import {createActions, createReducer} from "reduxsauce";
import Immutable from "seamless-immutable";
import uuid from 'uuid/v4'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addTask: ['form'],
  updateTask: ['form', 'id'],
})

export const TasksTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
})

/* ------------- Reducers ------------- */

export const addTask = (state, {form}) => {
  const task = _.merge({id: uuid()}, form)
  return state.merge({list: state.list.concat(task)})

}

export const updateTask = (state, {form, id}) => {
  return state.merge({
    list: state.list.map((oldTask) => {
        if (oldTask.id === id) {
          const task = _.merge({id}, form)
          return task
        }
        return oldTask
      }
    )
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TASK]: addTask,
  [Types.UPDATE_TASK]: updateTask,
})

/* ------------- Selector ------------- */

export const getTaskList = (state) => state.tasks.list
