const Article = require('../models/articlesModel');

module.exports = function(req, res, next) {
    try {
        console.log(req.params.id, 'ini req.params.id')
        // console.log(req.decoded.payload, 'ini req.decoded')
        Article.findById(req.params.id)
        .then((article)=>{
            // console.log(req.decoded.id ,"=================", article.author)
            if (req.decoded.id == article.author){
                console.log('cocok =======================')
                next()
            }else{
                console.log(' ga cocok')
                throw new Error('You dont have access')     
            }
        })
        .catch(err=>{
            res.status(404).json({ msg: err.message })
        })
    } catch (error) {
        throw 'You dont have access'
    }
} 