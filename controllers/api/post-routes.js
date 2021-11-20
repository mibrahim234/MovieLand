const router = require ("express").Router();
const { Post, User } = require("../../models");
const sequelize = require("../../config/connection.js");
const userAuth = require("../../utils/auth.js")

// get all posts 
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'creator_id',
            'review',
            'created_at'
        ],
        include: [ 
            {
              model: User,
              attributes: ['username']
            },
        ],
        oder: [['created_at', 'DESC']]
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log (err);
        res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id 
        },
        attributes: [
            "id",
            "title",
            "review", 
            "creator_id",
            "created_at"
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: [
                    'review', 'user_id', 'reiew_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username'],
                }
            }
        ]
    })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: "We couldnt find that review post!"});
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', userAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        review: req.review.title,
        creator_id: req.session.user_id
    })
    .then(postData => res.json(blogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put("/", async (req, res) => {
    Post.update(
        {
            title: req.body.title,
            review: req.body.review
        },
        {
            where: {
                id: req.params.id 
            }
        }
    )
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: "No post found with this id" });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete("/:id", userAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id 
        }
    })
        .then((dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: "No post found with this id" });
                return;
            }
            res.json(dbPostData);
        }))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;