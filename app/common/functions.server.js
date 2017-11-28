const fs = require('fs');
const compression = require('compression');
const winston = require('winston');
require('winston-daily-rotate-file');
const rimraf = require('rimraf');
const exec = require('child_process');

// LOGGER///////////////////////////////////////////
const transport = new winston.transports.DailyRotateFile({
  filename: './log/log',
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
});
const logger = new (winston.Logger)({
  transports: [
    transport,
  ],
});
function logIt(loggerVal, info) {
  loggerVal.info(info);
}
// functions.logIt(logger,'//////////////////STARTING LOGGER INFO////////////////////////');
// ///////////////////////////////////////////////

module.exports = {
  execute: (cmd) => {
    exec.exec(cmd, (err, stdout, stderr) => {
      if (err) {
        /* eslint-disable no-console */
        console.log(`${cmd} was not execute!`);
        /* eslint-enable no-console */
        return;
      }

      // the *entire* stdout and stderr (buffered)
      /* eslint-disable no-console */
      console.log(`${cmd} was execute!`);
      /* eslint-enable no-console */
      // console.log('stdout: ' + stdout);
      /* eslint-disable no-console */
      if (stderr) { console.log(`stderr: ${stderr}`); }
      /* eslint-enable no-console */
    });
  },

  logIt: (loggerVal, info) => {
    loggerVal.info(info);
  },

  cacheIt: (req, res, next) => {
    let cache;
    if (process.env.NODE_ENV === 'development') {
      logIt(logger, req.url);
      cache = '0';
    } else if (process.env.NODE_ENV === 'production') { cache = '3600'; }
    // console.log(req.url);
    // if (req.url.match(/^\/(css|js|img|font|png|map)\/.+/)) {
        // res.set('Cache-Control', 'public, max-age=3600');
    // }
    if (req.url.match('/dist/bootstrap.min.css.map')) {
      // logger.info('Cache bootstrap');
      res.set('Cache-Control', 'public, max-age=3600');// seconds
    }
    // res = functions.cache(req, res, '/public/css/bootstrap.min.css.map', '3600');
    if (req.url.match('/login') || req.url.match('/profile')) {
      // logger.info('Cache Login or Profile');
      res.set('Cache-Control', `public, max-age= ${cache}`);// seconds
    }
    next();
  },

  // TESTS ONLY
  checkIt: (req, res, next) => {
    next();
  },

  ensureExists: (path, mask, cb) => {
    /* eslint-disable no-param-reassign */
    if (typeof mask === 'function') { // allow the `mask` parameter to be optional
      cb = mask;
      mask = '0777';
    }
    /* eslint-enable no-param-reassign */
    fs.mkdir(path, mask, (err) => {
      if (err) {
        if (err.code === 'EEXIST') { cb(null); } // ignore the error if the folder already exists
        /* eslint-disable brace-style */
        else { cb(err); } // something else went wrong
        /* eslint-enable brace-style */
      } else {
        cb(null);
      } // successfully created folder
    });
  },

  deleteFolder: (path, cb) => {
    rimraf(path, (err) => {
      if (err) {
        if (err.code === 'EEXIST') { cb(null); } // ignore the error if the folder already exists
        /* eslint-disable brace-style */
        else { cb(err); } // something else went wrong
        /* eslint-enable brace-style */
      } else {
        cb(null);
      } // successfully created folder
    });
  },

  shouldCompress: (req, res) => {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      /* eslint-disable no-console */
      // console.log(`${req.url} not Compressed`);
      /* eslint-enable no-console */
      return false;
    }
    // fallback to standard filter function
    // console.log(req.url + ' Compressed');
    return compression.filter(req, res);
  },

  transport: new winston.transports.DailyRotateFile({
    filename: './log/log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  }),
};
