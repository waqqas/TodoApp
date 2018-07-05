//@flow
import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import type {AppState, ConnectionInfo, State} from '../Models'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  startApp: null,
  stopApp: null,
  changeConnectionInfo: ['connectionInfo'],
  getTasks: null,
  getTasksSuccess: ['list'],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const state: AppState = {
  connectionInfo: {type: 'unknown', effectiveType: 'unknown'},
  getTasks: {
    fetching: false,
  }
}
export const INITIAL_STATE = Immutable(state);

/* ------------- Reducers ------------- */

const changeConnectionInfo = (state: Immutable, {connectionInfo}: {connectionInfo: ConnectionInfo}) => state.merge({connectionInfo})

export const getTasks = (state: Immutable) => state.merge({getTasks: {fetching: true}});
export const getTasksSuccess = (state: Immutable) => state.merge({getTasks: {fetching: false}});


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_CONNECTION_INFO]: changeConnectionInfo,
  [Types.GET_TASKS]: getTasks,
  [Types.GET_TASKS_SUCCESS]: getTasksSuccess
});

/* ------------- Selectors ------------- */

export const isNetDisconnected = (state: State) => (state.app.connectionInfo.type === 'none' || state.app.connectionInfo.type === 'unknown')

export const getTasksFetching = (state: State) => state.app.getTasks.fetching

