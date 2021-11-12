import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import * as actionTypes from '../actions/types'
import { logoutSaga, authUserSaga, saveUserDataSaga } from './auth'

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_LOGOUT_START, logoutSaga),
        // takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_START, authUserSaga),
        takeEvery(actionTypes.AUTH_SAVE_USER_DATA, saveUserDataSaga)
        // takeEvery(actionTypes.CHECK_AUTH_STATE, authCheckStateSaga)
    ])
}
