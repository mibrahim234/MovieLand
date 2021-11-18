const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// route to dashboard 
  router.get('/dashboard', async (req, res) => {
    try {
      if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
      } else {
        res.status(200).render('/login')
      }
    } catch (err) {
      res.status(400).json(err);
    }
  });



// Get all posts made by user for dashboard display
// Corresponds to user_id
router.get('/:id', withAuth, async (req, res) => {
    try {
      const userPosts = await User.findByPk(req.params.id, {
        include: { model: Post, as: 'post_author' },
      });
      const usersPosts = userPosts.get({ plain: true });
      console.log(usersPosts);
      res.render('dashboard', {
        usersPosts,
        logged_in: req.session.logged_in, // logged in status from the session object
        userId: req.session.user_id, // user id from the session object
        userName: req.session.username,
      });
    } catch (err) {
      res.status(400).json('Page not found!');
    }
  });

module.exports = router;
