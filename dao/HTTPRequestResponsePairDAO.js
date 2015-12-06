/**
 * HTTPRequestResponsePairDAO.js
 */

var fs = require('fs');
var StringMatcher = require("./../matcher/StringMatcher.js");
var ObjectMatcher = require("./../matcher/ObjectMatcher.js");


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

var HTTP_REQUEST_RESPONSE_PAIRS_JSON = "resources/httpRequestResponsePairs.json";

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

    console.log("DEBUG - Reading from file(%s) JSON httpRequestResponsePairs:",HTTP_REQUEST_RESPONSE_PAIRS_JSON);

    var httpRequestResponsePairs = JSON.parse(fs.readFileSync(HTTP_REQUEST_RESPONSE_PAIRS_JSON, 'utf8'));

    console.log("DEBUG - log JSON httpRequestResponsePairs:");
    console.log(httpRequestResponsePairs);

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
        content: "Not Defined in the httpRequestResponsePairs",
        code: 400
    };

    var endpoint = request.route.path;
    console.log("DEBUG - Request('path'):" + endpoint);

    var headers = request.headers;
    console.log("DEBUG - Request('headers'):");
    console.log(headers);

    var parameters = request.query;
    console.log("DEBUG - Request('parameters'):");
    console.log(parameters);

    var method = request.method;
    console.log("DEBUG - Request('method'):" + method);

    var bodyRequest = request.body;
    console.log("DEBUG - Request('body'):");
    console.log(bodyRequest);

    console.log("start matching...");

    for (var httpRequestResponsePair in httpRequestResponsePairs){

        console.log("Trying to match ID:%s request...",httpRequestResponsePair);

        var tuple = httpRequestResponsePairs[httpRequestResponsePair];

        var endpointMatcherCheck = stringMatcher.match(tuple.request.endpoint, endpoint );

        var bodyMatcherCheck = true;

        if (typeof tuple.request.body !== 'undefined') {
            console.log("DEBUG - BodyMatcher start...");
            //bodyMatcher = ObjectMatcher.match(tuple.request.body, bodyRequest );
            bodyMatcherCheck = JSON.stringify(tuple.request.body) === JSON.stringify(bodyRequest);
            console.log("DEBUG - BodyMatcher: %s", bodyMatcherCheck);

        }

        var methodMatcherCheck = stringMatcher.match(tuple.request.method, method );

        var headersMatcherCheck = true;
        if (typeof tuple.request.headers !== 'undefined') {
            console.log("DEBUG - HeadersMatcher start...");
            headersMatcherCheck = ObjectMatcher.match(tuple.request.headers, headers );
            //headersMatcherCheck = JSON.stringify(tuple.request.headers) === JSON.stringify(headers);
            console.log("DEBUG - BodyMatcher: %s",headersMatcherCheck);
        }

        var parametersMatcherCheck = true;
        if (typeof tuple.request.parameters !== 'undefined') {
            console.log("DEBUG - Parameters start...");
            parametersMatcherCheck = ObjectMatcher.match(tuple.request.parameters, parameters );
            //parametersMatcherCheck = JSON.stringify(tuple.request.parameters) === JSON.stringify(parameters);
            console.log("DEBUG - BodyMatcher: %s",parametersMatcherCheck);
        }

        if (endpointMatcherCheck && methodMatcherCheck && headersMatcherCheck && parametersMatcherCheck && bodyMatcherCheck  )
            return tuple.response;
        else
            notDefinedResponse
    }

    return notDefinedResponse;
};

module.exports = HTTPRequestResponsePairDAO;