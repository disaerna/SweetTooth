const offers = require('../data/data').offers;
const candiesService = require('./candiesService');

const offersService = () => {

    const getAllOffers = () => {
        
        let retOffers = offers;
        retOffers.forEach(element => {
            element.candies.forEach( (x, index) => {
               console.log(index);
                element.candies[index] = candiesService.getCandyById(x);
            })
        });
        return retOffers;
    };

    return {
        getAllOffers
    };
}

module.exports = offersService();