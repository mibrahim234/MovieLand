const express = require('express');
const path = require('path');
const session = require('express-session');
// need for db connection
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
require('dotenv').config()
const axios = require("axios")

//Sets up the express app
const app = express();
const PORT = process.env.PORT || 3001;

// Create a new sequelize store using the express-session package
const sess = {
 secret: process.env.pluginsessionsecret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
 store: new SequelizeStore({
    db: sequelize
   }) 
};

app.use(session(sess));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// ^replace that with this 
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//NEED FOR DATABASE CONNECTION
app.use(require('./controllers/'));

//NEED FOR DATABASE CONNECTION
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

app.get('/', (req, res) => {
 res.render('homepage')
})

app.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('login');
});

app.get("/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm
  //query OMDB by the search term with axios
  // take the response and pass it into a Handlebars template
  // The template will either need to use a partial for each movie
  // Or you can use an each loop in the template
  // const dataObj = {movieList: ARRAY FROM RESPONSE}
  // res.render("SEARCHTEMPLATE", dataObj)
})

app.get("/movie/:id", (req, res) => {
  const imdbID = req.params.id

  axios.get(`http://www.omdbapi.com?apikey=${process.env.omdb_api}&i=${imdbID}`)
  .then(response => {
    console.log(response)
    const data = response.data
    const dataObj = {
      title: data.Title,
      year: data.Year
    }
    res.render("MOVIETEMPLATE", dataObj)
  })
  res.status(200).json({})
})

app.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('dashboard');
});

// turn on connection to db and server
// method to establish the connection to the database. 
//The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables. 
// If it doesn't find a table, it'll create it for you!






