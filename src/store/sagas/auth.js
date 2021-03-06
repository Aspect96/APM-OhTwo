import { put, delay, call } from 'redux-saga/effects'
import axios from '../../services/firebase'

import * as actionCreators from '../actions'

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], process.env.REACT_APP_TOKEN_KEY)
    yield call([localStorage, 'removeItem'], process.env.REACT_APP_USERID_KEY)
    yield call([localStorage, 'removeItem'], process.env.REACT_APP_EXPIRATION_DATE_KEY)

    yield put(actionCreators.authLogout())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime)
    yield put(actionCreators.authLogoutStart())
}

export function* authUserSaga(action) {
    yield put(actionCreators.authSent())

    const data = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    const url = action.isSignUp ?
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}` :
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
    

    // comment if development case if you want to test in dev the cconnection with firebase
    // if (process.env.NODE_ENV === 'development') {
    //     yield delay(1000)
    //     yield updateData('ohtwo-test-account', 'vini1', 3600)
    // } else {
    try {
        const response = yield axios.post(url, data)
        
        let { localId, idToken, expiresIn } = response.data
        yield updateData(idToken, localId, expiresIn)
        if (action.isSignUp) {
            yield put(actionCreators.saveUserDataOnFirebase(localId, idToken, { ...action.userInformation, email: action.email }))
        }
    } catch (error) {
        const err = error.response ?
            error.response.data.error :
            error.request ?
                error.request :
                error.message
        console.log(err)
        yield put(actionCreators.authFail(err))
    }
    // }
}

function* updateData(idToken, localId, expiresIn) {
    const expirationDate = yield new Date(new Date().getTime() + expiresIn * 1000)
    yield localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, idToken)
    yield localStorage.setItem(process.env.REACT_APP_USERID_KEY, localId)
    yield localStorage.setItem(process.env.REACT_APP_EXPIRATION_DATE_KEY, expirationDate)
    yield put(actionCreators.authSuccess(idToken, localId))
    yield put(actionCreators.checkAuthTimeout(expiresIn * 1000))
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem(process.env.REACT_APP_TOKEN_KEY)
    const userId = yield localStorage.getItem(process.env.REACT_APP_USERID_KEY)
    if (token && userId) {
        const expirationDate = yield new Date(localStorage.getItem(process.env.REACT_APP_EXPIRATION_DATE_KEY))
        if (expirationDate > new Date()) {
            yield put(actionCreators.authSuccess(token, userId))
            yield put(actionCreators.checkAuthTimeout(expirationDate.getTime() - new Date().getTime()))
        } else {
            yield put(actionCreators.authLogoutStart())
        }
    } else {
        yield put(actionCreators.authLogoutStart())
    }
}

export function* saveUserDataSaga(action) {
    // yield put(actionCreators.saveUserDataSent())

    try {
        /*const response =*/ yield axios.post(`/users/${action.userId}/information.json?auth=${action.token}`, action.userInformation)
        // yield put(actionCreators.saveUserDataSuccess(response.data.name, action.order))
    } catch (error) {
        alert(error)
        // yield put(actionCreators.saveUserDataFail(error))
    }
}

export function* fetchUserDataSaga(action) {
    const token = yield localStorage.getItem(process.env.REACT_APP_TOKEN_KEY)
    const userId = yield localStorage.getItem(process.env.REACT_APP_USERID_KEY)

    // yield put(actionCreators.fetchUserDataSent())
    try {
        const response = yield axios.get(`/users/${userId}/information.json?auth=${token}`)
        const information = response.data
            ? Object.keys(response.data)
                .map((key) => {
                    return {
                        id: key,
                        ...response.data[key]
                    }
                })
            : []
        yield put(actionCreators.fetchUserDataSuccess(information[0]))
    } catch (error) {
        alert(error)
        const err = error.response ?
            error.response.data.error :
            error.request ?
                error.request :
                error.message
        console.log(err)
        // yield put(actionCreators.fetchOrdersFail(err))
    }
}

export function* updateUserDataSaga(action) {
    // yield put(actionCreators.saveUserDataSent())

    console.log(action.token)
    try {
        /*const response =*/ yield axios.put(`/users/${action.userId}/information/${action.id}.json?auth=${action.token}`, action.userInformation)
        // yield put(actionCreators.saveUserDataSuccess(response.data.name, action.order))
    } catch (error) {
        alert(error)
        // yield put(actionCreators.saveUserDataFail(error))
    }
}
