import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { watchAuth } from './store/sagas';
import reducer from './store/reducers';

import './App.css';

import About from './components/About/About';
import Menu  from './components/Menu/Menu';
import Home  from './components/Home/Home';
import Login from './components/Login/Login';

// For this to work in your development browser you are going to need to add the extension Redux DevTools, else just comment the development case
const composeEnhancers = process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null
    || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)))

sagaMiddleware.run(watchAuth)

class App extends Component {
  renderNavBar() { // Left this here so that we can change the menu when the user is logged in.
    return (
      <header className="AppHeader">
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
              <Route path="/login" component={Login} />
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
