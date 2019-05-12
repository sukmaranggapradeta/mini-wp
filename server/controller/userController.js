const User = require('../models/usersModel')
const { verifyPassword } = require('../helpers/pass')
const { createAccessToken } = require('../helpers/token')

class UserController{
    static register(req, res, next){
        let { name, email, password } = req.body
        User.create({
            name, email, password
        })
        .then(newUser=>{
            res.status(201).json(newUser)
        })
        .catch(err=>{
            console.log(err.errors, `ini error dari user controller`)
            next(err)
        })
    }

    static login(req, res, next){
        let { email, password } = req.body
        User.findOne({ 
            email 
        })
        .then(user=>{
            if(user && verifyPassword(password, user.password)) {
                const accessToken = createAccessToken({
                    id: user._id,
                    email: user.email
                })
                res.status(200).json({
                    token: accessToken,
                    currentUser:{
                        userId: user._id,
                        name: user.name,
                        email: user.email
                    }
                })
            }else {
                console.log('masuk login failed')
                next({ name: 'loginFailed'})
            }
        })
        .catch(err=>{
            console.log(err, `ini err dari login`)
            next(err)
        })
    }

    static getAll(req, res, next){
        User.find()
        .then(users=>{
            res.status(200).json(users)
        })
        .catch(err=>{
            console.log(err, `ini error dari get all`)
            next(err)
        })
    }

    static findEmail(req, res, next){
        console.log('ada request masuk')
        console.log(req.params.email)
        User.findOne({email:req.params.email})
        .then(found=>{
            console.log(found)
            res.status(200).json(found)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = UserController