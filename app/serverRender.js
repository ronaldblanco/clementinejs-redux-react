import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { createRoutes } from '../client/src/routes.jsx';
import reducer from '../client/src/reducer';
import Users from './models/users';

const renderHelper = (res, location, routes, store) => {
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
      // console.log(finalState);
      res.send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="UTF-8"/>
          <!--Always force latest IE rendering engine (even in intranet)
            & Chrome Frame Remove this if you use the .htaccess
          -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
          <meta name="description" content="Clementinejs"/>
          <meta name="author" content="Ronald"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Clementine-React-Redux</title>
          <link rel="stylesheet" href="/static/style.css" media="all">
          <link rel="stylesheet" href="/static/w3.min.css"/>
          <link rel="stylesheet" href="/static/bootstrap.min.css"/>
        </head>
        <body>
          <div id="appView">${html}</div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(finalState)}
          </script>
          <br><br><center><p>Created by Ronald Blanco using clementine.js.</p></center>
          <script src="/static/vendors.js"></script>
          <script src="/static/bundle.js"></script>
          <script src="/static/jquery-2.2.4.min.js"></script>
          <script src="/static/bootstrap.min.js"></script>
        </body>
      </html>
      `);
    } else {
      res.status(404).send('Not found');
    }
  });
};

// export default (req, res) => {
const ServerRender = (appEnv) => (req, res, next) => {
  console.log(req.originalUrl);
  // console.log(appEnv);
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
        },
      };
      const store = createStore(reducer, initialState);
      const routes = createRoutes(store);
      return renderHelper(res, req.url, routes, store);
    });
  } else if (req.url === '/adminform' || appEnv.admin === 'TRUE') {
    // redirect to login if not logged in
    Users
      .find({}, {})
      .exec((err, result) => {
        if (err) { throw err; }
        const users = [];
        result.forEach((user) => {
            users.push({username: user.twitter.username, display: user.twitter.displayName, email: user.twitter.email, password:user.twitter.password, clicks: user.nbrClicks.clicks, datas: user.info.data});
        });
            const initialState = {
              mainReducer: {
                message: { message: '', type: '' },
                local: false,
                newUser: {},
                adminForm: {users: users || []},
                env: appEnv.admin,
              },
            };
            // if (req.url !== '/login' && req.url !== '/creationoklocal' && req.url !== '/admin/getusers') return res.redirect(302, '/login');
            const store = createStore(reducer, initialState);
            const routes = createRoutes(store);
            return renderHelper(res, req.url, routes, store);
      });
  } else {
    const initialState = {
      mainReducer: {
        message: { message: '', type: '' },
        local: false,
        newUser: {},
        adminForm: {users: {}},
        env: appEnv.admin,
      },
    };
    if (req.url !== '/login' && req.url !== '/creationoklocal') return res.redirect(302, '/login');
    const store = createStore(reducer, initialState);
    const routes = createRoutes(store);
    return renderHelper(res, req.url, routes, store);
  }
  return null;
};

export default ServerRender;
