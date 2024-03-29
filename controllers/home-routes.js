// contain all of the user-facing routes, such as the homepage and login page.
const router = require('express').Router();
const axios = require("axios")
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

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
  // if (req.session.loggedIn) {
  //   res.redirect('/dashboard');
  //   return;
  // }

  Post.findAll({
    attributes: [
      'id',
      'title',
      'review',
      'created_at',
      // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      // {
      //   model: Comment,
      //   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      //   include: {
      //     model: User,
      //     attributes: ['username']
      //   }
      // },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // pass a single post object into the homepage template
      // console.log(dbPostData[0]);
      const posts = dbPostData.map(post => post.get({ plain: true }))
      res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get("/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm

  var omdbApiUrl = "http://www.omdbapi.com/?s=" + searchTerm + "&apikey=83d6dc1f"

  //query OMDB by the search term with axios
  axios.get(omdbApiUrl)
  .then(data => {

  })
  // take the response and pass it into a Handlebars template
  // The template will either need to use a partial for each movie
  // Or you can use an each loop in the template
  // const dataObj = {movieList: ARRAY FROM RESPONSE}
  // res.render("SEARCHTEMPLATE", dataObj)
})



  router.get("/movie/:id", (req, res) => {
    const imdbID = req.params.id

    axios.get(`http://www.omdbapi.com?apikey=${process.env.omdb_api}&i=${imdbID}`)
    .then(response => {
  //  get data from omdb and store it
  //  pull out needed content ex(director, descriptions, etc)
  //  render the page
      console.log(response);
      let movie = response.data

      res.render("individualmovie", movie);
    })
  })

  
  module.exports = router;
