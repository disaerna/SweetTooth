const wholePinatas = require('../data/data').pinatas;
const HitEmmiter = require('../HitEmitter');
const pinataService = () => {

    let pinatas = JSON.parse(JSON.stringify(wholePinatas))
    pinatas.forEach( x => {
        delete x.surprise;
        x.currentHits = 0;
    });

    const getAllPinatas = () => {
        return pinatas;
    }

    const getPinataById = id => {
        const pinata = pinatas.filter(p => p.id == id);
        if(pinata.length == 0) return -1;
        return pinata[0];
    }

    const createPinata = (pinata) => {
        let highestId = 0;
        pinatas.forEach( p => { if(p.id > highestId) { highestId = p.id; } });
        pinata.id = highestId+1;
        pinatas.push(pinata);
        return pinata;
    }

    const getSurpriseForPinataById = id => {
        return wholePinatas.filter(p => p.id == id)[0].surprise;
    }

    return {
        getAllPinatas,
        getPinataById,
        createPinata,
        getSurpriseForPinataById
    };
}

module.exports = pinataService();