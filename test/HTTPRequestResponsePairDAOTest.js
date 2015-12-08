// Chai assertion library functions
var expect = require('chai').expect;
var log4js = require('log4js');
var fs = require('fs');

/**
 * Logger
 */
var LOGGER = log4js.getLogger('test');
LOGGER.setLevel('DEBUG');

/**
 * Object of class should be tested
 * @type {HTTPRequestResponsePairDAO|exports|module.exports}
 */
var RequestResponsePairDAO = require('../dao/HTTPRequestResponsePairDAO');
var underTest = new RequestResponsePairDAO;
var requestMock, responseMock;

var HTTP_REQUESTS_JSON = "resources/httpRequestResponseData.json";


describe('HTTPRequestResponsePairDAO', function () {

    beforeEach(function () {

        LOGGER.debug("Reading test data from file: " + HTTP_REQUESTS_JSON);

        var httpRequestResponsePairs =
            JSON.parse(fs.readFileSync(HTTP_REQUESTS_JSON, 'utf8'));

        for(httpRequestResponsePair in httpRequestResponsePairs){

            LOGGER.debug("Scenario: " + httpRequestResponsePair);

            requestMock = httpRequestResponsePairs[httpRequestResponsePair].request;

            LOGGER.debug("Request mock: " + JSON.stringify(requestMock));

            responseMock = httpRequestResponsePairs[httpRequestResponsePair].response;

            LOGGER.debug("Response mock: " + JSON.stringify(responseMock));
        }

    });

    describe('getResponse()', function () {
        it("should return the appropriate response", function () {
            var response = underTest.getResponse(requestMock);
            expect(responseMock.code).to.equal(response.code);
            expect(responseMock.content).to.equal(response.content);

        });
    });
});