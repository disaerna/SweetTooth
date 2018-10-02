const express = require('express');
const bodyParser = require('body-parser');
const port = 5500;
const candiesService = require('./services/candiesService');
const offersService = require('./services/offersService');

const app = express();

app.use(bodyParser.json());

// Gets all candies
app.get('/api/candies', (req, res) => {
    return res.json(candiesService.getAllCandies());
});


// Creates a new candy and returns the newly created model 
// with Content Created status code
app.post('/api/candies', (req, res) => {
    const candy = req.body;
    const result = candiesService.createCandy(candy);
    return res.status(201).json(result);
});

// Gets candy by id
app.get('/api/candies/:id', (req, res) => {
    const { id } = req.params;
    const result = candiesService.getCandyById(id);
    if(result === -1 ) {
        return res.status(404).send("Candy not found");
    }

    return res.json(result);
});

// Get all offers with nested candies within
app.get('/api/offers', (req, res) => {
    return res.json(offersService.getAllOffers());
});

// Get all pinatas - should contain all properties exluding surprise
app.get('/api/pinatas', (req, res) => {
    
});

// Get pinata by id
app.get('/api/pinatas/:id', (req, res) => {

});

// Create new pinata and return new model with content created
app.post('/api/pinatas', (req, res) => {

});

/**
 * Hits a certain pinata until its hit limit has been reached. If the hit
was a success it should return a status code of 204 (No Content), unless it was the final
blow than it should return a status code of 200 (OK) along with the surprise property from
the pinata as a string. If the hit limit has been reached the endpoint should return a status
code 423 (Locked).
 */
app.get('/api/pinatas/:id/hit', (req, res) => {

});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});