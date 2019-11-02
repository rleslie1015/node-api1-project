// implement your API here

// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const db = require('./data/db.js');

// creates an express application using the express module
//this is how you create a server
const server = express();

//middleware
server.use(express.json())
// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World');
});

//GET 
server.get('/api/users', (req, res) => {
    db.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.json({error: "Failed to get users from database."})
    })
  });
  

//POST creates a user
server.post("/api/users", (req, res) => {
    //make the object for new user ?
    const newUser = req.body;
    db.insert(newUser)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to add user to database."})
    })
})

//deletes a user 
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(() => {
        res.status(200).json({ message: 'User with ID of ${id} deleted successfully'});
    })
    .catch(err => {
        res.status(500).json({error: "Failed to delete user from database."})
    })
})

//find user by id
server.get('api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(() => {
        res.status(200).json({ message: 'User with ID of ${id} found', id})
    })
    .catch(err => {
        res.status(500).json({error: "Failed to find user."})
    })
})
// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));