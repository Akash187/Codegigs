const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

const app = express();

//Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error' + err));

app.get('/', (req, res) => {
    res.send('INDEX');
});

//Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Serve started on port ${PORT}`));