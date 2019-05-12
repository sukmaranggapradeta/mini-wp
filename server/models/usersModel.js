const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/pass')

const userSchema = new Schema({
    name: {
        type:String,
        required: [true, 'Name is required'],
        validate:{
            validator:(name)=> {
                if (name.length < 3) throw new Error(`Name must have at least 3 character!`)
            }
        }
    },    
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate:{
            validator:(email)=>{
                return /.+@.+\..+/ig.test(email);
            },
            message: 'Invalid format email'
        }
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    }
})

userSchema.path('email').validate(function (email) {
    return User.findOne({ email })
      .then((emailFound) => {
        if (emailFound){
          return false;
        } else {
          return true;
        }
      });
  }, 'Email is already in use') ;

userSchema.pre('save', function(next){
    this.password = hashPassword(this.password)
    next()
})

let User = mongoose.model('User', userSchema)

module.exports = User