
import Users from '../models/users.js';
// import message from '../models/message.js';
// import email from 'emailjs/email';
import randomize from 'randomatic';
// import md5Hex from 'md5-hex';
// import url from 'urlparser';

// import winston from 'winston';
// require('winston-daily-rotate-file');
// import functions from '../common/functions.server.js';

// LOGGER//////////////////////////////////////////
/* const logger = new (winston.Logger)({
  transports: [
    functions.transport,
  ],
}); */
// functions.logIt(logger,'//////////////////STARTING LOGGER INFO////////////////////////');
// ///////////////////////////////////////////////

// Helper to validate email based on regex
/* eslint-disable max-len */
const EMAIL_REGEX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
/* eslint-enable max-len */
// ///////////////////////////////////////////////////
function validateEmail(emailV) {
  if (typeof emailV === 'string' && EMAIL_REGEX.test(emailV)) {
    return emailV.toLowerCase();
  }
  return false;
}
// ///////////////////////////////////////////////////

function AdminHandler() {
  this.getAllUsers = (req, res) => {
    Users
      .find({}, {})
      .exec((err, result) => {
        if (err) { throw err; }
        const users = [];
        // const form = [];
        result.forEach((user) => {
          // user.info.data.forEach((data) => {
          users.push({
            username: user.twitter.username,
            display: user.twitter.displayName,
            email: user.twitter.email,
            password: user.twitter.password,
            clicks: user.nbrClicks.clicks,
            datas: user.info.data,
          });
          // });
        });
        // console.log(users);
        /* eslint-disable object-shorthand */
        res.send({ users: users });
        /* eslint-enable object-shorthand */
      });
  };
  this.adminAddUser = (req, res) => {
    const form = {};
    form.username = req.originalUrl.toString().split('?username=')[1].split('?display=')[0];
    form.display = req.originalUrl.toString().split('?display=')[1].split('?email=')[0];
    form.email = req.originalUrl.toString().split('?email=')[1].split('?password=')[0];
    form.password = req.originalUrl.toString().split('?password=')[1].split('?clicks=')[0];
    form.clicks = req.originalUrl.toString().split('?clicks=')[1].split('?datas=')[0];
    form.datas = req.originalUrl.toString().split('?datas=');
    form.datas.shift();
    const newData = [];
    form.datas.map((data) => {
      newData.push({ name: data });
      return 0;
    });
    form.datas = newData;
    console.log(form);
    let final = {};
    /* eslint-disable max-len */
    Users
        .findOneAndUpdate({ 'twitter.username': form.username }, { 'twitter.displayName': form.display, 'twitter.email': form.email, 'twitter.password': form.password, 'nbrClicks.clicks': form.clicks, 'info.data': form.datas })
          /* eslint-enable max-len */
          .exec((err, result) => {
            if (err) { throw err; }
            if (result === null) {
              const newUser = new Users();
              newUser.twitter.username = form.username;
              const emailU = validateEmail(form.email);
              if (emailU !== false) { newUser.twitter.email = emailU; }
              newUser.twitter.password = form.password;
              newUser.twitter.id = randomize('0', 7);
              newUser.twitter.displayName = form.display;
              newUser.nbrClicks.clicks = form.clicks;
              newUser.info.data = form.datas;
              newUser.save((erru) => {
                if (erru) {
                  throw erru;
                }
                final = { result: 'created-new' };
              });
            }
            /* eslint-disable object-shorthand */
            final = { result: result };
            /* eslint-enable object-shorthand */
          });
    res.send(final);
  };
  this.adminDelUser = (req, res) => {
    const form = {};
    form.username = req.originalUrl.toString().split('?username=')[1];
    console.log(form);
    let final = {};
    Users
        .findOne({ 'twitter.username': form.username }, {})
          .remove().exec((err, result) => {
            if (err) { throw err; }
            /* if (result === null) {
            } */
            /* eslint-disable object-shorthand */
            final = { result: result };
            /* eslint-enable object-shorthand */
          });
    res.send(final);
  };
}

module.exports = AdminHandler;
