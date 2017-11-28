const path = process.cwd();
import ClickHandler from '../controllers/clickHandler.server';
import DataHandler from '../controllers/dataHandler.server.js';
import UserHandler from '../controllers/userHandler.server.js';
import AdminHandler from '../controllers/adminHandler.server.js';
import ServerRender from '../serverRender.js';

import { wrap } from '../common/errors.js';

export default function (app, passport, passportGitHub, emailServer, passportLocal, appEnv) {
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.json({ status: 'forbidden' });
  }
  function isNotLoggedIn(req, res, next) {
    return next();
  }

  const clickHandler = new ClickHandler();
  const dataHandler = new DataHandler();
  const userHandler = new UserHandler(emailServer, appEnv.env);
  const adminHandler = new AdminHandler();
  const serverRender = new ServerRender(appEnv);

  app.route('/api/user')
    .get((req, res) => {
      if (req.user && req.user.twitter) {
        return res.json(req.user.twitter);
      }
      return res.json({ unauth: true });
    });

  app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login',
    }));

  app.route('/auth/github')
		.get(passportGitHub.authenticate('github'));

  app.route('/auth/github/callback')
    .get(passportGitHub.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login',
    }));

  app.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/login');
    });

  app.route('/api/user/clicks')
		.get(isLoggedIn, wrap(clickHandler.getClicks))
		.post(isLoggedIn, wrap(clickHandler.addClick))
		.delete(isLoggedIn, wrap(clickHandler.resetClicks));

  app.route('/api/:id/info')
		.get(isLoggedIn, dataHandler.getDatas);

  app.route('/api/:id/infoadd')
		.post(isLoggedIn, dataHandler.addData);

  app.route('/api/:id/infodel')
    .delete(isLoggedIn, dataHandler.deleteData);

  app.route('/admin/getusers')
		.get(isNotLoggedIn, adminHandler.getAllUsers);

  app.route('/admin/setusers')
		.post(isNotLoggedIn, adminHandler.adminAddUser);

  app.route('/admin/delusers')
		.post(isNotLoggedIn, adminHandler.adminDelUser);

  app.route('/*')
    .get(serverRender);

    // ///////////////////////////////////////////////////////////////
  app.route('/auth/local')
		.get(passportLocal.authenticate('local', { failureRedirect: '/authlocal' }),
    (req, res) => res.redirect('/')
    )
		.post(passportLocal.authenticate('local', { failureRedirect: '/authlocal' }),
    (req, res) => res.redirect('/')
    );

  app.route('/auth/localnew')
		.post(isNotLoggedIn, userHandler.addUser);

  app.route('/auth/localnewreset')
		.post(isNotLoggedIn, userHandler.resetPass);

  app.route('/auth/localnewmessage')
		.get(isNotLoggedIn, userHandler.message);

  app.route('/auth/localnewok')
		.get((req, res) => res.sendFile(`${path}/public/usercreationOK.html`)
		);

	// ///////////////////////////////////////////////////////////////
}
