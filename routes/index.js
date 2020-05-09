const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');

/* GET home page. */
router.route('/')
  .get(productsCtrl.list);
/*
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
*/

module.exports = router;
