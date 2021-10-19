import React, { Component } from 'react';
import { BrowserRouter, NavLink, Switch, Route, Redirect } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  renderNavBar() {
    return (
      <header class="AppHeader">
        <nav>
          <ul class="AppNav">
            <li class="AppNavItem left">
              <NavLink className="AppNavLink" to="/" exact>
                Home
              </NavLink>
            </li>
            <li class="AppNavItem left">
              <NavLink className="AppNavLink" to="/items">
                Items
              </NavLink>
            </li>
            <li class="AppNavItem right">
              <NavLink className="AppNavLink" to="/profile">
                Profile
              </NavLink>
            </li>
            <li class="AppNavItem right">
              <NavLink className="AppNavLink" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
  renderWelcome() {
    return (
      <header className="App-welcome">
        <img src={logo} className="App-logo" alt="logo" />
        <p id="app-name">
          0 Waste 2 Life
        </p>
        <p class="app-welcome">
          Got something you don't want anymore? Need something but it is too expensive?
        </p>
        <p class="app-welcome">
          Then you are in the right place!
        </p>
      </header>
    )
  }

  render() {
    return (
      <BrowserRouter basename="/ohtwo">
        <div className="App">
          {this.renderNavBar()}

          <Switch>
            <Route path="/items">
              <div></div>
            </Route>
            <Route path="/profile">
              <div></div>
            </Route>
            <Route path="/login">
              <div></div>
            </Route>
            <Route path="/" exact>
              {this.renderWelcome()}
            </Route>
          </Switch>

        </div>
      </BrowserRouter>
    )
  }
}

export default App;
