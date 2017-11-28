
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
