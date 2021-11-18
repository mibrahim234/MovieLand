const { User, Comment, Post } = require('../../models');
const router = require('express').Router();

// get all posts for dashboard view 
router.get('/', (req, res) => {
    Post.findAll({
      include: [
        {
            model: User,
            as: 'post_author',
            attributes: ['username'],
          },
          {
            model: Comment,
            as: 'post_comments',
            include: {
              model: User,
              as: 'comment_author',
              attributes: ['username'],
            },
          },
        ],
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // create a new post 
  // Corresponds with user_id (will need it in req.body)
  router.post('/', withAuth, (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // Update a post by id
// Corresponds with post_id of the post user is updating
  router.put('/upvote', withAuth, (req, res) => {
    // custom static method created in models/Post.js
    Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.put('/:id', withAuth, (req, res) => {
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
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // Delete a post by id
// Corresponds with post_id of post user is deleting
router.delete('/:id', async (req, res) => {
    try {
      const deletedPost = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(deletedPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  module.exports = router;
  