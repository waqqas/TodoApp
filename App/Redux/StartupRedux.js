import {createActions, createReducer} from "reduxsauce";
import Immutable from "seamless-immutable";
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    logoutUserSuccess: ['response'],
    startup: null,
    startupSuccess: null,
    startupFailure: null,
})

export const StartupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    success: false,
})

/* ------------- Reducers ------------- */

export const logoutUserSuccess = (state) => state.merge(_.omit(INITIAL_STATE, ['success']))

export const startupSuccess = (state) => state.merge({success: true})

export const startupFailure = (state) => state.merge({success: false})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGOUT_USER_SUCCESS]: logoutUserSuccess,
    [Types.STARTUP_SUCCESS]: startupSuccess,
    [Types.STARTUP_FAILURE]: startupFailure,
})

/* ------------- Selector ------------- */

export const getStartupStatus = (state) => state.startup.success