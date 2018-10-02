const candies = require('../data/data').candies;

const candiesService = () => {

    const getAllCandies = () => {
        return candies;
    };

    const getCandyById = id => {
        const candy = candies.filter(c => c.id == id);
        if(candy.length == 0) return -1;
        return candy[0];
    }

    const createCandy = candy => {
        let highestId = 0;
        candies.forEach(c => { if (c.id > highestId) { highestId = c.id; } });
        candy.id = highestId+1;
        candies.push(candy);
        return candy;
    }

    return {
        getAllCandies,
        getCandyById,
        createCandy
    }
}

module.exports = candiesService();