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

router.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('dashboard');
});


// router.get("/search/:searchTerm", (req, res) => {
//   const searchTerm = req.params.searchTerm
//   //query OMDB by the search term with axios
//   // take the response and pass it into a Handlebars template
//   // The template will either need to use a partial for each movie
//   // Or you can use an each loop in the template
//   // const dataObj = {movieList: ARRAY FROM RESPONSE}
//   // res.render("SEARCHTEMPLATE", dataObj)
// })



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
