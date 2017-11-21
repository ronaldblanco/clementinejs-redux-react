
const localStrategy = require('passport-local').Strategy;
import md5Hex from 'md5-hex';
import User from '../models/users';

module.exports = (passportLocal) => {
  /* eslint-disable new-cap */
  passportLocal.use(new localStrategy(
    /* eslint-enable new-cap */
    (username, password, cb) => {
      User.findOne({ 'twitter.username': username,
      'twitter.password': md5Hex(password) },
      (err, user) => {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
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
