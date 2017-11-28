/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
export default function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    if (req.method === 'GET') {
      return res.redirect(301, `https://${req.hostname}${req.url}`);
    } else {
      throw new 'It is not a valid request!';
    }
  }
  next();
}
/* eslint-enable consistent-return */
/* eslint-enable no-else-return */
