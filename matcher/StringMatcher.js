/**
 * StringMatcher.js
 *
 */

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
 * Matches the request Endpoint with in-memory Endpoint if applicable
 *
 * @param firstString
 * @param secondString
 * @returns {boolean}
 */
StringMatcher.prototype.match = function(firstString, secondString ) {

    console.log("DEBUG - StringMatcher start...");

    if(firstString != secondString){
        console.log("DEBUG - some String not matched (%s,%s)",firstString,secondString );
        return false;
    }

    console.log("DEBUG - StringMatcher successful...");

    return true;

}

module.exports = StringMatcher;