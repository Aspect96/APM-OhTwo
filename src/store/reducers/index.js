import { combineReducers } from 'redux'

import authReducer from './auth'
import itemsReducer from './items'

const reducer = combineReducers({
    auth: authReducer,
    items: itemsReducer
})

export default reducer