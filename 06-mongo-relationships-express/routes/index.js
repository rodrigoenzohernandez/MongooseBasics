var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
  res.redirect('products')

});

module.exports = router;
