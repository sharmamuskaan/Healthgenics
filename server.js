const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const config = require('config');
const app = express();
const path = require('path');

const login = require('./routes/user/login');
const register = require('./routes/user/register');
const task = require('./routes/tasks/task');
const track = require('./routes/tracks/track');

const db = config.get('mongoURI');

mongoose.connect(db, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected to Database'))
        .catch(err => console.log(err));

if(!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);    
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/user/login', login);
app.use('/api/user/register', register);
app.use('/api/user/tracks', track);
app.use('/api/user/tasks', task);

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
	});
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port = ${port}`));