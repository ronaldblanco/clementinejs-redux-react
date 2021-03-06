
import Users from '../models/users.js';
// const yields = require('express-yields');

/* eslint-disable func-names */
function ClickHandler() {
  this.getClicks = function* (req, res) {
    const clicks = yield Users
    .findOne({ 'twitter.id': req.user.twitter.id }, { _id: false })
      .exec();
    res.json(clicks.nbrClicks);
  };

  this.addClick = function* (req, res) {
    const clicks = yield Users
    .findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
      { $inc: { 'nbrClicks.clicks': 1 } })
      .exec();
    res.json(clicks.nbrClicks);
  };

  this.resetClicks = function* (req, res) {
    const clicks = yield Users
			.findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
        { 'nbrClicks.clicks': 0 })
      .exec();
    res.json(clicks.nbrClicks);
  };
}
/* eslint-enable func-names */
module.exports = ClickHandler;
