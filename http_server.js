// add http server
// -----------------------
// YOUR CODE
const express = require('express');
const app = express();
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const adapter = new fs('db.json');
const db = low(adapter);
// body parser has been depreciated as of 2020 but can still be useful.
var bodyPasrser = require('body-parser');
app.use(bodyPasrser.urlencoded({ extended: false }));
app.use(bodyPasrser.json());

// configure express to serve static files from public directory
// ------------------------------------------------------------------
// YOUR CODE
app.use(express.static('public'));

// init the data store
db.defaults({ users: [] }).write();

// // list all users
app.get('/data', function (req, res) {
    res.send(db.get('users').value());

});

// post route this uses bodyPasrser which has been depreciated as of 2020
// test using curl -H "Content-Type: application/json" -X POST -d '{"username":"peterparker", "password":"secret"}' http://localhost:3000/test
app.post('/test', function (req, res) {
    console.log(req.body.username, req.body.password);
    res.send(req.body.username + " " + req.body.password);
})

// add user
app.post('/add', function (req, res) {
    var user = {
        'name': req.body.name,
        'dob': req.body.dob,
        'email': req.body.email,
        'username': req.body.username,
        'password': req.body.password,
        'phone': req.body.phone,
        'streetaddress': req.body.streetaddress,
        'citystatezip': req.body.citystatezip,
        'latitude': req.body.latitude,
        'longitude': req.body.longitude,
        'avatar': faker.internet.avatar()
    }
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());
});

// start server
// -----------------------
app.listen(3000, () => {
    console.log(`Running on port 3000!`)
});