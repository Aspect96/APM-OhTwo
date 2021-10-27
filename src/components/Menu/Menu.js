import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import './Menu.css'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.authStart = this.authStart.bind(this)
  }

  authStart() {
    // hardcoded for now, need to create form. set false for signIn andd true for signUp
    // "test@test.com":"test123" already exists in firebase, so signIn return success and signUp return fail
    this.props.auth("test@test.com","test123",false);
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
          <li className="Menu-nav-item right">
            <NavLink className="Menu-nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li className="Menu-nav-item right">
            <NavLink className="Menu-nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="Menu-nav-item right">
            <NavLink className="Menu-nav-link" to="/login" onClick={this.authStart}>
              {"Login - " + this.props.isAuth}
            </NavLink>
          </li>
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
      auth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
