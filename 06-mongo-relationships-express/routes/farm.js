var express = require('express');
var router = express.Router();
const farmController = require('../controllers/farmController')

router.get('/', farmController.getFarms)

router.get('/:id', farmController.getFarmDetail)

router.get('/:id/products', farmController.addProductToFarm)

router.post('/', farmController.createFarm)


module.exports = router;
