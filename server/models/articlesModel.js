const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'Conten is required']
    },
    created_at: Date,
    author: {
        type: ObjectId,
        ref: 'User',
    },
    featured_image: String,
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article