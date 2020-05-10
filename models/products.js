const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const productsFixture = require('../fixtures/products.json')

// Product types dict
const typeEnum = {
    COLCHON: 1,
    SOMIER: 2
};

// Product schema 
const ProductSchema = new Schema({
    type: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Product static methods
ProductSchema.statics = {
    /**
     * Get product by id
     * @param {String} id - The id of the product.
     * @returns {Promise<Product, APIError>}
     */
    get(id) {
        return this.findById(id)
            .then((product) => {
                if (product) {
                    return product;
                }
                const err = new APIError('No such campaign exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List products in descending order of 'createdAt' timestamp, paginating them.
     * @param {number} skip - Number of products to be skipped.
     * @param {number} limit - Limit number of products to be returned.
     * @param {string} sort - Sort by this field.
     * @param {string} filter - Filter by including this string in the name.
     * @param {number} type - Filter by including this number in the type.
     * @param {boolean} isFeatured - Filter by including this boolean in isFeatured.
     * @returns {docs: Product[], total: Integer, limit: Integer, offset: Integer}
     */
    list({ sort = '-createdAt', filter = '', skip = 0, limit = 50, type, isFeatured } = {}) {
        const filters = { name: new RegExp(filter, 'i') }
        if (type) filters.type = type;
        if (isFeatured) filters.isFeatured = isFeatured;
        
        return this.paginate(filters, {
            sort,
            offset: skip,
            limit,
            select: { __v: 0 },
            lean: true
        });
    },

    /**
     * Get colchon type products
     * @param {number} skip - Number of products to be skipped.
     * @param {number} limit - Limit number of products to be returned.
     * @param {string} sort - Sort by this field.
     * @param {string} filter - Filter by including this string in the name.
     * @returns {docs: Product[], total: Integer, limit: Integer, offset: Integer }
     */
    getColchonProducts({ sort = '-createdAt', filter = '', skip = 0, limit = 50, type = typeEnum.COLCHON  } = {}) {
        // return this.find({ type: typeEnum.COLCHON });
        return this.list({ sort, filter, limit, skip, type })
    },

    /**
     * Get somier type products
     * @param {number} skip - Number of products to be skipped.
     * @param {number} limit - Limit number of products to be returned.
     * @param {string} sort - Sort by this field.
     * @param {string} filter - Filter by including this string in the name.
     * @returns {docs: Product[], total: Integer, limit: Integer, offset: Integer }
     */
    getSomierProducts({ sort = '-createdAt', filter = '', skip = 0, limit = 50, type = typeEnum.SOMIER } = {}) {
        return this.list({ sort, filter, limit, skip, type })
    },

    /**
     * Get featured products
     * @param {number} skip - Number of products to be skipped.
     * @param {number} limit - Limit number of products to be returned.
     * @param {string} sort - Sort by this field.
     * @param {string} filter - Filter by including this string in the name.
     * @returns {docs: Product[], total: Integer, limit: Integer, offset: Integer }
     */
    getFeaturedProducts({ sort = '-createdAt', filter = '', skip = 0, limit = 50, isFeatured = true } = {}) {
        return this.list({ sort, filter, limit, skip, isFeatured })
    },

    /**
     * Create and populate products collection
     */
    populateProducts() {
        this.insertMany(productsFixture);
    }
}

ProductSchema.plugin(mongoosePaginate);
module.exports = { Product: mongoose.model('Product', ProductSchema), typeEnum };
