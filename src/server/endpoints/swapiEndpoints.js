
const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        const id = req.params.id;
        let people;
        if (_isWookieeFormat) {
             people = await app.peopleFactory(id, 'wookiee')            
        } else {
             people = await app.peopleFactory(id)            
        }
        if (!people) {
            throw new Error('the SWAPI (https://swapi.dev/) must be consulted for the appropriate endpoint')
        } else {
            res.send(people);      
        }
      
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        const id = req.params.id;
        const planet = await app.planetFactory(id)
        if (!planet) {
            throw new Error('the SWAPI (https://swapi.dev/) must be consulted for the appropriate endpoint')
        } else {
            res.send({
                name: planet.name,
                gravity: planet.gravity
            });      
        }
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        const mass = await app.db.randomeMass();
        const gravity = await app.db.randomeGravity();
        if (!gravity || !mass) {
            throw new Error('the SWAPI (https://swapi.dev/) must be consulted for the appropriate endpoint')
        } else {
            const weightOnPlanetRandom = await app.swapiFunctions.getWeightOnPlanet(mass, gravity);
             res.send({
                 weightOnPlanetRandom: weightOnPlanetRandom
             });      
        }
      
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll({
            row: true
        });
        data.forEach(e => {
            delete e.dataValues.createdAt
            delete e.dataValues.updatedAt
        });
        res.send(data)
    });

}

module.exports = applySwapiEndpoints;