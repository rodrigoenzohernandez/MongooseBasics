/**
 * Express middleware; adds a timestamp `requestTime` property
 * to the incoming Request object
 * esee https://expressjs.com
 */

module.exports = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};
