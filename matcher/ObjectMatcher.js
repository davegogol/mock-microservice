/**
 * ObjectMatcher.js
 *
 */

var Configuration = require('./../Configuration.js');
var Logger = require('./../Logger.js');

/**
 * This class represents the Object matcher. It tries to match the request Object with
 * the in-memory requests Object.
 */

/**
 * Default Constructor.
 *
 * @constructor
 */
function ObjectMatcher() {}

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
 * Matches the request Object with in-memory Object if applicable
 *
 * @param requestObjects
 * @param storedObjects
 * @returns {boolean}
 */
ObjectMatcher.prototype.match = function(storedObjects, requestObjects ) {

    if (typeof storedObjects !== 'undefined') {

        var storedObjectLength = 0;
        var matchedObject = 0;

        for(var storedObject in storedObjects){
            storedObjectLength += 1;
            for(var requestObject in requestObjects){
                if(requestObjects[requestObject] == storedObjects[storedObject]){
                    matchedObject += 1;
                }
            }
        }

        if(storedObjectLength != matchedObject){
            LOGGER.debug("Some Object not matched ("+storedObjectLength+","+matchedObject+")");
            return false;
        }

    }else{
        LOGGER.debug("ObjectMatcher not applicable");
    }

    return true;

}

module.exports = ObjectMatcher;