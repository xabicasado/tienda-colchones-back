// import { Product, typeEnum } from '../models/products';
const Product = require('../models/products');

/**
 * Get a product
 * @property {string} req.params.productId - The id of the product.
 * @returns {Product}
 */
const get = (req, res, next) => {
    Product.get(req.params.productId)
        .then(product => res.json(product))
        .catch(e => next(e));
  }

/**
 * Get products list.
 * @property {number} req.query.skip - Number of products to be skipped.
 * @property {number} req.query.limit - Limit number of products to be returned.
 * @property {string} req.query.sort - Sort by this field.
 * @property {string} req.query.filter - Filter by including this string in the name.
 * @returns { docs: Product[], total: Integer, limit: Integer, offset: Integer }
 */
const list = (req, res, next) => {
    const { sort = '-createdAt', filter = '', skip = 0, limit = 50 } = req.query;
    Product.list({ sort, filter, skip, limit }).then((data) => {
        res.json(data);
    }).catch(e => next(e));
}

/**
 * Get colchon type products list.
 * @property {number} req.query.skip - Number of products to be skipped.
 * @property {number} req.query.limit - Limit number of products to be returned.
 * @property {string} req.query.sort - Sort by this field.
 * @property {string} req.query.filter - Filter by including this string in the name.
 * @returns { docs: Product[], total: Integer, limit: Integer, offset: Integer }
 */
const getColchonProducts = (req, res, next) => {
    const { sort = '-createdAt', filter = '', skip = 0, limit = 50 } = req.query;
    Product.getColchonProducts().then((data) => {
        res.json(data);
    }).catch(e => next(e));
}

/**
 * Get somier type products list.
 * @property {number} req.query.skip - Number of products to be skipped.
 * @property {number} req.query.limit - Limit number of products to be returned.
 * @property {string} req.query.sort - Sort by this field.
 * @property {string} req.query.filter - Filter by including this string in the name.
 * @returns { docs: Product[], total: Integer, limit: Integer, offset: Integer }
 */
const getSomierProducts = (req, res, next) => {
    const { sort = '-createdAt', filter = '', skip = 0, limit = 50 } = req.query;
    Product.getSomierProducts().then((data) => {
        res.json(data);
    }).catch(e => next(e));
}

/**
 * Get featured products list.
 * @property {number} req.query.skip - Number of products to be skipped.
 * @property {number} req.query.limit - Limit number of products to be returned.
 * @property {string} req.query.sort - Sort by this field.
 * @property {string} req.query.filter - Filter by including this string in the name.
 * @returns { docs: Product[], total: Integer, limit: Integer, offset: Integer }
 */
const getFeaturedProducts = (req, res, next) => {
    const { sort = '-createdAt', filter = '', skip = 0, limit = 50 } = req.query;
    Product.getFeaturedProducts().then((data) => {
        res.json(data);
    }).catch(e => next(e));
}

module.exports = { 
    getColchonProducts,
    getSomierProducts,
    getFeaturedProducts,
    list
};
