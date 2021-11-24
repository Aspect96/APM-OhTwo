import * as actionTypes from './types'

export const fetchItems = () => {
    return {
        type: actionTypes.FETCH_ITEMS
    }
}

export const fetchItemsSent = () => {
    return {
        type: actionTypes.FETCH_ITEMS_SENT
    }
}

export const fetchItemsSuccess = (items) => {
    return {
        type: actionTypes.FETCH_ITEMS_SUCCESS,
        items
    }
}