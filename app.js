const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todoModel');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

const db = mongoose.connect('mongodb://heroku_dl347tzl:3dirrpbvob12eh69fkpi0akqb0@ds147497.mlab.com:47497/heroku_dl347tzl');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const todoRouter = require('./routes/todoRoutes')(Todo);

app.use('/api/todo', todoRouter);

app.get('/', function(req, res) {
    res.send('Hello from node');
})

app.listen(port, function() {
    console.log(`Listening port ${port}`);
})
