const offers = require('../data/data').offers;
const candyService = require('./candyService');

const offersService = () => {

    const getAllOffers = () => {
        
        let retOffers = offers;
        retOffers.forEach(element => {
            element.candies.forEach( (x, index) => {
               console.log(index);
                element.candies[index] = candyService.getCandyById(x);
            })
        });
        return retOffers;
    };

    return {
        getAllOffers
    };
}

module.exports = offersService();