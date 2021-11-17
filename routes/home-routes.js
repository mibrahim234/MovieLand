// contain all of the user-facing routes, such as the homepage and login page.
const router = require('express').Router();
const axios = require("axios")
const sequelize = require('../config/connection');

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

  // router.get('/dashboard', (req, res) => {
  //   res.render('dashboard');
  // });

  // router.get("/movie/:id", (req, res) => {
  //   const imdbID = req.params.id

  //   axios.get(`http://www.omdbapi.com?apikey=${process.env.omdb_api}&i=${imdbID}`)
  //   .then(response => {
  //     console.log(response)
  //   })
  // })

  // router.get('/dashboard', (req, res) => {
  //   if (req.session.loggedIn) {
  //     res.redirect('/dashboard');
  //     return;
  //   }

  //   res.render('dashboard');
  // });
  
  module.exports = router;
