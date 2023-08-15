// add http server
// -----------------------
// YOUR CODE
const express = require('express');
const app = express();
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const adapter = new fs('db.json');
const db = low(adapter);

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


// start server
// -----------------------
app.listen(3000, () => {
    console.log(`Running on port 3000!`)
});