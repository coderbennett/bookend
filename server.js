const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sess = {
  secret: 'A super scandalous secret',
  cookie: {
      maxAge: 900000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
//})