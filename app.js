//imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');

const users = require('./routes/users');
const config = require('./config/database');

//connect to the database
mongoose.connect(config.database);

//check connection
mongoose.connection.on('connected' , () => {
    console.log(`Connected to database ${config.database}`);
});
mongoose.connection.on('error' , (error) => {
    console.log(`Connection Error: ${error}`);
});

//declarations
const app = express();
const port = process.env.port || 8080;

//using middlewares
app.use(cors());
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname , 'public')));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//setup users routes
app.use('/users' , users);

//routes
app.get('/' , (req , res) => {
    res.sendFile(__dirname + path.resolve('./public/index.html'));    
});

//listen for requests
app.listen(port , () => {
    console.log(`Server started on port ${port}`);
});