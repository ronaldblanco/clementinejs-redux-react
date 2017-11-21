import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { createRoutes } from '../client/src/routes.jsx';
import reducer from '../client/src/reducer';
import Users from './models/users';

import production from './views/production';
import development from './views/development';

const renderHelper = (res, location, routes, store, appEnv) => {
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      const finalState = store.getState();
      let finalSend;
      if (appEnv.env === 'development') finalSend = development(html, finalState, appEnv.socket);
      else if (appEnv.env === 'production') finalSend = production(html, finalState, appEnv.socket);
      res.send(finalSend);
    } else {
      res.status(404).send('Not found');
    }
  });
};

/* eslint-disable object-shorthand */
const ServerRender = (appEnv) => (req, res) => {
  // eslint-disable-next-line no-console
  // console.log(req.originalUrl);
  if (req.isAuthenticated()) {
    const user = req.user.twitter;
    // redirect to main if logged in
    if (req.url === '/login') return res.redirect(302, '/main');
    Users.findOne({ 'twitter.id': user.id }, (err, response) => {
      if (err) return res.status(500).send(err.message);
      const initialState = {
        mainReducer: {
          counter: response.nbrClicks.clicks,
          clicks: response.nbrClicks.clicks,
          loggedIn: true,
          user,
          data: response.info.data || [],
          message: { message: '', type: '' },
          env: appEnv.admin,
          appEnv: appEnv,
        },
      };
      const store = createStore(reducer, initialState);
      const routes = createRoutes(store);
      return renderHelper(res, req.url, routes, store, appEnv);
    });
  } else if (req.url === '/adminform' || appEnv.admin === 'TRUE') {
    // redirect to login if not logged in
    Users
      .find({}, {})
      .exec((err, result) => {
        if (err) { throw err; }
        const users = [];
        result.forEach((user) => {
          users.push({
            username: user.twitter.username,
            display: user.twitter.displayName,
            email: user.twitter.email,
            password: user.twitter.password,
            clicks: user.nbrClicks.clicks,
            datas: user.info.data,
          });
        });
        const initialState = {
          mainReducer: {
            message: { message: '', type: '' },
            local: false,
            newUser: {},
            adminForm: { users: users || [] },
            env: appEnv.admin,
            appEnv: appEnv,
          },
        };
        const store = createStore(reducer, initialState);
        const routes = createRoutes(store);
        return renderHelper(res, req.url, routes, store, appEnv);
      });
  } else {
    const initialState = {
      mainReducer: {
        message: { message: '', type: '' },
        local: false,
        newUser: {},
        adminForm: { users: {} },
        env: appEnv.admin,
        appEnv: appEnv,
      },
    };
    if (req.url !== '/login' && req.url !== '/creationoklocal') return res.redirect(302, '/login');
    const store = createStore(reducer, initialState);
    const routes = createRoutes(store);
    return renderHelper(res, req.url, routes, store, appEnv);
  }
  return null;
};
/* eslint-enable object-shorthand */

export default ServerRender;
