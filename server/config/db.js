const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/decodeblog').then(() => {
    console.log('Connected to mongoDB');
}).catch((e) => {
    console.log('Filed to connect to mongoDB');
});