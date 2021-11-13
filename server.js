const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3001;

// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// what is this for
const sess = {
 secret: process.env.pluginsessionsecret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
};

app.use(session(sess));
//pushing up

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(require('./controllers/'));
app.get('/', (req, res) => {
 res.render('home')
});

app.get('/login', (req, res) => {
  res.render('login_page')
});

// turn on connection to db and server
// method to establish the connection to the database. 
//The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables. 
// If it doesn't find a table, it'll create it for you!
// sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
// });




