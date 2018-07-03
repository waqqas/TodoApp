import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  startApp: null,
  stopApp: null,
  changeConnectionInfo: ['connectionInfo']
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  connectionInfo: {type: 'unknown', effectiveType: 'unknown'}
});

/* ------------- Reducers ------------- */

const changeConnectionInfo = (state, {connectionInfo}) => state.merge({connectionInfo})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_CONNECTION_INFO]: changeConnectionInfo
});

/* ------------- Selectors ------------- */

export const isNetDisconnected = (state) => (state.app.connectionInfo.type === 'none' || state.app.connectionInfo.type === 'unknown')
