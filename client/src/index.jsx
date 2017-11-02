import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createRoutes } from './routes.jsx';

// eslint-disable-next-line no-unused-vars
import css from '../style/main.scss';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__;
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk) /* + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
);

const routes = createRoutes(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('appView'));
