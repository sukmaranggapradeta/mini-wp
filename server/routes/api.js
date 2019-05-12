const Router = require('express').Router()
const googleController = require('../controller/googleController')

Router.post('/google', googleController.login)

module.exports = Router