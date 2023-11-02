const db = require('../db/index')
class Planet {
    constructor(id){
        this.id = id
    }

    async init(){
        const planet = await db.findPlantById(this.id);
        this.name = planet[0].dataValues.name;
        this.gravity = planet[0].dataValues.gravity;
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }
}

module.exports = Planet