import { takeEvery, all } from 'redux-saga/effects'

import * as actionTypes from '../actions/types'
import { 
    logoutSaga,
    authUserSaga, 
    saveUserDataSaga, 
    authCheckStateSaga, 
    checkAuthTimeoutSaga, 
    fetchUserDataSaga,
    updateUserDataSaga
} from './auth'

import {
    fetchItemsSaga
} from './items'

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_LOGOUT_START, logoutSaga),
        takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_START, authUserSaga),
        takeEvery(actionTypes.AUTH_SAVE_USER_DATA, saveUserDataSaga),
        takeEvery(actionTypes.CHECK_AUTH_STATE, authCheckStateSaga),
        takeEvery(actionTypes.FETCH_USER_DATA, fetchUserDataSaga),
        takeEvery(actionTypes.AUTH_UPDATE_USER_DATA, updateUserDataSaga),
        takeEvery(actionTypes.FETCH_ITEMS, fetchItemsSaga)
    ])
}
