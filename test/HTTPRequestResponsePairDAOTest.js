// Chai assertion library functions
var assert = require('chai').assert;
var expect = require('chai').expect;

// Object of class should be tested
var RequestResponsePairDAO = require('../dao/HTTPRequestResponsePairDAO');
var underTest = new RequestResponsePairDAO;
var requestMock, responseMock;

describe('HTTPRequestResponsePairDAO', function () {

    // TODO: Should be read from resources/httpRequestResponsePairs.json file
    beforeEach(function () {
        requestMock = {
            "route": {
                "path": "/subject"
            },
            "endpoint": "/subject",
            "method": "GET",
            "query": {
                "id": "15",
                "category": "cars"
            },
            "headers": {
                "predix-zone-id": "456-789-890",
                "authentication": "Bearer fejg4g4"
            },
            "parameters": {
                "id": "15",
                "category": "cars"
            }
        };

        responseMock = {
            "content_type": "application/json",
                "content": { "subjectId" : "1", "subjectName" : "Davide" },
            "code": "200"
        };
    });

    describe('getResponse()', function () {
        it("should return the appropriate response", function () {
            var response = underTest.getResponse(requestMock);
            expect(response.content_type).to.equal('application/json');
            expect(response.content.subjectId).to.equal('1');
            expect(response.content.subjectName).to.equal('Davide');
            expect(responseMock.code).to.equal(response.code);
        });
    });
});