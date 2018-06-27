import {createActions, createReducer} from "reduxsauce";
import Immutable from "seamless-immutable";
import update from 'immutability-helper';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addTask: ['task'],
})

export const TasksTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  list: [],
})

/* ------------- Reducers ------------- */

export const addTask = (state, {task}) => state.merge({list: update(state.list, {$push: [task]})})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TASK]: addTask,
})

/* ------------- Selector ------------- */

export const getTaskList = (state) => state.tasks.list
