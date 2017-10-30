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

export default (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user.twitter;
    // redirect to main if logged in
    if (req.url === '/login') return res.redirect(302, '/main');
    Users.findOne({ 'twitter.id': user.id }, (err, response) => {
      if (err) return res.status(500).send(err.message);
      const initialState = {
        counter: response.nbrClicks.clicks,
        clicks: response.nbrClicks.clicks,
        loggedIn: true,
        user,
        data: response.info.data || [],
        message: { message: '', type: '' },
      };
      const store = createStore(reducer, initialState);
      const routes = createRoutes(store);
      return renderHelper(res, req.url, routes, store);
    });
  } else {
    // redirect to login if not logged in
    const initialState = { message: { message: '', type: '' }, local: false };
    if (req.url !== '/login') return res.redirect(302, '/login');
    // else if (req.url === '/createlocal') initialState.local = true;
    // const initialState = {};
    // const initialState = { message: { message: '', type: '' }, local: false };
    const store = createStore(reducer, initialState);
    const routes = createRoutes(store);
    return renderHelper(res, req.url, routes, store);
  }
  return null;
};
