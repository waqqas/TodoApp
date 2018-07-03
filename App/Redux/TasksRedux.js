import {createActions, createReducer} from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addTask: ['form'],
  addTaskSuccess: ['task'],
  updateTask: ['form', 'id'],
  updateTaskSuccess: ['task'],
  getTasks: null,
  getTasksSuccess: ['list'],
  deleteTask: ['task'],
  deleteTaskSuccess: ['task'],
})

export const TasksTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
})

/* ------------- Reducers ------------- */

export const addTaskSuccess = (state, {task}) => {
  return state.merge({list: state.list.concat(task)})
}

export const updateTaskSuccess = (state, {task}) => {
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

export const deleteTaskSuccess = (state, {task}) => {
  return state.merge({
    list: state.list.filter((oldTask) => {
        return (oldTask.id !== task.id)
      }
    )
  })
}

export const getTasksSuccess = (state, {list}) => state.merge({list})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TASK_SUCCESS]: addTaskSuccess,
  [Types.UPDATE_TASK_SUCCESS]: updateTaskSuccess,
  [Types.GET_TASKS_SUCCESS]: getTasksSuccess,
  [Types.DELETE_TASK_SUCCESS]: deleteTaskSuccess,
})

/* ------------- Selector ------------- */

export const getTaskList = (state) => state.tasks.list
