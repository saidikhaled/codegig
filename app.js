const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');


//DATABASE
const db = require('./config/database');

//testing connection
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const app = express();

//to use sessions
//app.use(session({ secret: "cats" }));

// passport initialising and session
//app.use(passport.initialize());
//app.use(passport.session());


// Handelbars
app.engine('handlebars', exphbs({defaultLayout: 'main' }))
app.set('view engine','handlebars')

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded ({extended: false }));


// index route
app.get('/', (req, res) => {
    res.render('index', { layout : 'landing'});
})

//Gig routes
app.use('/gigs', require('./routes/gigs'));

//login route
app.use('/login', require('./routes/login'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on ${PORT} `));