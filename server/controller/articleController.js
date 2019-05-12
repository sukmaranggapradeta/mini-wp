const Article = require('../models/articlesModel')
const Storage = require('@google-cloud/storage')
// const mime = require('mime-types')


class ArticleController{

    static image(req, res, next){
            const type = mime.lookup(req.file.originalname);
            console.log('masuk mime' ,type)
            const storage = new Storage({
                projectId: config.google.projectId,
                keyFilename: './google.json',
            });

            const bucket = storage.bucket(config.google.bucket);
            const blob = bucket.file(`${uuid()}.${mime.extensions[type][0]}`);

            const stream = blob.createWriteStream({
                resumable: true,
                contentType: type,
                predefinedAcl: 'publicRead',
            });

            stream.on('error', err => {
                next(err);
            });

            stream.on('finish', () => {
                res.status(200).json({
                    data: {
                        url: `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
                    },
                });
            });

            stream.end(req.file.buffer);

    }

    static getAll(req, res, next){
        Article.find()
        .populate('author')
        .then(articles=>{
            // console.log(articles)
            res.status(200).json(articles)
        })
        .catch(err=>{
            next(err)
        })
    }

    static create(req, res, next){
        let { title, content, created_at, featured_image, author } = req.body
        Article.create({
            title, content, created_at, author, featured_image
        })
        .then(newArticle=>{
            Article.findById(newArticle._id)
            .populate('author')
            .then(article=>{
                res.status(201).json(article)
            })
            .catch(err=>{
                next(err)
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static getOne(req, res, next){
        Article.findById(req.params.id)
        .populate('author')
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
        // console.log(req.headers)
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