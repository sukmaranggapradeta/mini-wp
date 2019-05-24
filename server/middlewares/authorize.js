const Article = require('../models/articlesModel');
const User = require('../models/usersModel')
const { verifyAccessToken } = require('../helpers/token')

module.exports = function(req, res, next) {
    try {
        let decoded = verifyAccessToken(req.headers.token);
        User.findOne({ 
            email : decoded.email 
        })
        .then(user=>{
            return Article.findById(req.params.id)
            .then((article)=>{
                if (user.id == article.author){
                    next()
                }else{
                    throw new Error('You dont have access')     
                }
            })
    
        })
        .catch(err=>{
            res.status(404).json({ msg: err.message })
        })
    } catch (error) {
        throw 'You dont have access'
    }
} 