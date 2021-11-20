const router = require ("express").Router();
const { Post, User, Vote, Comment } = require("../../models");
const sequelize = require("../../config/connection.js");
const withAuth = require("../../utils/auth.js")

// get all posts 
router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id",
            "title",
            "review", 
            "created_at",
            // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            // 'vote_count']
        ],
        order: [["created_at", "DESC"]],
        include: [
            // {
            //     model: Comment,
            //     attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            //     include: {
            //         model: User,
            //         attributes: ["username"]
            //     }
            // },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
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
            "created_at",
            // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            // 'vote_count']
        ],
        include: [
            // {
            //     model: Comment,
            //     attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
            //     include: {
            //         model: User,
            //         attributes: ["username"]
            //     }
            // },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(400).json({ message: "No post found with this id" });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.json(500).json(err);
        });
});

router.post("/", (req, res) => {
    Post.create({
        title: req.body.title,
        review: req.body.review,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// // PUT /api/posts/upvote
// router.put("/upvote", withAuth, (req, res) => {

//     // make sure the session exists first
//     if (req.session) {
//         // pass session id along with all destructured properties on req.body
//         Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
//             .then(updatedVoteData => res.json(updatedVoteData))
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json(err);
//             });
//     }
// });

router.put("/:id", (req, res) => {
    Post.update(
        {
            title: req.body.title
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

router.delete("/:id", (req, res) => {
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