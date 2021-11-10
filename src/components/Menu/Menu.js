import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import './Menu.css'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.userLogout = this.userLogout.bind(this)
  }

  userLogout() {
    this.props.logout()
  }

  render() { 
    return (
      <nav>
        <ul className="Menu-nav">
          <li className="Menu-nav-item left">
            <NavLink className="Menu-nav-link" to="/" exact>
              Home
            </NavLink>
          </li>
          <li className="Menu-nav-item left">
            <NavLink className="Menu-nav-link" to="/items">
              Items
            </NavLink>
          </li>

          { !this.props.isAuth &&
            <li className="Menu-nav-item right">
              <NavLink className="Menu-nav-link" to="/login" >
                {"Login"}
              </NavLink>
            </li>
          }
          { this.props.isAuth &&
            <li className="Menu-nav-item right">
              <NavLink className="Menu-nav-link logout" to={"/"} exact onClick={this.userLogout}>
                {"Logout"}
              </NavLink>
            </li>
          }
          <li className="Menu-nav-item right">
            <NavLink className="Menu-nav-link" to="/about">
              About
            </NavLink>
          </li>
          { this.props.isAuth &&
            <li className="Menu-nav-item right">
              <NavLink className="Menu-nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
          }
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
      // auth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup))
      logout: () => dispatch(actionCreators.authLogoutStart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
