/**
 * StringMatcher.js
 *
 */

var Configuration = require('./../Configuration.js');
var Logger = require('./../Logger.js');

/**
 * This class represents the string matcher. It tries to match two string values
 */

/**
 * Default Constructor.
 *
 * @constructor
 */
function StringMatcher() {}


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
 * Matches the request Endpoint with in-memory Endpoint if applicable
 *
 * @param firstString
 * @param secondString
 * @returns {boolean}
 */
StringMatcher.prototype.match = function(firstString, secondString ) {

    LOGGER.debug("StringMatcher start...");

    if(firstString != secondString){
        LOGGER.debug("Some String not matched ("+firstString+","+secondString+")" );
        return false;
    }

    return true;

}

module.exports = StringMatcher;