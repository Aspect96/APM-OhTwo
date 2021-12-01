import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import * as actionCreators from '../../store/actions'

import './Userprofile.css'

class Userprofile extends Component {
  state = {
    form: {
      username: {
        type: 'text',
        placeholder: 'Username',
        value: '',
        validation: {
          required: true,
          minLen: 4,
          message: 'Min 4 characters'
        },
        valid: false,
        touched: false
      },
      firstName: {
        type: 'text',
        placeholder: 'First name',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      lastName: {
        type: 'text',
        placeholder: 'Last name',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      address: {
        type: 'text',
        placeholder: 'Address',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      city: {
        type: 'text',
        placeholder: 'City',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      phone: {
        type: 'number',
        placeholder: 'Phone',
        value: '',
        validation: {
          //required: true,
          number: true,
          message: 'Use only numbers'
        },
        valid: false,
        touched: false
      }
    },
    valid: false,
    editing: false
  }

  componentDidMount() {
    this.props.fetchUserData()
  }

  checkValidity = (value, rules) => {
    let isValid = true
    if (rules.required) {
      isValid &= (value.trim() !== '')
    }
    if (rules.minLen) {
      isValid &= (value.length >= rules.minLen)
    }
    if (rules.email) {
      isValid &= (value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) !== null)
    }
    if (rules.samePassword) {
      isValid &= (value === this.state.form.password.value)
    }
    if (rules.number && value !== '') {
      var regexp = /\d/g;
      isValid &= regexp.test(value)
    }
    return isValid
  }

  checkFormValidity = (form) => {
    return Object.keys(form)
      .reduce((isValid, key) => {
        return isValid && (form[key].validation ? form[key].valid : true)
      }, true)
  }

  inputChangedHandler = (key, event) => {
    const value = event.target.value
    const input = { ...this.state.form[key] }

    if (input.validation) {
      input.valid = this.checkValidity(value, input.validation)
      input.touched = true
    }
    
    const form = {
      ...this.state.form,
      [key]: {
          ...input,
          value
      }
    }

    this.setState({
        form,
        valid: this.checkFormValidity(form)
    })
  }

  saveProfileHandler = (event) => {
    event.preventDefault()

    const userInformation = {
      firstName: this.state.form.firstName.value,
      lastName: this.state.form.lastName.value,
      address: this.state.form.address.value,
      city: this.state.form.city.value,
      phone: this.state.form.phone.value,
      username: this.state.form.username.value
    }

    this.props.updateProfile(this.props.userId, this.props.token, this.props.information.id, userInformation)
  }

  toggleEdit = () => {

    this.setState(prevState => {
      return {
        ...prevState,
        editing: !prevState.editing,
        form: {
          ...prevState.form,
          username: {
            ...prevState.form.username,
            value: this.props.information.username
          },
          firstName: {
            ...prevState.form.firstName,
            value: this.props.information.firstName
          },
          lastName: {
            ...prevState.form.lastName,
            value: this.props.information.lastName
          },
          city: {
            ...prevState.form.city,
            value: this.props.information.city
          },
          address: {
            ...prevState.form.address,
            value: this.props.information.address
          },
          phone: {
            ...prevState.form.phone,
            value: this.props.information.phone
          },
        }
      }
    })
  }

  renderUserItems() {
    return (
      <div>
        user items
      </div>
    )
  }

  renderUserInfo() {
    console.log(this.props.information)
    return (
      <div>
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
          }}
        >
          <ListItem>
            <ListItemText primary="Name" secondary={this.props.information.firstName + ' ' + this.props.information.lastName} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText 
              primary="Address" 
              secondary={this.props.information.address + ', ' + this.props.information.city} 
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText 
              primary="Contact Information" 
              secondary={
                <React.Fragment>
                  {"email: " + this.props.information.email}
                  <br />
                  {this.props.information.phone && "phone: " + this.props.information.phone}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </div>
    )
  }

  renderForm() {
    const profile_inputs = Object.keys(this.state.form)
      .map(key => {
        const input = this.state.form[key]
        const invalid = 'valid' in input ? !input.valid && input.touched && this.state.isRegister : false
        const text = invalid ? input.validation.message + input.placeholder : ''
        return (
          <TextField key={key} 
            fullWidth
            className="Profile-input"
            error={invalid} 
            label={input.placeholder} 
            variant="outlined" 
            helperText={text}
            onChange={this.inputChangedHandler.bind(this, key)}
            type={input.type}
            value={input.value}
            required={input.validation && input.validation.required}
          />
        )
      })

    return (
      <form className="Profile-form" onSubmit={this.saveProfileHandler}>
        {profile_inputs}

        <LoadingButton
          loading={this.props.loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="text"
          disabled={!this.state.valid || this.props.loading}
          type="submit"
        >
          {'SAVE'}
        </LoadingButton>
      </form>
    )
  }

  render() {
    return (
      <Box sx={{ my:2 }}>
        { !this.props.isAuth ?
            <Redirect to="/login" /> :
            <div className="Profile">
              <Typography variant="h3" component="div" className="App-title-primary-color" sx={{ mb:2 }}>{this.props.information.username}</Typography>
              <p className="Profile-validation-error" >{this.props.error && this.props.error.message}</p>
              {this.state.editing ? this.renderForm() : (this.props.information && this.renderUserInfo())}
              <Button variant="text" color="primary" onClick={this.toggleEdit} >{this.state.editing ? "Cancel" : "Edit Information"}</Button>
              
              <Divider className="Profile-info-item-dividedr" flexItem />
              
              {this.renderUserItems()}
            </div>
        }
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
      loading: state.auth.loading, // TODO: loading for saving/retrieving? profile and then showing a success message or error
      error: state.auth.error, // 
      isAuth: state.auth.token !== null,
      token: state.auth.token,
      userId: state.auth.userId,
      information: state.auth.information
  }
}

const mapDispatchToProps = dispatch => {
  return {
      // TODO: actionCreator and send it to firebase
      updateProfile: (userId, token, id, userInformation) => dispatch(actionCreators.updateUserDataOnFirebase(userId, token, id, userInformation)),
      fetchUserData: () => dispatch(actionCreators.fetchUserData())
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Userprofile)