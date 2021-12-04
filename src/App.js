import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { watchAuth } from './store/sagas';
import reducer from './store/reducers';

import './App.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Container from '@mui/material/Container';

import About   from './components/About/About';
import Menu    from './components/Menu/Menu';
import Home    from './components/Home/Home';
import Items   from './components/Items/Items';
import Login   from './components/Login/Login';
import Profile from './components/Userprofile/UserProfile';
import Donations from './components/Donations/Donations';

// For this to work in your development browser you are going to need to add the extension Redux DevTools, else just comment the development case
// const composeEnhancers = process.env.NODE_ENV === 'development'
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null
//     || compose
const composeEnhancers = null || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)))

sagaMiddleware.run(watchAuth)

class App extends Component {
  renderNavBar() {
    return (
      <Menu />
    )
  }

  render() {
    return (
      <BrowserRouter basename="/ohtwo">
        <Provider store={store}>
            {this.renderNavBar()}

            <Container sx={{ minHeight: '100%' }}>
              <Switch>
                <Route path="/items" component={Items} />
                <Route path="/profile" component={Profile} />
                <Route path="/donations" component={Donations} />
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
              </Switch>
            </Container>
        </Provider>
      </BrowserRouter>
    )
  }
}

export default App;
