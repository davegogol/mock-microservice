/**
 * Logger.js
 */

/**
 * This class represents a Logger wrapper for logging at different levels.
 */

/**
 * Default Constructor.
 *
 * @constructor
 */
function Logger(level) {
    this.level = level;
}

/**
 * Logs at debug level
 * @param text
 */
Logger.prototype.debug = function(text, object) {

    if(this.level == "DEBUG"){
        console.log("DEBUG - " + text);

        if (typeof object !== 'undefined')
            console.log(object)
    }
}

/**
 * Logs at info level
 * @param text
 */
Logger.prototype.info = function(text) {
    if(this.level == "DEBUG" || this.level == "INFO")
        console.log("INFO - " + text);
}

module.exports = Logger;