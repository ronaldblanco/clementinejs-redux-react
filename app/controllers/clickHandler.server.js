
import Users from '../models/users.js';

function ClickHandler() {
  this.getClicks = (req, res, next) => {
    Users
			.findOne({ 'twitter.id': req.user.twitter.id }, { _id: false })
      .exec((err, result) => {
        if (err) { return next(err); }
        res.json(result.nbrClicks);
      }).catch(next);
  };

  this.addClick = (req, res, next) => {
    Users
    .findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
      { $inc: { 'nbrClicks.clicks': 1 } })
    .exec((err, result) => {
      if (err) { return next(err); }
      res.json(result.nbrClicks);
    }).catch(next);
  };

  this.resetClicks = (req, res, next) => {
    Users
			.findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
        { 'nbrClicks.clicks': 0 })
      .exec((err, result) => {
        if (err) { return next(err); }
        res.json(result.nbrClicks);
      }).catch(next);
  };
}

module.exports = ClickHandler;
