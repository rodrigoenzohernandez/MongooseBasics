var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')

const validateProduct = require('../middlewares/validateProduct')


router.get('/', wrapAsync(productController.getProducts));

router.get('/:id', wrapAsync(productController.getProductDetail));

router.post('/', validateProduct, wrapAsync(productController.createProduct));

router.put('/', wrapAsync(productController.updateProduct));

router.delete('/', wrapAsync(productController.deleteProduct));

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

module.exports = router;
