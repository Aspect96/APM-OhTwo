import * as actionTypes from '../actions/types'
import * as utils from '../utility'

const initialState = {
    error: null,
    loading: false,
    items: [],
    item: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ITEMS_SENT: return fetchItemsSent(state, action)
        case actionTypes.FETCH_ITEMS_SUCCESS: return fetchItemsSuccess(state, action)
        case actionTypes.POST_ITEM: return postItem(state, action)
        case actionTypes.POST_ITEM_SENT: return postItemSent(state, action)
        case actionTypes.POST_ITEM_SUCCESS: return postItemSuccess(state, action)
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

const postItem = (state, action) => {
    return utils.updateObject(state, {
        item: action.item
    })
}

const postItemSent = (state, action) => {
    return utils.updateObject(state, {
        error: null,
        loading: true
    })
}

const postItemSuccess = (state, action) => {
    return utils.updateObject(state, {
        loading: false,
        item: null
    })
}

export default reducer
