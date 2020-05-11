/**
 * @module controllers/users
 */

const httpStatus = require('http-status');
const User = require('../models/users');
const authenticator = require('../helpers/authenticator');
const hasher = require('../helpers/hasher');
const APIError  = require('../helpers/APIError');

/**
 * Get users list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @property {string} req.query.sort - Sort by this field.
 * @property {string} req.query.filter - Filter by including this string in the name.
 * @returns { {docs: User[], total: Integer, limit: Integer, offset: Integer }
 */
const list = (req, res, next) => {
    const { sort = '-createdAt', filter = '', skip = 0, limit = 50 } = req.query;
    User.list({ sort, filter, limit, skip }).then(
        data => res.json(data))
    .catch(e => next(e));
}

/**
 * Login an user
 * @property {string} req.body.email - The email of the user.
 * @property {string} req.body.password - The password of the user.
 * @returns {string} Token - Current user token.
 * @returns {User} User - Current user profile.
 */
const login = (req, res, next) => {
    User.getByEmail(req.body.email).then((user) => {
        // Calculate the hash of the received password using the stored salt and check if matches stored one
        const genPasssword = hasher.sha512(req.body.password, user.password.salt);
        if (genPasssword.hash !== user.password.hash) {
            next(new APIError('Invalid credentials', httpStatus.UNAUTHORIZED));
            return;
        }

        const payload = {
            email: user.email,
            token: authenticator.generateToken({ email: user.email })
        };
        res.json(payload);
    }).catch((e) => {
        if (e.status === httpStatus.NOT_FOUND) {
            next(new APIError('Invalid credentials', httpStatus.UNAUTHORIZED));
            return;
        }
        next(new APIError('Impossible to fetch user'));
    });
}

/**
 * Revoke a user token
 * @property {string} req.body.userId - The id of the user.
 */ 
const logout = (req, res, next) => {
    User.getById(req.body.userId).then(user => {
        // TODO Complete the method
    }).catch(e => next(e));
}

/**
 * Change and user password
 * @property {string} req.body.email - The email of the user.
 * @property {string} req.body.password - The password of the user.
 * @property {string} req.body.newPassword - The new password of the user.
 */ 
const changePassword = (req, res, next) => {
    // TODO Complete the method
}

module.exports = { 
    changePassword,
    list,
    login,
    logout
};
