//TODO: add a library or make your own.
//var resourceBundle = (!resourceBundle) ? new i18nBase() : resourceBundle;

/**
 * ResourceBundle Object used for configuration of a bundle
 * @property {string} name Name/uri/file of the bundle
 * @property {string} mode Bundlefile type (default: both)
 * @property {boolean} cache Cache reading from bundle (default: true)
 */
export const BundleObject = {
  name: "",
  mode: "both",
  cache: true
};

/**
 * ResourceBundle
 */
export class ResourceBundle {
  constructor() {
    // setup a library
  };

  /**
  * Gets the bundle(s) and registers to ResourceBundle
  * @param {BundleObject} bundle Bundle to get
  * @returns {object} returns a bundle
  */
  static getBundle() {
    return {};//resourceBundle.properties.apply(this, arguments);
  };

  /**
   * Gets a string from the registered bundle
   */
  static getString() {
    return "";//resourceBundle.prop.apply(this, arguments);
  }
};

/**
 * Reads a message out of the bundle
 */
export class MessageReader {
  constructor() {
  };

  /**
   * getMessage - get the message out of the bundle.<br/>
   * If message is not found, then ResourceBundle returns the key
   * wrapped in square brackets
   * loop through the fallback path of the key by removing the
   * last attribute and searching the bundle again
   * stop when you get back a real message (not just the [key])
   * @param {string} key The key to return from the bundle
   */
  static getMessage(key) {
    const delimiter = ".";
    // try getting the message out of the bundle
    let msg = ResourceBundle.getString(key),
    last = key.length,
    originalKey = key;
    // if message is not found, then ResourceBundle returns the key
    // wrapped in square brackets
    // loop through the fallback path of the key by removing the
    // last attribute and searching the bundle again
    // stop when you get back a real message (not just the [key])
    while ( last > 0 && msg == "[" + key + "]") {
      last = key.lastIndexOf(delimiter);
      key = key.substring(0,last);
      msg = ResourceBundle.getString(key);
    }
    // if the original key or a fallback was found, return the
    // message
    // otherwise return the original key with square brackets
    // (default jquery.i18n.properties plugin result)
    return key ? msg : "[" + originalKey + "]";
  }
};

/**
 * <p>MessageKeyFormatter<br/>
 *
 * Concatenate the pieces of the message together if a portion of the key is
 * missing, the rest of the key is ignored. <em>ex. if the "rule" attribute is
 * missing, then the key will return with the message.level + message.kind only</em></p>
 */
export class MessageKeyFormatter {
  constructor() {
    this.delimiter = ".";
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
  static format(message) {
    let key = "";
    if (message) {
      let x = message.level &&
      (key += message.level, message.kind &&
        (key += this.delimiter + message.kind, message.rule &&
          (key += this.delimiter + message.rule, message.values.title &&
            (key += this.delimiter + message.values.title))));
    }
    return (key) ? key : "";
  };
};
