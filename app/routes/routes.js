// Views
const index = require('./index.js');
const itineraries = require('./api/itineraries.js');

module.exports = function (app) {
    app.use('/api/itineraries', itineraries);
    app.use('/*', index);
};