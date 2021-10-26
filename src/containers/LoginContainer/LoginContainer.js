import { connect } from 'react-redux'
import Login from '../../components/Login/Login'

import { saveUser } from '../../actions/index'

// const LoginContainer = ({ dispatch }) => {
//   const dispatchSaveUser = (data) => dispatch(saveUser(data))

//   return (
//     <div>
//       <Login saveUser={dispatchSaveUser}/>
//     </div>
//   )
// }

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: (data) => dispatch(saveUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
// export default connect()(Login)