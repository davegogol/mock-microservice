/**
 * Configuration.js
 */

/**
 * This class represents a configuration class for the application.
 */

function Configuration() {
}

Configuration.prototype.LOG_LEVEL = "INFO";
Configuration.prototype.SERVER_PORT = "8080";
Configuration.prototype.ENDPOINTS_JSON = "resources/endpoints.json";
Configuration.prototype.HTTP_REQUEST_RESPONSE_PAIRS_JSON = "resources/httpRequestResponsePairs.json";

module.exports = Configuration;
