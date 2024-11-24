const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new mongoose.Schema({
    postTitle: String,
    postCategory: {type: mongoose.Schema.Types.ObjectId , ref: 'category'},
    image: String,
    postDescription: String,
    author: {type: mongoose.Schema.Types.ObjectId , ref: 'user'}
})

module.exports = mongoose.model('Post', PostSchema)