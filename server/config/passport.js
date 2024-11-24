const passport = require('passport');
const User = require('../auth/user');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, passpord, done) {
        User.findOne({email}).then(user => {
            if(user.password){
                bcrypt.compare(passpord, user.password, function(err, result) {
                    if (err) {return done(err)}
                    if (result) {return done(null, user)}
                });
            } else {
                return done('User not found!')
            }
        }).catch (e => {
            return done(e)
        })
    }
))

passport.serializeUser(function(user, done){
    console.log(user)
    done(null, user._id)
})

passport.deserializeUser(function(id, done) {
    console.log(id)
    User.findById(id).then((user, err) => {
        done(err, user)
    })
})