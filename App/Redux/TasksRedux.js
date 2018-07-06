// @flow

import {createActions, createReducer} from "reduxsauce";
import Immutable from "seamless-immutable";
import uuid from 'uuid/v4'
import update from 'immutability-helper'

import type {Task, AddTaskFormValues, State, TasksState} from "../Models";

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addTask: ['form'],
  updateTask: ['task'],
  deleteTask: ['task'],
  getTasks: null,
  getTasksSuccess: ['list'],
  syncTasks: null,
  syncTask: ['task'],
  syncTaskSuccess: ['task'],
  deleteTaskSuccess: ['task'],
  deleteAllTasks: null
})

export const TasksTypes = Types
export default Creators


/* ------------- Initial State ------------- */

const state: TasksState = {
  list: [],
}
export const INITIAL_STATE = Immutable(state)

/* ------------- Reducers ------------- */

export const addTask = (state: Immutable, {form}: { form: AddTaskFormValues }) => {
  const task: Task = update(form, {$merge: {_id: uuid(), _synced: false, _deleted: false}})

  return update(state, {list: {$push: [task]}})
}

export const updateTask = (state: Immutable, {task}: { task: Task }) => {
  return update(state, {
    list: {
      $apply: list => list.map((currentTask: Task) => {
        if (currentTask._id === task._id) {
          return update(task, {$merge: {_synced: false}})
        }
        return currentTask
      })
    }
  })
}

export const deleteTask = (state: Immutable, {task}: { task: Task }) => {
  return update(state, {
    list: {
      $apply: list => list.map((currentTask: Task) => {
        if (currentTask._id === task._id) {
          return update(task, {$merge: {_synced: false, _deleted: true}})
        }
        return currentTask
      })
    }
  })
}

export const syncTaskSuccess = (state: Immutable, {task}: { task: Task }) => {
  return update(state, {
    list: {
      $apply: list => list.map((currentTask: Task) => {
        if (currentTask._id === task._id) {
          return update(task, {$merge: {_synced: true}})
        }
        else {
          return currentTask
        }
      })
    }
  })
}

export const deleteTaskSuccess = (state: Immutable, {task}: { task: Task }) => {
  return update(state, {
    list: {
      $apply: list => list.filter((currentTask: Task) => (currentTask._id !== task._id))
    }
  })
}

export const getTasksSuccess = (state: Immutable, {list}: { list: Array<Task> }) =>
  update(state, {
    list: {
      $set: list.map((task) => update(task, {$merge: {_id: uuid(), _synced: true, _deleted: false}}))
    }
  })

export const deleteAllTasks = (state: Immutable, {task}: { task: Task }) => {
  return update(state, {
    list: {
      $apply: list => list.map((currentTask: Task) => {
        return update(currentTask, {$merge: {_synced: false, _deleted: true}})
      })
    }
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TASK]: addTask,
  [Types.UPDATE_TASK]: updateTask,
  [Types.SYNC_TASK_SUCCESS]: syncTaskSuccess,
  [Types.GET_TASKS_SUCCESS]: getTasksSuccess,
  [Types.DELETE_TASK]: deleteTask,
  [Types.DELETE_TASK_SUCCESS]: deleteTaskSuccess,
  [Types.DELETE_ALL_TASKS]: deleteAllTasks,
})

/* ------------- Selector ------------- */

export const getTaskList = (state: State) => state.tasks.list.filter((task) => (task._deleted !== true))
export const getAllTaskList = (state: State) => state.tasks.list
