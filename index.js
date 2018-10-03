const express = require('express');
const bodyParser = require('body-parser');
const port = 5500;
const candyService = require('./services/candyService');
const offerService = require('./services/offerService');
const pinataService = require('./services/pinataService');
const HitEmmiter = require('./HitEmitter');

const app = express();

app.use(bodyParser.json());

app.get('/api/candies', (req, res) => {
    return res.json(candyService.getAllCandies());
});

app.post('/api/candies', (req, res) => {
    const { body:candy } = req;
    const result = candyService.createCandy(candy);
    return res.status(201).json(result);
});

app.get('/api/candies/:id', (req, res) => {
    const { id } = req.params;
    const result = candyService.getCandyById(id);
    if(result === -1 ) {
        return res.status(404).send("Candy not found");
    }

    return res.json(result);
});

app.get('/api/offers', (req, res) => {
    return res.json(offerService.getAllOffers());
});

app.get('/api/pinatas', (req, res) => {
    return res.json(pinataService.getAllPinatas());
});

app.get('/api/pinatas/:id', (req, res) => {
    const { id } = req.params;
    const result = pinataService.getPinataById(id);
    if(result === -1) {
        return res.status(404).send("Pinata not found");
    }
    return res.json(result);

});

app.post('/api/pinatas', (req, res) => {
    const { body:pinata } = req;
    const result = pinataService.createPinata(pinata);
    return res.status(201).json(result);
});

app.get('/api/pinatas/:id/hit', (req, res) => {
    const { id } = req.params;
    const emitter = new HitEmmiter();
    emitter.on('Not found', () => {
        return res.status(404).send("Not found");
    });
    emitter.on('Locked', () => {
        return res.status(423).send("Locked");
    });
    emitter.on('Surprise', () => {
        const surprise = pinataService.getSurpriseForPinataById(id);
        return res.json(surprise);
    });
    emitter.on('No content', () => {
        return res.status(204).send();
    })

    emitter.checkHit(pinataService.getPinataById(id));
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});