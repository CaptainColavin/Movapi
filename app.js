const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser');
const cors = require('cors');
const passport = require ('passport');
const mongoose = require('mongoose');
const config =  require('./config/database');
const app = express();

//connect to database
mongoose.connect(config.database);

// check if DB is conected
mongoose.connection.on('connected', () => {
    console.log('db connected ! : ' + config.database);
});

mongoose.connection.on('error', () => {
    console.log('db error ! : ' + error);
});


const users = require('./routes/users');

const port = 3000;

app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.json());

//console.log(passport);

// passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/api', require('./routes/routes'));

// Index route
app.get('/', (req, resp) => {
    resp.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});
