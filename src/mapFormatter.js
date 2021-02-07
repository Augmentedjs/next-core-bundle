import replaceAll from "string.prototype.replaceall";
replaceAll.shim(); // will be a no-op if not needed

/**
 * MapFormatter - maps a JSON object of keys to new text
 */
export class MapFormatter {
  constructor() {
  };

  /**
   * Replaces a string with replacedment test from a JSON object.  
   * Will replace all instances marked withthe key name
   * @param {string} message The original string 
   * @param {object} replacements Object with replacement strings
   * @returns {string} Returns the string with replaced text
   * @static
   * @example
   * const message = MapFormatter.format("This is a test of {ebs}.", { "ebs": "the Emergency Broadcast System" });
   */
  static format(message, replacements) {
    let output = message;
    if ((message && typeof message === "string") && (replacements && typeof replacements === "object")) {
      const keys = Object.keys(replacements), l = keys.length;
      let key = null, i = 0;

      for (i; i < l; i++) {
        key = keys[i];
        const replacement = replacements[key];
        if (key && replacement) {
          output = output.replaceAll(`{${key}}`, replacement);
        }
      }
    }
    return output;
  };
};