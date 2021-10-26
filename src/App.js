import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import About from './components/About/About';
import Menu  from './components/Menu/Menu';
import Home  from './components/Home/Home';
import reducer from './store/reducers';

const store = createStore(reducer)

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
        <Provider store={store}>
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
        </Provider>
      </BrowserRouter>
    )
  }
}

export default App;
