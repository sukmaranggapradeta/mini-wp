const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

function hashPassword(inputPassword){
    return bcrypt.hashSync(inputPassword, salt)
}

function verifyPassword(inputPassword, hash){
    return bcrypt.compareSync(inputPassword, hash)
}

module.exports = { hashPassword, verifyPassword }