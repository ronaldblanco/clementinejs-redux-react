
import Users from '../models/users.js';
import url from 'urlparser';

function DataHandler() {
  this.getDatas = (req, res) => {
    Users
      .findOne({ 'twitter.id': req.user.twitter.id }/* , { '_id': false } */)
      .exec((err, result) => {
        if (err) { throw err; }
        // console.log(result.info);
        res.json(result.info);
      });
  };

  this.addData = (req, res) => {
    const myUrl = url.parse(req.originalUrl);
    // console.log(myUrl);
    const newData = { name: unescape(myUrl.query.params.name) };
    Users
      .findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, { $push: { 'info.data': newData } })
      .exec((err, result) => {
        if (err) { throw err; }
        res.json(result.info);
      });
  };

  this.deleteData = (req, res) => {
    const myUrl = url.parse(req.originalUrl);
    Users
      .findOneAndUpdate({ 'twitter.id': req.user.twitter.id },
      { $pull: { 'info.data': { name: unescape(myUrl.query.params.name) } } })
      .exec((err, result) => {
        if (err) { throw err; }
        res.json(result.info);
      });
  };

  this.getAllDatas = (req, res) => {
    Users
      .find({}, {})
      .exec((err, result) => {
        if (err) { throw err; }
        const final = [];
        result.forEach((user) => {
          user.info.data.forEach((data) => {
            final.push(data);
          });
        });
        // console.log(final);
        res.send(final);
      });
  };
}

module.exports = DataHandler;
