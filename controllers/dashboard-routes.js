const router = require('express').Router();
const { User, Post}  = require('../models');
const userAuth = require('../utils/auth');

router.get ('/', userAuth, (req,res) => {
    console.log(req.session);

    Post.findAll({
        where: {
            creator_id: req.session.user_id
        },
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['review', 'user_id'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true}));
        res.render('dashboard', { posts, loggedIn: true});
    }). catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get ('/edit/id', userAuth, (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'creator_id',
            'review',
            'created_at'
        ]
    }). then(postData => {
        if (postData) {
            const blog = blogData.get({ plain: true});

            res.render('edit-post', {
                post, 
                loggedIn: req.session.loggedIn
            });
        } else {
            res.status (404).end();
        }
    })
    .catch(err => {
        res.status(500).json
    });
});

module.exports = router; 