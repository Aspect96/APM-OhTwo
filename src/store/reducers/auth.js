import * as actionTypes from '../actions/types'
import * as utils from '../utility'

const initialState = {
    token: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        default: return state
    }
}

const authStart = (state, action) => {
    if (state.token == null)
        return utils.updateObject(state, { token: '123' })
    else
        return utils.updateObject(state, { token: null })
}

export default reducer