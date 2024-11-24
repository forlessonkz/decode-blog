const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoryTitle: String,
    key: Number,
});

module.exports = mongoose.model('category', CategorySchema)