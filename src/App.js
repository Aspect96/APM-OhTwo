import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  renderNavBar() {
    return (
      <header class="AppHeader">
        <nav>
          <ul class="AppNav">
            <li class="AppNavItem">
                Items
            </li>
            <li class="AppNavItem">
                Profile
            </li>
            <li class="AppNavItem">
                Login
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
      <div className="App">
        {this.renderNavBar()}
        {this.renderWelcome()}
      </div>
    )
  }
}

export default App;
