/**
 * HTTPRequestResponsePairDAO.js
 */

var fs = require('fs');
var StringMatcher = require("./../matcher/StringMatcher.js");
var ObjectMatcher = require("./../matcher/ObjectMatcher.js");
var deepEqual = require('deep-equal');
var Configuration = require('./../Configuration.js');
var Logger = require('./../Logger.js');

/**
 * This class represents a HTTPRequestResponsePair DAO implementation.
 * This implementation uses a JSON file for the data.
 */

/**
 * Default Constructor.
 *
 * @constructor
 */
function HTTPRequestResponsePairDAO() {}

/**
 * App configuration
 */
var CONFIGURATION = new Configuration();

/**
 * Logger
 *
 * @type {exports|module.exports}
 */
var LOGGER = new Logger(CONFIGURATION.LOG_LEVEL);

/**
 * HTTP_REQUEST_RESPONSE_PAIRS_JSON
 * @type {string}
 */
var HTTP_REQUEST_RESPONSE_PAIRS_JSON = CONFIGURATION.HTTP_REQUEST_RESPONSE_PAIRS_JSON;

/**
 * String matcher
 *
 * @type {StringMatcher|exports|module.exports}
 */
var stringMatcher = new StringMatcher();

/**
 * Object Matcher
 * @type {ObjectMatcher|exports|module.exports}
 */
var ObjectMatcher = new ObjectMatcher();


/**
 * Returns the in-memory Request Response Pairs. They represents the
 * data used for the request matching and response provisioning.
 *
 * @returns RequestResponsePairs JSON
 */
function getAllHTTPRequestResponsePairs(){

    LOGGER.debug("Reading JSON httpRequestResponsePairs definition from file("+ HTTP_REQUEST_RESPONSE_PAIRS_JSON + ")");

    var httpRequestResponsePairs = JSON.parse(fs.readFileSync(HTTP_REQUEST_RESPONSE_PAIRS_JSON, 'utf8'));

    LOGGER.debug("JSON httpRequestResponsePairs definition found:", httpRequestResponsePairs);

    return httpRequestResponsePairs;
}

/**
 * In-memory httpRequestResponsePairs
 *
 * @type {RequestResponsePairs}
 */
var httpRequestResponsePairs = getAllHTTPRequestResponsePairs();

/**
 * Returns the appropriate response given the response.
 *
 * @param request HTTP Request to be retrieved to the stored data
 * @returns Response
 */
HTTPRequestResponsePairDAO.prototype.getResponse = function(request) {

    var notDefinedResponse = {
        content: "Not Defined in the httpRequestResponsePairs JSON",
        code: 400
    };

    var endpoint = request.route.path;
    LOGGER.debug("HTTP Request('path'):" + endpoint);

    var headers = request.headers;
    LOGGER.debug("HTTP Request('headers'):",headers);

    var parameters = request.query;
    LOGGER.debug("HTTP Request('parameters'):",parameters);

    var uriParameters = request.params;
    LOGGER.debug("HTTP Request('uriParameters'):",uriParameters);

    var method = request.method;
    LOGGER.debug("HTTP Request('method'):" + method);

    var bodyRequest = request.body;
    LOGGER.debug("HTTP Request('body'):" + bodyRequest);

    LOGGER.debug("Start trying to search for the incomin HTTP request in the httpRequestResponsePairs JSON");

    for (var httpRequestResponsePair in httpRequestResponsePairs){

        LOGGER.debug("Trying to match ID:" + httpRequestResponsePair + " request...");

        var tuple = httpRequestResponsePairs[httpRequestResponsePair];

        var endpointMatcherCheck = stringMatcher.match(tuple.request.endpoint, endpoint );

        var bodyMatcherCheck = true;

        if (typeof tuple.request.body !== 'undefined') {
            LOGGER.debug("BodyMatcher executed...");
            bodyMatcherCheck = deepEqual(tuple.request.body, bodyRequest);
            LOGGER.debug("BodyMatcher: " + bodyMatcherCheck);
        }

        var methodMatcherCheck = stringMatcher.match(tuple.request.method, method );

        var headersMatcherCheck = true;
        if (typeof tuple.request.headers !== 'undefined') {
            LOGGER.debug("HeadersMatcher executed...");
            headersMatcherCheck = ObjectMatcher.match(tuple.request.headers, headers );
            //headersMatcherCheck = JSON.stringify(tuple.request.headers) === JSON.stringify(headers);
            LOGGER.debug("HeadersMatcher: " + headersMatcherCheck);
        }

        var parametersMatcherCheck = true;
        if (typeof tuple.request.parameters !== 'undefined') {
            LOGGER.debug("ParametersMatcher executed...");
            parametersMatcherCheck = deepEqual(tuple.request.parameters, parameters );
            LOGGER.debug("ParametersMatcher: " + parametersMatcherCheck);
        }

        var uriParametersMatcherCheck = true;
        if (typeof tuple.request.uriParameters !== 'undefined') {
            LOGGER.debug("UriParametersMatcher executed...");
            uriParametersMatcherCheck = deepEqual(tuple.request.uriParameters, uriParameters );
            LOGGER.debug("ParametersMatcher: " + uriParametersMatcherCheck);
        }

        if (uriParametersMatcherCheck && endpointMatcherCheck && methodMatcherCheck && headersMatcherCheck && parametersMatcherCheck && bodyMatcherCheck  )
            return tuple.response;
    }

    return notDefinedResponse;
};

module.exports = HTTPRequestResponsePairDAO;