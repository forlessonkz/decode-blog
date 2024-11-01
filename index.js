const express = require('express');
const ejs = require('ejs');
const path = require('path');


const app = express();
const PORT = 3030;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})