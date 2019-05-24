const jwt = require('jsonwebtoken')

function createAccessToken(user){
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1d'})
}

function verifyAccessToken(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { createAccessToken, verifyAccessToken }