/**
 * @module controllers/products
 */

const httpStatus = require('http-status');
const { Product, typeEnum } = require('../models/products');

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
const _list = (req, res, next) => {
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
    Product.getColchonProducts({ sort, filter, skip, limit }).then((data) => {
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
    Product.getSomierProducts({ sort, filter, skip, limit }).then((data) => {
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
    Product.getFeaturedProducts({ sort, filter, skip, limit }).then((data) => {
        res.json(data);
    }).catch(e => next(e));
}

/**
 * Create new product
 * @property {string} req.body.name - The name of the product
 * @property {string} req.body.type - The product type
 * @property {string} req.body.price - The price of the product
 * @property {Object} req.body.image - The image of the product
 * @property {Object} req.body.description - The description of the product
 * @property {Object} req.body.isFeatured - Boolean representing either it is a featured or not
 * @returns {{ msg: String }}
 */
const _create = (req, res, next) => {
    // const product = new Product(req.body);
    const product = new Product({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        isFeatured: req.body.isFeatured
    });
    return product.save().then(() => {
        res.status(httpStatus.CREATED).json({ msg: 'Product saved!' })
    }).catch(e => next(e));
}

/**
 * Create new colchon type product
 * @property {string} req.body.name - The name of the colchon
 * @property {string} req.body.price - The price of the colchon
 * @property {Object} req.body.image - The image of the colchon
 * @property {Object} req.body.description - The description of the colchon
 * @property {Object} req.body.isFeatured - Boolean representing either it is a featured or not
 * @returns {{ msg: String }}
 */
const createColchon = (req, res, next) => {
    req.body.type = typeEnum.COLCHON;
    return _create(req, res, next);
}

/**
 * Create new somier type product
 * @property {string} req.body.name - The name of the somier
 * @property {string} req.body.price - The price of the somier
 * @property {Object} req.body.image - The image of the somier
 * @property {Object} req.body.description - The description of the somier
 * @property {Object} req.body.isFeatured - Boolean representing either it is a featured or not
 * @returns {{ msg: String }}
 */
const createSomier = (req, res, next) => {
    req.body.type = typeEnum.SOMIER;
    return _create(req, res, next);
}

/**
 * Edit a product
 * @property {string} req.params.productId - The id of the product.
 * @property {string} req.body.name - The name of the somier
 * @property {string} req.body.price - The price of the somier
 * @property {Object} req.body.image - The image of the somier
 * @property {Object} req.body.description - The description of the somier
 * @property {Object} req.body.isFeatured - Boolean representing either it is a featured or not
 * @returns {{ msg: String }}
 */
const edit = (req, res, next) => {
    Product.get(req.params.productId).then((product) => {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.description = req.body.description;
        product.isFeatured = req.body.isFeatured;
        
        return product.save().then(() => {
            res.status(httpStatus.OK).json({ msg: 'Product edited correctly!' })
        }).catch(e => next(e));
    }).catch(e => next(e));
}
 
/**
 * Delete a product
 * @property {string} req.params.productId - The id of the product.
 * @returns { msg: String }
 */
const remove = (req, res, next) => {
    Product.get(req.params.productId).then((product) => {
        return product.remove().then(() => {
            res.status(httpStatus.NO_CONTENT).json({ msg: 'Product deleted!' })
        }).catch(e => next(e));
    }).catch(e => next(e));
}

module.exports = { 
    createColchon,
    createSomier,
    edit,
    get,
    getColchonProducts,
    getFeaturedProducts,
    getSomierProducts,
    remove
};
