var express = require('express');
var router = express.Router();
const farmController = require('../controllers/farmController')

router.get('/', farmController.getFarms)

module.exports = router;
