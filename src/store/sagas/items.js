import { put, delay, call } from 'redux-saga/effects'
import axios from '../../services/firebase'

import * as actionCreators from '../actions'

export function* fetchItemsSaga(action) {

    let { token, userId } = action

    if (!token) {
        token = yield localStorage.getItem(process.env.REACT_APP_TOKEN_KEY)
    }
    if (!userId) {
        userId = yield localStorage.getItem(process.env.REACT_APP_USERID_KEY)
    }

    yield put(actionCreators.fetchItemsSent())
    try {
        const response = yield axios.get(`/items.json`)
        const items = response.data
            ? Object.keys(response.data)
                .map((key) => {
                    const user_items = Object.keys(response.data[key])
                        .map((itemKey) => {
                            return {
                                user_id: key,
                                item_id: itemKey,
                                ...response.data[key][itemKey]
                            }
                        })

                    return [
                        ...user_items
                    ]
                }).flat()
            : []
        console.log(items)
        yield put(actionCreators.fetchItemsSuccess(items))
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