import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducer/index';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './containers/Root/Root';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Router basename="/ohtwo">
    <Root store={store} />
  </Router>,
  document.getElementById('root')
);
