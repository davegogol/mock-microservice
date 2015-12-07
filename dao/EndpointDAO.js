/**
 * EndpointDAO.js
 */

var fs = require('fs');
var Configuration = require('./../Configuration.js');
var Logger = require('./../Logger.js');

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

/**
 * App configuration
 */
var CONFIGURATION = new Configuration();

/**
 * Endpoint definition file
 *
 * @type {string}
 */
var ENDPOINTS_JSON = CONFIGURATION.ENDPOINTS_JSON;

/**
 * Logger
 *
 * @type {exports|module.exports}
 */
var LOGGER = new Logger(CONFIGURATION.LOG_LEVEL);

/**
 * Returns the in-memory Endpoints.
 *
 * @returns Endpoints JSON
 */
EndpointDAO.prototype.getAllEndpoints = function(){

    LOGGER.debug("Reading JSON endpoints definition from file("+ENDPOINTS_JSON+")...");

    var endpoints = JSON.parse(fs.readFileSync(ENDPOINTS_JSON, 'utf8'));

    LOGGER.debug("JSON endpoints found:",endpoints);

    return endpoints;

}

module.exports = EndpointDAO;