
import Users from '../models/users.js';
import url from 'urlparser';

function DataHandler() {
  this.getDatas = (req, res, next) => {
    Users
      .findOne({ 'twitter.id': req.user.twitter.id }/* , { '_id': false } */)
      .exec((err, result) => {
        if (err) { return next(err); }
        res.json(result.info);
      }).catch(next);
  };

  this.addData = (req, res, next) => {
    // const myUrl = url.parse(req.originalUrl);
    const name = req.originalUrl.split('?name=')[1].split('?value=')[0];
    const value = req.originalUrl.split('?value=')[1];
    // console.log(myUrl);
    const newData = { name: unescape(name), value: unescape(value) };
    Users
      .findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, { $push: { 'info.data': newData } })
      .exec((err, result) => {
        if (err) { return next(err); }
        res.json(result.info);
      }).catch(next);
  };

  this.deleteData = (req, res, next) => {
    const myUrl = url.parse(req.originalUrl);
    Users
      .findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
      { $pull: { 'info.data': { name: unescape(myUrl.query.params.name) } } })
      .exec((err, result) => {
        if (err) { return next(err); }
        res.json(result.info);
      }).catch(next);
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

module.exports = DataHandler;
