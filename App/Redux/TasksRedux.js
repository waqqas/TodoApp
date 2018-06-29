import {createActions, createReducer} from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addTask: ['task'],
  updateTask: ['task'],
})

export const TasksTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
})

/* ------------- Reducers ------------- */

export const addTask = (state, {task}) => state.merge({list: state.list.concat(task)})

export const updateTask = (state, {task}) => {
  return state.merge({
    list: state.list.map((oldTask) => {
        if (oldTask.id === task.id) {
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
