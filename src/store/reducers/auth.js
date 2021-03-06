import * as actionTypes from '../actions/types'
import * as utils from '../utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectPath: '',
    information: {
        address: "",
        city: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        username: ""
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_SENT: return authSent(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setRedirectPath(state, action)
        case actionTypes.FETCH_USER_DATA_SUCCESS: return setUserInfo(state, action)
        default: return state
    }
}

const authSent = (state, action) => {
    return utils.updateObject(state, { error: null, loading: true })
}

const authSuccess = (state, action) => {
    return utils.updateObject(state, {
        token: action.token,
        userId: action.userId,
        loading: false
    })
}

const authFail = (state, action) => {
    return utils.updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return utils.updateObject(state, {
        token: null,
        userId: null
    })
}

const setRedirectPath = (state, action) => {
    return utils.updateObject(state, {
        redirectPath: action.path
    })
}

const setUserInfo = (state, action) => {
    return utils.updateObject(state, {
        information: action.information,
        loading: false
    })
}

export default reducer