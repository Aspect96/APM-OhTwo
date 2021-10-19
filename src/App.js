import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css';

import About from './components/About'
import Menu  from './components/Menu';
import Home  from './components/Home';

class App extends Component {
  renderNavBar() { // Left this here so that we can change the menu when the user is logged in.
    return (
      <header class="AppHeader">
        <Menu />
      </header>
    )
  }

  render() {
    return (
      <BrowserRouter basename="/ohtwo">
        <div className="App">
          {this.renderNavBar()}

          <Switch>
            <Route path="/items" />
            <Route path="/profile" />
            <Route path="/login" />
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
          </Switch>

        </div>
      </BrowserRouter>
    )
  }
}

export default App;
