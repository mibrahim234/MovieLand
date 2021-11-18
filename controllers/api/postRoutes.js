const { User, Comment, Post } = require('../../models');
const router = require('express').Router();
const withAuth = require('../../utils/auth');


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
  
  // not sure about this 
  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
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
    Post.create({
        user_id: req.body.user_id,
        post_title: req.body.post_title,
        movie_content: req.body.movie_content,
      })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // Update a post by id
// Corresponds with post_id of the post user is updating
  router.put('/:id', withAuth, (req, res) => {
    Post.update(
      {
        post_title: req.body.post_title,
        movie_content: req.body.movie_content,     
     },
      {
        where: {
          id: req.params.id
        },
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
// can you do withAuth with async and await?
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
  