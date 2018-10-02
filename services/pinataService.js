const wholePinatas = require('../data/data').pinatas;

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

    const hitPinata = id => {
        const surprise = wholePinatas.filter(p => p.id == id)[0].surprise;
        const pinata = getPinataById(id);
        if(pinata === -1 ) return -1;
        if(pinata.maximumHits == pinata.currentHits) return 423;
        pinata.currentHits++;
        if(pinata.currentHits == pinata.maximumHits) return surprise;
        return 204;
    }

    return {
        getAllPinatas,
        getPinataById,
        createPinata,
        hitPinata
    };
}

module.exports = pinataService();