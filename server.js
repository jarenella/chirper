const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');

//require handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ });

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'da secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//the static public folder is public :)
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//turn force:false to true to force the database to reset on every server launch
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
