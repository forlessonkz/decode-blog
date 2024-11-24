const Post = require('./Post');
const path = require('path');
const fs = require('fs');

 
const createPost = async (req, res) => {
    if(req.file && 
        req.body.postTitle.length > 2 && 
        req.body.postDescription.length > 2 && 
        req.body.postCategory.length > 0) {
            await new Post({
                postTitle: req.body.postTitle,
                postCategory: req.body.postCategory,
                image: `/image/posts/${req.file.filename}`,
                postDescription: req.body.postDescription,
                author: req.user._id,
            }).save()
            res.redirect(`/profile/${req.user._id}`)
    } else {
        res.redirect('/new?error=1')
    }
}

const editPost = async (req, res) => {
    if(
        req.file &&
        req.body.postTitle.length > 0 && 
        req.body.postDescription.length > 0 && 
        req.body.postCategory.length > 0
    ){
        const posts = await Post.findById(req.body.id)
        fs.unlinkSync(path.join(__dirname + '../../../public' + posts.image))
        // posts.postTitle = req.body.postTitle
        // posts.postDescription = req.body.postDescription
        // posts.postCategory = req.body.postCategory
        // posts.image = `/images/posts/${req.file.filename}`
        // posts.author = req.body._id
        // posts.save()
        await Post.findByIdAndUpdate(req.body.id, {
            postTitle: req.body.postTitle,
            postCategory: req.body.postCategory,
            postDescription: req.body.postDescription,
            image: `/image/posts/${req.file.filename}`,
            author: req.body._id
        })
        res.redirect('/admin/' + req.user._id)
    }else{
        res.redirect(`/edit/${req.body.id}?error=1`)

    }
}

const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id)
    if(post) {
        fs.unlinkSync(path.join(__dirname + '../../../public' + post.image));
        await Post.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    } else {
        res.status(404).send('Not Found.')
    }
}

module.exports = {
    createPost,
    editPost,
    deletePost
};