// Views
const index = require('./index.js');
const itineraries = require('./api/itineraries.js');

module.exports = function (app) {
    app.use('/*', index);
    app.use('/api/itineraries', itineraries);
};