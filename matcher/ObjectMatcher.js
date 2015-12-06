/**
 * ObjectMatcher.js
 *
 */

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
            console.log("DEBUG - some Object not matched (%s,%s)",storedObjectLength,matchedObject );
            return false;
        }

    }else{
        console.log("DEBUG - ObjectMatcher not applicable");
    }

    return true;

}

module.exports = ObjectMatcher;