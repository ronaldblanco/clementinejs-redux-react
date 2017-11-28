/* 
  Express compatible with promise generators
  by creating a little wrap function
*/
var Promise = require('bluebird');
export function wrap (genFn) { // 1
    var cr = Promise.coroutine(genFn); // 2
    return function (req, res, next) { // 3
        cr(req, res, next).catch(next); // 4
    };
}

// To log errors
export function logErrors(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(`${req.originalUrl} have the fallowing error:${err.stack}`);
  next(err);
}

// Client errors
export function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

// General errors (All)
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
