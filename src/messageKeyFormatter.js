
/**
 * <p>MessageKeyFormatter<br/>
 *
 * Concatenate the pieces of the message together if a portion of the key is
 * missing, the rest of the key is ignored. <em>ex. if the "rule" attribute is
 * missing, then the key will return with the message.level + message.kind only</em></p>
 */
export class MessageKeyFormatter {
  constructor(options = {}) {
    this._delimiter = (options.delimiter) ? options.delimiter : ".";
  };

  /**
  * Key Delimiter
  * @property {string} delimiter The delimter used to seperate each key
  */

  /**
   * Format a key for a message
   * @param {message} message The message to format
   * @returns The key to lookup in a bundle
   */
  static format(message = {}) {
    let key = "";
    if (message) {
      let x = message.level &&
      (key += message.level, message.kind &&
        (key += this._delimiter + message.kind, message.rule &&
          (key += this._delimiter + message.rule, message.values.title &&
            (key += this._delimiter + message.values.title))));
    }
    return (key) ? key : "";
  };
};
