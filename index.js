const express = require('express');
const ejs = require('ejs');
const path = require('path');
require('./server/config/db');
const mongooseStore = require('connect-mongo');
const passport = require('passport');
const bodyParser = require('body-parser');




const app = express();
const PORT = 9980;
const session = require('express-session');
require('./server/config/passport')


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());

app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    name: 'decode.session',
    secret: 'keyboard cat',
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,
    store: mongooseStore.create({
        mongoUrl: 'mongodb://localhost:27017'
    })
}))

app.use(passport.session())
app.use(passport.initialize());

app.use(require('./server/pages/router'));
app.use(require('./server/Categories/router'));
app.use(require('./server/auth/router'));
app.use(require('./server/Posts/router'))


app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})