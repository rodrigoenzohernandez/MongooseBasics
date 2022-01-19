var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductDetail);

router.post('/', productController.createProduct);

router.put('/', productController.updateProduct);

router.delete('/', productController.deleteProduct);

module.exports = router;
