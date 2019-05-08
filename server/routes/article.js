const Router = require('express').Router()
const articleController = require('../controller/articleController')

Router.get('/', articleController.getAll)
Router.post('/', articleController.create)
Router.get('/:id', articleController.getOne)
Router.delete('/:id', articleController.delete)
Router.put('/:id', articleController.update)


module.exports = Router