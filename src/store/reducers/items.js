import * as actionTypes from '../actions/types'
import * as utils from '../utility'

const initialState = {
    error: null,
    loading: false,
    items: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ITEMS_SENT: return fetchItemsSent(state, action)
        case actionTypes.FETCH_ITEMS_SUCCESS: return fetchItemsSuccess(state, action)
        default: return state
    }
}

const fetchItemsSent = (state, action) => {
    return utils.updateObject(state, { error: null, loading: true })
}

const fetchItemsSuccess = (state, action) => {
    return utils.updateObject(state, {
        items: action.items,
        loading: false
    })
}

export default reducer
