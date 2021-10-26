import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import './Menu.css'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.authStart = this.authStart.bind(this)
  }

  authStart() {
    this.props.auth();
  }

  render() { 
    return (
      <nav>
        <ul class="Menu-nav">
          <li class="Menu-nav-item left">
            <NavLink className="Menu-nav-link" to="/" exact>
              Home
            </NavLink>
          </li>
          <li class="Menu-nav-item left">
            <NavLink className="Menu-nav-link" to="/items">
              Items
            </NavLink>
          </li>
          <li class="Menu-nav-item right">
            <NavLink className="Menu-nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li class="Menu-nav-item right">
            <NavLink className="Menu-nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li class="Menu-nav-item right">
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
      auth: () => dispatch(actionCreators.auth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
