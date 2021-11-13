import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../../o2_icon.svg'; // icon from https://www.freepik.com/free-icon/oxygen_720197.htm

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
      <AppBar position="sticky">
        <Toolbar>
        <img src={logo} height="40px" alt="logo" style={{filter:'brightness(200%) saturate(0%)', marginRight:'7px'}} />
          <Typography variant="h5" component="div" sx={{ mr:5 }}>
            0W2L
          </Typography>
          <Button variant="text" color="inherit" href="/">Home</Button>
          <Button variant="text" color="inherit" href="/items">Items</Button>

          <Box sx={{ flexGrow: 1 }} />

          { !this.props.isAuth &&
            <Button variant="text" color="inherit" href="/login">Login</Button>
          }
          { this.props.isAuth &&
            <Button variant="text" color="inherit" onClick={this.userLogout} href="/">Logout</Button>
          }
          { this.props.isAuth &&
            <Button variant="text" color="inherit" href="/profile">Profile</Button>
          }
          <Button variant="text" color="inherit" href="/about">About</Button>
        </Toolbar>
      </AppBar>
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
