const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// set up body-parser
app.use(parser.urlencoded({extended: true}));

// connect to mongo
mongoose.connect('mongodb://localhost:27017/test');

// !!! add photo
const personSchema = new mongoose.Schema({
    name: String,
    contact: String,
    sports: {
        sport: String,
        level: String
    }
});
  
const Person = mongoose.model('Person', personSchema);

// mongo crud with mongoose

app.get('/', (req, res) => {
  res.render('index.ejs')
})

// create a user
app.post('/', (req, res) => {
    console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

