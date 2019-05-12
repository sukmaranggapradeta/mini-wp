const { verifyAccessToken } = require('../helpers/token')
const User = require('../models/usersModel')

module.exports = function(req, res, next) {
    try {
        console.log('masuk authenticateeeeeeeeeeeeeeeeeeeeeeee')
        console.log(req.headers.token)
        let decoded = verifyAccessToken(req.headers.token);
        console.log(decoded, 'ini decodeeeeeeeeeeeeeeeeeeeeeed')
        User.findOne({
                email: decoded.email
            })
            .then(user => {
                console.log(user,"ini userrrrrrrrrrrrrrrrrrrrrrrrrrrr")
                if (user) {
                    req.decoded = decoded;
                    console.log(req.decoded, 'decoded')
                    next()
                } else {
                    throw { message: 'Email not found' }
                }
            })
            .catch(err => {
                // console.log(err);
                res.status(404).json({ msg: err.message })
            })

    } catch (error) {
        // res.status(404).json({ msg: err.message })
        console.log(error);
        throw 'Token wrong!'
    }
} 