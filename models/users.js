/**
 * @module models/users
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const httpStatus = require('http-status');
const APIError  = require('../helpers/APIError');
const usersFixture = require('../fixtures/users.json')

// User schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    password: {
        hash: {
          type: String,
          required: true
        },
        salt: {
          type: String,
          required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Product static methods
UserSchema.statics = {
    /**
     * Get user by id
     * @param {String} id - The id of user.
     * @returns {Promise<User, APIError>}
     */
    getById(id) {
        return this.findById(id).then((user) => {
            if (user) {
                return user;
            }
            const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
            return Promise.reject(err);
        });
    },
    
    /**
     * Get user by email
     * @param {String} email - The email of user.
     * @returns {Promise<User, APIError>}
     */
    getByEmail(email) {
        return this.findOne({ email }).then((user) => {
            if (user) {
              return user;
            }
            const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
            return Promise.reject(err);
          });
    },
    
    /**
     * List users in descending order of 'createdAt' timestamp, paginating them.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @param {string} sort - Sort by this field.
     * @param {string} filter - Filter by including this string in the email.
     * @returns {Promise<{docs: User[], total: Integer, limit: Integer, offset: Integer}>}
     */
    list({ sort = '-createdAt', filter = '', skip = 0, limit = 50 } = {}) {
        return this.paginate({ email: new RegExp(filter, 'i')}, {
            sort, offset: skip, limit, select: { __v: 0, password: 0 }
        });
    },

    /**
     * Create and populate users collection
     */
    populateUsers() {
        this.insertMany(usersFixture);
    }
}

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);
