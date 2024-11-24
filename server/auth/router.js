const express = require('express');
const router = express.Router();
const {signUp, signIn, singOut} = require('./controller');
const passport = require('passport');
const createAdmin = require('../Admin/seed')

router.post('/api/signup', signUp);
router.post('/api/signin', passport.authenticate('local', {failureRedirect : '/signIn?error=1'}), signIn);
router.get('/api/signout', singOut)

createAdmin()

module.exports = router;