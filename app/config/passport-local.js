
const localStrategy = require('passport-local').Strategy;
import md5Hex from 'md5-hex';
// var twitterStrategy = require('passport-twitter').Strategy;
// var GitHubStrategy = require('passport-github').Strategy;
import User from '../models/users';
// var configAuth = require('./auth');

module.exports = (passportLocal) => {
  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  /* eslint-disable new-cap */
  passportLocal.use(new localStrategy(
    /* eslint-enable new-cap */
    (username, password, cb) => {
      User.findOne({ 'twitter.username': username,
      'twitter.password': md5Hex(password) },
      (err, user) => {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        // if (user) { return cb(null, false); }
        return cb(null, user);
      });
    }
  ));

  passportLocal.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passportLocal.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });
};
