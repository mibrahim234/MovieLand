// contain all of the user-facing routes, such as the homepage and login page.
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const axios = require("axios")
// const sequelize = require('../config/connection');
router.get('/', (req, res) => {
  res.render('homepage')
});
  
  // come back to it ***
router.get('/login', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    } else {
      res.status(200).render('login')
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
    
// come back to it ***
router.get('/logout', async (req, res) => {
  try {
    res.status(200).json('Logged out!');
  } catch (err) {
    res.status(500).json(err);
  }
});
   

  router.get("/movie/:id", (req, res) => {
    const imdbID = req.params.id

    axios.get(`http://www.omdbapi.com?apikey=${process.env.omdb_api}&i=${imdbID}`)
    .then(response => {
      console.log(response)
    })
  })

  
  
  module.exports = router;
