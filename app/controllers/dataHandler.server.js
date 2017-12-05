
import Users from '../models/users.js';
import url from 'urlparser';
/* eslint-disable func-names */
/* eslint-disable consistent-return */
function DataHandler() {
  this.getDatas = function* (req, res) {
    const vars = yield Users
      .findOne({ 'twitter.id': req.user.twitter.id })
      .exec();
    res.json(vars.info);
  };

  this.addData = function* (req, res) {
    const name = req.originalUrl.split('?name=')[1].split('?value=')[0];
    const value = req.originalUrl.split('?value=')[1];
    const newData = { name: unescape(name), value: unescape(value) };
    const vars = yield Users
      .findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, { $push: { 'info.data': newData } })
      .exec();
    res.json(vars.info);
  };

  this.deleteData = function* (req, res) {
    const myUrl = url.parse(req.originalUrl);
    const vars = yield Users
      .findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
      { $pull: { 'info.data': { name: unescape(myUrl.query.params.name) } } })
      .exec();
    res.json(vars.info);
  };

  this.getAllDatas = (req, res, next) => {
    Users
      .find({}, {})
      .exec((err, result) => {
        if (err) { return next(err); }
        const final = [];
        result.forEach((user) => {
          user.info.data.forEach((data) => {
            final.push(data);
          });
        });
        res.send(final);
      }).catch(next);
  };
}
/* eslint-enable func-names */
/* eslint-enable consistent-return */
module.exports = DataHandler;
