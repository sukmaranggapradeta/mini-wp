const Router = require('express').Router()
const userController = require('../controller/userController')

Router.get('/', userController.getAll)
Router.get('/findEmail/:email', userController.findEmail)
Router.post('/register', userController.register)
Router.post('/login', userController.login)

module.exports = Router