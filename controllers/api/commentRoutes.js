const { Comment } = require('../../models');
const router = require('express').Router();

// Create a new comment
// Corresponds with user_id of user who posted and the post_id that the comment is for
router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create(req.body);
      res.status(200).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Update a comment by id
  // Corresponds with comment_id of the comment user is editing
  router.put('/:id', async (req, res) => {
    try {
      const updatedComment = await Comment.update(
        {
          comment_content: req.body.comment_content,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(updatedComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // Deletes comment by id
  // Corresponds with comment_id of the comment user is deleting
  router.delete('/:id', async (req, res) => {
    try {
      const deletedComment = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(deletedComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
