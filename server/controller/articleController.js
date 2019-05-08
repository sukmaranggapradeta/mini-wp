const Article = require('../models/articlesModel')

class ArticleController{
    static getAll(req, res, next){
        Article.find()
        .then(articles=>{
            res.status(200).json(articles)
        })
        .catch(err=>{
            next(err)
        })
    }

    static create(req, res, next){
        let { title, content, created_at } = req.body
        Article.create({
            title, content, created_at
        })
        .then(article=>{
            res.status(201).json(article)
        })
        .catch(err=>{
            next(err)
        })
    }

    static getOne(req, res, next){
        Article.findById(req.params.id)
        .then(found=>{
            res.status(200).json(found)
        })
        .catch(err=>{
            next(err)
        })
    }

    static update(req, res, next){
        // console.log(req.body)
        let { title, content, created_at } = req.body
        Article.findByIdAndUpdate(req.params.id,{
            title, content, created_at
        },{ new:true })
        .then(updated=>{
            res.status(200).json(updated)
            // console.log(updated)
        })
        .catch(err=>{
            next(err)
        })
    }

    static delete(req, res, next){
        // console.log(req.params.id)
        Article.findByIdAndDelete(req.params.id)
        .then(deleted=>{
            // console.log('deleted')
            res.status(200).json(deleted)
        })
        .catch(err=>{
            next(err)
        })
    }

}

module.exports = ArticleController