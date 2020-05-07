const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Product types dict
const typeEnum = {
    COLCHON: 1,
    SOMIER: 2
};

// Product schema 
const ProductSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: Number,
        enum: typeEnum,
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
    }
});

module.exports = mongoose.model('Product', ProductSchema);
