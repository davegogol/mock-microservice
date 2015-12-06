/**
 * EndpointDAO.js
 */

var fs = require('fs');

/**
 * This class represents a Endpoint DAO implementation.
 * This implementation uses a JSON file for the data.
 */

/**
 * Default Constructor.
 *
 * @constructor
 */
function EndpointDAO() {}

var ENDPOINTS_JSON = "resources/endpoints.json";

/**
 * Returns the in-memory Endpoints.
 *
 * @returns Endpoints JSON
 */
EndpointDAO.prototype.getAllEndpoints = function(){

    console.log("DEBUG - Reading from file(%s) JSON endpoints:",ENDPOINTS_JSON);

    var endpoints = JSON.parse(fs.readFileSync(ENDPOINTS_JSON, 'utf8'));

    console.log("DEBUG - log JSON endpoints:");

    console.log(endpoints);

    return endpoints;

}

module.exports = EndpointDAO;