const express = require('express');
const router = express.Router();
const Categories = require('../Categories/Categories');
const User = require('../auth/user');
const Post = require('../Posts/Post');

router.get('/', async (req, res) => {
    const allCategories = await Categories.find()
    console.log(await Categories.find())
    const posts = await Post.find().populate('postCategory').populate('author')
    res.render('index', {data: allCategories, user: req.user ? req.user : {}, posts})
})

router.get('/page', (req, res) => {
    res.render('postPage', {user: req.user ? req.user : {}})
})

router.get('/signIn', (req, res) => {
    res.render('signIn', {user: req.user ? req.user : {}})
})

router.get('/signUp', (req, res) => {
    res.render('signUp', {user: req.user ? req.user : {}})
})

router.get('/profile/:id', async (req, res) => {
    const allCategories = await Categories.find()
    const user = await User.findById(req.params.id);
    const post = await Post.find().populate('author').populate('postCategory')
    if(user) {
        res.render('profile', {
            user: user, 
            loginUser: req.user, 
            posts: post})
    } else {
        res.redirect('/not-found')
    }
    
})


router.get('/admin/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    const allCategories = await Categories.find();
    const posts = await Post.find().populate('postCategory').populate('author')
    res.render('adminProfile', {
        data: allCategories, 
        loginUser: req.user ? req.user : {}, 
        user: user, 
        posts
    })
})

router.get('/new', async (req, res) => {
    const allCategories = await Categories.find();
    res.render('newPost', {data: allCategories, user: req.user ? req.user : {}})
})

router.get('/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    const allCategories = await Categories.find();
    res.render('editPost', {
        data: allCategories, 
        user: req.user ? req.user : {},
        post
    })
})

router.get('/not-found', async (req, res) => {
    const allCategories = await Categories.find();
    res.render('notFound', {data: allCategories, user: req.user ? req.user : {}})
})

module.exports = router;