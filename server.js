const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));

// set up body-parser
app.use(parser.urlencoded({extended: true}));

// connect to mongo
mongoose.connect('mongodb://127.0.0.1/db', {useNewUrlParser: true});

// set up person model
// !!! add photo
const personSchema = new mongoose.Schema({
    name: String,
    contact: String,
    sports: String
});
  
const Person = mongoose.model('Person', personSchema);
let listOfPerson;

// home page
app.get('/', (req, res) => {
    Person.find({}, function(err, people){
        listOfPerson = people;
        res.render('index.ejs', {persons: listOfPerson});
        console.log(listOfPerson);
    })
})

// create a user
app.post('/', (req, res) => {
    console.log(req.body);
    const person = new Person({ 
        name: req.body.name,
        contact: req.body.contact,
        sports: req.body.sports
    });
    Person.insertMany([person]);
    res.redirect('/');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

