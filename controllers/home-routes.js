// contain all of the user-facing routes, such as the homepage and login page.
const router = require('express').Router();
// const sequelize = require('../config/connection');
router.get('/', (req, res) => {
    res.render('homepage');
  });
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    
    res.render('login');
  });

  router.get('/dashboard', (req, res) => {
    res.render('dashboard');
  });

  // router.get('/dashboard', (req, res) => {
  //   if (req.session.loggedIn) {
  //     res.redirect('/dashboard');
  //     return;
  //   }

  //   res.render('dashboard');
  // });
  
  module.exports = router;
