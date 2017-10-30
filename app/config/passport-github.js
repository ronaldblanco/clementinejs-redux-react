
import { Strategy as GitHubStrategy } from 'passport-github';
import User from '../models/users';
import configAuth from './auth';

export default function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL,
  }, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'twitter.id': profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        const newUser = new User();

        newUser.twitter.id = profile.id;
        newUser.twitter.username = profile.username;
        newUser.twitter.displayName = profile.displayName;
        newUser.nbrClicks.clicks = 0;

        newUser.save((error) => {
          if (error) {
            throw error;
          }
          return done(null, newUser);
        });
        return true;
      });
    });
  }));
}
