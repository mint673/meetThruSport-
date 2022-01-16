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
    info: String,
    sports: [{
        name: String,
        level: String
    }]
});
  
const Person = mongoose.model('Person', personSchema);
let listOfPerson = [];

// home page
app.get('/', (req, res) => {
    Person.find({}, function(err, people){
        listOfPerson = people;
        res.render('index.ejs', {persons: listOfPerson});
    })
})

// create a user
app.post('/', (req, res) => {
    // console.log(req.body);
    let sportsEntered = req.body.sport;
    let levelsEntered = req.body.level;
    let sportsList = [];
    if (Array.isArray(sportsEntered)) {
        for (i=0; i<sportsEntered.length; i++) {
            sportsList.push({name: sportsEntered[i], level: levelsEntered[i]});
        }
    } else {
        sportsList.push({name: sportsEntered, level: levelsEntered});
    }
    const person = new Person({ 
        name: req.body.name,
        contact: req.body.contact,
        info: req.body.info,
        sports: sportsList
    });
    // console.log(person);
    Person.insertMany([person]);
    res.redirect('/');
})

app.post('/search', (req, res) => {
    let results = [];
    Person.find({}, function(err, people){
        listOfPerson = people;
    });
    let sport = req.body.searchInput;
    if (sport == "") {
        res.redirect('/');
    } else {
        for (let person of listOfPerson) {
            if (plays(person, sport)) {
                results.push(person);
            }
        }
        res.render('index.ejs', {persons: results});
    }
    /*try {
        let sport = req.body.searchInput;
        console.log(listOfPerson);
        for (let person of listOfPerson) {
            console.log("person: " + person.sports);
            if (plays(person, sport)) {
                results.push(person);
            }
        }
        console.log("results: " + results);
        res.render('index.ejs', {persons: results});
    } catch (err) {
        res.render('index.ejs', {persons: results});
    }*/
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

//------------------HELPERS-------------------
function plays(person, sport) {
    if (contains(person.sports, sport)) {
        return true;
    } else {
        return false;
    }
}

function contains(sports, sport) {
    for (let sportObj of sports) {
        if (sportObj.name == sport) {
            return true;
        }
    }

    return false;
}
