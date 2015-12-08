/**
 * Server.js
 */
var express = require('express');
var bodyParser = require('body-parser');
var xmlparser = require('express-xml-bodyparser');

var RequestResponsePairDAO = require('./dao/HTTPRequestResponsePairDAO.js');
var EndpointDAO = require('./dao/EndpointDAO.js');
var Logger = require('./Logger.js');
var Configuration = require('./Configuration.js');
var HTTP_METHOD = require('./constants.js').allowedHttpMethods;

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
var SERVER_PORT = CONFIGURATION.SERVER_PORT;

/**
 * Application server.
 */
var app = express();

/**
 * Starts the server with its configuration.
 */
Server.prototype.start = function() {

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(xmlparser()); // for parsing application/xml

    var endpoints = endpointDAO.getAllEndpoints();

    LOGGER.debug("Server endpoints definition...");

    for (var endpoint in endpoints) {

        endpoint = endpoints[endpoint];

        !function outer(endpoint) {

            LOGGER.debug("endpoint defined (" + endpoint.method + "," + endpoint.path + ")");

            if (endpoint.method === HTTP_METHOD.GET) {

                app.get(endpoint.path, function (req, res) {

                    LOGGER.info("HTTP Request GET " + req.path);
                    LOGGER.debug("incoming HTTP request:",req);

                    var response = requestResponsePairDAO.getResponse(req);

                    LOGGER.info("HTTP Response status code: " + response.code);
                    LOGGER.debug("outcoming HTTP response:",response);

                    res.status(response.code).send(response.content);
                });
            }

            if (endpoint.method === HTTP_METHOD.POST) {
                app.post(endpoint.path, function (req, res) {

                    LOGGER.info("HTTP Request POST " + req.path);
                    LOGGER.debug("incoming HTTP request:",req);

                    var response = requestResponsePairDAO.getResponse(req);

                    LOGGER.debug("outcoming HTTP response:",response);

                    LOGGER.info("HTTP Response status code: " + response.code);
                    res.status(response.code).send(response.content);
                });
            }

            if (endpoint.method === HTTP_METHOD.PUT) {
                app.put(endpoint.path, function (req, res) {

                    LOGGER.info("HTTP Request PUT " + req.path);
                    LOGGER.debug("incoming HTTP request:",req);

                    var response = requestResponsePairDAO.getResponse(req);

                    LOGGER.info("HTTP Response status code: " + response.code);
                    LOGGER.debug("outcoming HTTP response:",response);

                    res.status(response.code).send(response.content);
                });
            }

            if (endpoint.method === HTTP_METHOD.DELETE) {
                app.delete(endpoint.path, function (req, res) {

                    LOGGER.info("HTTP Request DELETE " + req.path);
                    LOGGER.debug("incoming HTTP request:",req);

                    var response = requestResponsePairDAO.getResponse(req);

                    LOGGER.info("HTTP Response status code: " + response.code);
                    LOGGER.debug("outcoming HTTP response:",response);

                    res.status(response.code).send(response.content);
                });
            }

        }(endpoint)
    }

    var server = app.listen(SERVER_PORT,'localhost', function () {

        var host = server.address().address;
        var port = server.address().port;

        LOGGER.info("App listening at http://" + host + ":" + port);
    })
};

module.exports = Server;

