import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MUIMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';

import logo from '../../o2_icon.svg'; // icon from https://www.freepik.com/free-icon/oxygen_720197.htm
import './Menu.css'

import * as actionCreators from '../../store/actions';

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.userLogout = this.userLogout.bind(this)

    this.state = {
      anchorEl: null
    }
  }

  openUserMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  closeUserMenu= () => {
    this.setState({
      anchorEl: null
    })
    // return true
  }

  componentDidMount() {
    this.props.autoSignOn()
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
          <Button variant="text" color="inherit" component={Link} to="/">Home</Button>
          <Button variant="text" color="inherit" component={Link} to="/items">Items</Button>

          <Box sx={{ flexGrow: 1 }} />

          <Button variant="text" color="inherit" component={Link} to="/about">About</Button>

          { this.props.isAuth &&
            <div>
              <IconButton
                size="large"
                aria-label="user account menu"
                aria-controls="user-menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={this.openUserMenu}
              >
                <AccountCircle />
              </IconButton>
              <MUIMenu
                id="user-menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(this.state.anchorEl)}
                onClose={this.closeUserMenu}
                sx={{ mt: 4 }} // or mt: 5 (if it should not overlap with the AccountCircle IconButton)
              >
                <MenuItem key="profile" component={Link} color="inherit" onClick={this.closeUserMenu} to="/profile">Profile</MenuItem>
                <MenuItem key="donations" component={Link} color="inherit" onClick={this.closeUserMenu} to="/donations">Donations</MenuItem>
                <MenuItem key="logout" component={Link} color="inherit" onClick={this.closeUserMenu && this.userLogout} to="/">Logout</MenuItem>
              </MUIMenu>
            </div>
          }

          { !this.props.isAuth &&
            <Button variant="text" color="inherit" component={Link} to="/login">Login</Button>
          }
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
      logout: () => dispatch(actionCreators.authLogoutStart()),
      autoSignOn: () => dispatch(actionCreators.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
