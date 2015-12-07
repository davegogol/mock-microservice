/**
 * Server.js
 */
var express = require('express');
var bodyParser = require('body-parser');
var xmlparser = require('express-xml-bodyparser');

var RequestResponsePairDAO = require('./dao/HTTPRequestResponsePairDAO.js')
var EndpointDAO = require('./dao/EndpointDAO.js')

/**
 * This class represents the server configuration.
 * It handles the endpoints definition.
 */

/**
 * Default Constructor.
 *
 * @constructor
 */
function Server() {}

/**
 * It handles the interaction with the HTTPRequestResponsePair data.
 *
 * @type {HTTPRequestResponsePairDAO|exports|module.exports}
 */
var requestResponsePairDAO = new RequestResponsePairDAO;

/**
 * It handles the interaction with the EndpointDAO data.
 *
 * @type {EndpointDAO|exports|module.exports}
 */
var endpointDAO = new EndpointDAO();

/**
 * Server listening port
 *
 * @type {number}
 */
var SERVER_PORT = 8081;

/**
 * Application server.
 */
var app = express()

/**
 * Starts the server with its configuration.
 */
Server.prototype.start = function() {

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(xmlparser()); // for parsing application/xml

    var endpoints = endpointDAO.getAllEndpoints();

    for (var i in endpoints) {

        endpoint = endpoints[i];

        !function outer(endpoint) {

            console.log("DEBUG - endpoint defined (%s,%s)",endpoint.method, endpoint.path );

            if (endpoint.method == "GET") {

                app.get(endpoint.path, function (req, res) {

                    console.log("DEBUG - log request:");
                    console.log(req);
                    
                    var response = requestResponsePairDAO.getResponse(req);

                    console.log("DEBUG - log response:");
                    console.log(response);

                    res.status(response.code).send(response.content);
                });
            }

            if (endpoint.method == "POST") {
                app.post(endpoint.path, function (req, res) {

                    console.log("DEBUG - log request:");
                    console.log(req);

                    var response = requestResponsePairDAO.getResponse(req);

                    console.log("DEBUG - log response:");
                    console.log(response);

                    res.status(response.code).send(response.content);
                });
            }

            if (endpoint.method == "PUT") {
                app.put(endpoint.path, function (req, res) {

                    console.log("DEBUG - log request:");
                    console.log(req);

                    var response = requestResponsePairDAO.getResponse(req);

                    console.log("DEBUG - log response:");
                    console.log(response);

                    res.status(response.code).send(response.content);
                });
            }

            if (endpoint.method == "DELETE") {
                app.delete(endpoint.path, function (req, res) {

                    console.log("DEBUG - log request:");
                    console.log(req);

                    var response = requestResponsePairDAO.getResponse(req);

                    console.log("DEBUG - log response:");
                    console.log(response);

                    res.status(response.code).send(response.content);
                });
            }

        }(endpoint)
    }

    var server = app.listen(SERVER_PORT,'localhost', function () {

        var host = server.address().address
        var port = server.address().port

        console.log("DEBUG - App listening at http://%s:%s", host, port)

    })

}

module.exports = Server;

