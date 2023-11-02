const db = require('../db/index')
class AbstractPeople {

    constructor(id) {
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async init(){
      const people = await db.findPeopleById(this.id);
       this.id = people[0].dataValues.id;
       this.name = people[0].dataValues.name;
       this.mass = people[0].dataValues.mass;
       this.height = people[0].dataValues.height;
       this.homeworldName = people[0].dataValues.homeworld_name;
       this.homeworlId = people[0].dataValues.homeworld_id;
    }

    getId() {
       return this.id;
    }

    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldName() {
        return this.homeworldName;
    }

    getHomeworlId() {
        return this.homeworlId;
    }

    getWeightOnPlanet(planetId){
        throw new Error('To be implemented');
    }
}
module.exports = AbstractPeople