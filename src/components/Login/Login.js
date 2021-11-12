import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import * as actionCreators from '../../store/actions'

import './Login.css'

class Login extends Component {
  state = {
    form: {
      email: {
        type: 'input',
        config: {
          type: 'email',
          name: 'login-email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false
      },
      password: {
        type: 'input',
        config: {
          type: 'password',
          name: 'login-password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLen: 6
        },
        valid: false,
        touched: false
      }
    },
    valid: false,
    isRegister: false,
    userInformation: {
      firstName: 'Vinicius',
      lastName: 'Cechin',
      address: 'Av. Blablabla',
      city: 'Luxembourg',
      phone: ''
    }
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

  authHandler = (event) => {
    event.preventDefault()
    this.props.auth(this.state.form.email.value, this.state.form.password.value, this.state.isRegister, this.state.userInformation)
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
    const inputs = Object.keys(this.state.form)
      .map(key => {
        const input = this.state.form[key]
        const invalid = 'valid' in input ? !input.valid && input.touched && this.state.isRegister : false
        return (
          <div className="Login-input-wrap" key={key}>
              <input 
                className="Login-input"
                {...input.config}
                value={input.value}
                onChange={this.inputChangedHandler.bind(this, key)}
              />
              {this.validationError(key, invalid)}
          </div>
        )
      })

    return (
        <form className="Login-form" onSubmit={this.authHandler}>
            {inputs}
            <button className="Login-form-submit-btn" disabled={!this.state.valid} >{ this.state.isRegister ? 'REGISTER' : 'LOGIN'}</button>
        </form>
    )
  }

  render() {
      return (
          <>
              { this.props.isAuth ?
                  <Redirect to="/" /> :
                  <div className="Login">
                      <p className="Login-auth-error" >{this.props.error && this.props.error.message}</p>
                      {/* { this.props.loading ?
                          <Spinner /> : */}
                          {this.renderForm()}
                      {/* } */}
                      <button onClick={this.toggleAuthModeHandler} >
                          SWITCH TO { this.state.isRegister ? 'LOGIN' : 'REGISTER'}
                      </button>
                  </div>
              }
          </>
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
