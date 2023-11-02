const db = require('./db');
const swapiFunctions = require('./swapiFunctions');
const peopleFactory = require('./People/index');
const planetFactory = require('./Planet/index');

module.exports = {
    db,
    swapiFunctions,
    peopleFactory,
    planetFactory
}