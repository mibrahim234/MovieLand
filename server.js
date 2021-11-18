const express = require('express');
const routes = require('./controllers');

const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
require('dotenv').config()
const axios = require("axios")

const app = express();
const PORT = process.env.PORT || 3001;

// NEED FOR DATABASE CONNECTION
const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// what is this for
const sess = {
 secret: process.env.pluginsessionsecret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  //NEED FOR DATABASE CONNECTION
/*   store: new SequelizeStore({
    db: sequelize
   }) */
};

app.use(session(sess));
//pushing up

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//NEED FOR DATABASE CONNECTION
//app.use(require('./controllers/'));
app.use(routes);


// turn on connection to db and server
// method to establish the connection to the database. 
//The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables. 
// If it doesn't find a table, it'll create it for you!

// NEED FOR DATABASE CONNECTION
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});




