const EventEmitter = require('events');
class HitEmitter extends EventEmitter {
    checkHit(pinata){
        console.log(pinata);
        if(pinata === -1 ) {
            this.emit("Not found");
        }
        else if(pinata.maximumHits == pinata.currentHits){
            this.emit("Locked");
        }
        else if(++pinata.currentHits == pinata.maximumHits){
            this.emit("Surprise");
        }
        else {
            this.emit("No content");
        }
    }
};

module.exports = HitEmitter;