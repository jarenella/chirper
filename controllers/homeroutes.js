const router = require('express').Router();
const { Post, User } = require('../models');
const authLogIn = require('../utils/authLogIn');

router.get('/', authLogIn, async (req, res) => {
    //get posts
    const postData = await Post.findAll({include:[{model: User}]});
    //makes array of serialized clean data
    const posts = postData.map(post => post.get({plain: true}))
    
    res.render("homepage", {posts, logged_in:req.session.logged_in}); //always send req.session.logged_in to change renders based on whether user is or isn't logged in
})

router.get('/login', async (req, res) => {
    res.render("login");
})

router.get('/profile', authLogIn, async (req, res) => {
    //getting user data from db
    //the users id is in the request.session
    const userData = await User.findByPk(req.session.user_id, {include: [{model: Post}]})
    const user = userData.get({plain:true})

    //... spreads the user data?
    res.render("profile", {...user, logged_in:req.session.logged_in});
})

router.get('/post/:id', authLogIn, async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {include:[{model: User}]})
    
    if (postData) { //if a post with that id exists, render it into the post page
        const post = postData.get({plain:true});
        res.render("post", {...post, logged_in:req.session.logged_in});
    }
    else { //if a post with that id doesnt exist, render the 404 page
        res.render("404route");
    }
})

router.get('/user/:id', async (req, res) => {
    const userData = await User.findByPk(req.params.id,  {include: [{model: Post}]})
    console.log(userData);
    
    if (userData) { //if a user with that id exists, render it into the post page
        const user = userData.get({plain:true})
        res.render("user", {...user, logged_in:req.session.logged_in});
    }
    else { //if a user with that id doesnt exist, render the 404 page
        res.render("404route", {logged_in:req.session.logged_in});
    }
})

router.get('*', async (req, res) => {
    res.render("404route", {logged_in:req.session.logged_in});
})

module.exports = router;