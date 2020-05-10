const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');
// const usersCtrl = require('../controllers/users');

/* GET home page. */
/*
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
*/
router.route('/').get(productsCtrl.getFeaturedProducts);

router.route('/colchones')
  .get(productsCtrl.getColchonProducts)
  .post(productsCtrl.createColchon);

router.route('/somieres')
  .get(productsCtrl.getSomierProducts)
  .post(productsCtrl.createSomier);

router.route('/colchones/:colchonId')
  .get(productsCtrl.get);

router.route('/somieres/:somierId')
  .get(productsCtrl.get);

router.route('/login')
  .post(usersCtrl.login);

module.exports = router;
