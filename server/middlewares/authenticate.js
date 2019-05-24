const { verifyAccessToken } = require('../helpers/token')
const User = require('../models/usersModel')

module.exports = function(req, res, next) {
    try {
        let decoded = verifyAccessToken(req.headers.token);
        User.findOne({
                email: decoded.email
            })
            .then(user => {
                if (user) {
                    req.decoded = decoded;
                    next()
                } else {
                    throw { message: 'Email not found' }
                }
            })
            .catch(err => {
                res.status(404).json({ msg: err.message })
            })

    } catch (error) {
        throw 'Token wrong!'
    }
} 