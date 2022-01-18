/**
 * This function receives an async function and executes it.
 * @param {function} fn Async function 
 * @returns 
 */
 function wrapAsync(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch((e) => next(e));
    };
  }


module.exports = wrapAsync;
