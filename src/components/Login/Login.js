import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';

import * as actionCreators from '../../store/actions'

import './Login.css'

class Login extends Component {
  state = {
    form: {
      email: {
        type: 'email',
        placeholder: 'Email',
        value: '',
        validation: {
          required: true,
          email: true,
          message: '<email>@<server>.<domain>'
        },
        valid: false,
        touched: false
      },
      password: {
        type: 'password',
        placeholder: 'Password',
        value: '',
        validation: {
          required: true,
          minLen: 6,
          message: 'Min 6 characters'
        },
        valid: false,
        touched: false
      }
    },
    regForm: {
      confirmPassword: {
        type: 'password',
        placeholder: 'Confirm Password',
        value: '',
        validation: {
          required: true,
          samePassword: true,
          message: 'Different passwords'
        },
        valid: false,
        touched: false
      },
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
        value: ''
      },
      city: {
        type: 'text',
        placeholder: 'City',
        value: ''
      },
      phone: {
        type: 'number',
        placeholder: 'Phone',
        value: '',
        validation: {
          number: true,
          message: 'Use only numbers'
        },
        valid: true,
        touched: false
      }
    },
    valid: false,
    isRegister: false
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
    if (rules.number && value != '') {
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

    console.log(this.checkFormValidity(form) && (this.state.isRegister ? this.checkFormValidity(this.state.regForm) : true))
    this.setState({
        form,
        valid: this.checkFormValidity(form) && (this.state.isRegister ? this.checkFormValidity(this.state.regForm) : true)
    })
  }

  regOnlyChangedHandler = (key, event) => {
    const value = event.target.value
    const input = { ...this.state.regForm[key] }

    if (input.validation) {
      input.valid = this.checkValidity(value, input.validation)
      input.touched = true
    }
    
    const regForm = {
      ...this.state.regForm,
      [key]: {
          ...input,
          value
      }
    }

    console.log(this.checkFormValidity(regForm) && (this.state.isRegister ? this.checkFormValidity(this.state.form) : true))
    this.setState({
      regForm,
      valid: this.checkFormValidity(regForm) && (this.state.isRegister ? this.checkFormValidity(this.state.form) : true)
    })
  }

  authHandler = (event) => {
    event.preventDefault()

    const userInformation = {
      firstName: this.state.regForm.firstName.value,
      lastName: this.state.regForm.lastName.value,
      address: this.state.regForm.address.value,
      city: this.state.regForm.city.value,
      phone: this.state.regForm.phone.value,
      username: this.state.regForm.username.value
    }

    this.props.auth(this.state.form.email.value, this.state.form.password.value, this.state.isRegister, userInformation)
  }

  toggleAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isRegister: !prevState.isRegister
      }
    })
  }

  validationError = (key, invalid) => {
    return (
      <p className={invalid ? "Login-input-error" : "Login-input-error invisible"}>Please, enter a valid {key}</p>
    )
  }

  renderForm() {
    const login_inputs = Object.keys(this.state.form)
      .map(key => {
        const input = this.state.form[key]
        const invalid = 'valid' in input ? !input.valid && input.touched && this.state.isRegister : false
        const text = invalid ? input.validation.message + input.placeholder : ''
        return (
          <TextField key={key} 
            fullWidth
            className="Login-input"
            error={invalid} 
            label={input.placeholder} 
            variant="outlined" 
            helperText={text}
            onChange={this.inputChangedHandler.bind(this, key)}
            type={input.type}
            value={input.value}
            required={input.validation && input.validation.required && this.state.isRegister}
          />
        )
      })

    const registration_inputs = Object.keys(this.state.regForm)
      .map(key => {
        const input = this.state.regForm[key]
        const invalid = 'valid' in input ? !input.valid && input.touched && this.state.isRegister : false
        const text = invalid ? 'Please, enter a valid ' + input.placeholder : ''
        return (
          <TextField key={key}
            fullWidth
            className="Login-input"
            error={invalid} 
            label={input.placeholder} 
            variant="outlined" 
            helperText={text}
            onChange={this.regOnlyChangedHandler.bind(this, key)}
            type={input.type}
            value={input.value}
            required={input.validation && input.validation.required && this.state.isRegister}
          />
        )
      })

    return (
        <form className="Login-form" onSubmit={this.authHandler}>
            {login_inputs}
            {this.state.isRegister && registration_inputs}

            <LoadingButton
              loading={this.props.loading}
              loadingPosition="start"
              startIcon={<LoginIcon />}
              variant="text"
              disabled={!this.state.valid && this.state.isRegister}
              type="submit"
            >
              { this.state.isRegister ? 'REGISTER' : 'LOGIN'}
            </LoadingButton>
        </form>
    )
  }

  render() {
      return (
        <Box sx={{ my:2 }}> 
            { this.props.isAuth ?
                <Redirect to="/" /> :
                <div className="Login">
                    <p className="Login-auth-error" >{this.props.error && this.props.error.message}</p>
                    {this.renderForm()}
                    <Button variant="contained" onClick={this.toggleAuthModeHandler}>
                      SWITCH TO { this.state.isRegister ? 'LOGIN' : 'REGISTER'}
                    </Button>
                </div>
            }
        </Box>
      )
  }

}

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
      // "test@test.com","test123",false
      auth: (email, password, isRegister, userInformation) => dispatch(actionCreators.auth(email, password, isRegister, userInformation)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
