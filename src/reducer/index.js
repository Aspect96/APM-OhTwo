//import { combineReducers } from 'redux';

import { actionTypes } from '../actions/index'

export const reducer = (state = {}, action) => {
  if (action.type === actionTypes.SAVE_USER) {
    state = {
      ...state,
      user: action.user
    }
  }
}

export default reducer

// export default combineReducers({
//   auth
// });

/* Well currently I cannot rename this reducer, otherwise react is throwing endless problems */