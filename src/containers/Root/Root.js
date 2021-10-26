import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './Root.css';

/* components imports */
import Home  from '../../components/Home/Home';
import Menu  from '../Menu/Menu';
import About from '../../components/About/About';

/* container imports*/
import LoginContainer from '../LoginContainer/LoginContainer'

const Root =  ({ store }) => (
  <Provider store={store}>
    <div className="App">
      <header className="AppHeader">
        <Menu />
      </header>
      <Route path="/items" />
      <Route path="/profile" />
      <Route path="/login" component={LoginContainer} />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
    </div>
  </Provider>
)

export default Root;