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

export const postItem = (item) => {
    return {
        type: actionTypes.POST_ITEM,
        item
    }
}

export const postItemSent = () => {
    return {
        type: actionTypes.POST_ITEM_SENT
    }
}

export const postItemSuccess = () => {
    return {
        type: actionTypes.POST_ITEM_SUCCESS
    }
}

export const deleteItem = (item => {
    return {
        type: actionTypes.DELETE_ITEM,
        item
    }
})

export const deleteItemSent = () => {
    return {
        type: actionTypes.DELETE_ITEM_SENT
    }
}

export const deleteItemSuccess = () => {
    return {
        type: actionTypes.DELETE_ITEM_SUCCESS
    }
}