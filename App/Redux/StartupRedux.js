// @flow
import {createActions, createReducer} from "reduxsauce";
import Immutable from "seamless-immutable";

import type {State, StartupState} from "../Models"

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  startup: null,
  startupSuccess: null,
  startupFailure: null,
})

export const StartupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const state: StartupState = {
  success: false,
}
export const INITIAL_STATE = Immutable(state)

/* ------------- Reducers ------------- */

export const startupSuccess = (state: Immutable) => state.merge({success: true})

export const startupFailure = (state: Immutable) => state.merge({success: false})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP_SUCCESS]: startupSuccess,
  [Types.STARTUP_FAILURE]: startupFailure,
})

/* ------------- Selector ------------- */

export const getStartupStatus = (state: State) => state.startup.success
