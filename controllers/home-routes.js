// contain all of the user-facing routes, such as the homepage and login page.
const router = require('express').Router();
// const sequelize = require('../config/connection');
router.get('/', (req, res) => {
    res.render('homepage');
  });
  
  module.exports = router;

