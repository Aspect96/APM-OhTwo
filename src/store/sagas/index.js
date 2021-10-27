import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import * as actionTypes from '../actions/types'
import { logoutSaga, authUserSaga } from './auth'

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_LOGOUT_START, logoutSaga),
        // takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_START, authUserSaga),
        // takeEvery(actionTypes.CHECK_AUTH_STATE, authCheckStateSaga)
    ])
}
