const DEFAULT_LANGUAGE = "en",
      DEFAULT_COUNTRY = "US";

/**
 * ResourceBundle
 */
export class ResourceBundle {
  constructor(options = {}) {
    // setup a library
    if (options.locale) {
      const locale = options.locale.split("_");
      this._language = locale[0];
      this._country = locale[1];
    } else {
      this._language = DEFAULT_LANGUAGE;
      this._country = DEFAULT_COUNTRY;
    }

    this._fallback = (options.fallback && options.fallback === true) ? true : false;
    
    this._bundle = (options.bundle && typeof options.bundle === "object") ? options.bundle : {};
  };

  get locale() {
    return `${this._language}_${this._country}`;
  };

  get language() {
    return this._language;
  };

  get country() {
    return this._country;
  };

  get bundle() {
    return this._bundle;
  };

  get(key) {
    let message = null;
    if (key) {
      if (this._fallback) {
        if (this.bundle[this.locale][key]) {
          message = this.bundle[this.locale][key];
        } else if (this.bundle[this.language][key]) {
          message = this.bundle[this.language][key];
        }
      }
      if (this.bundle[this.locale][key]) {
        message = this.bundle[this.locale][key];
      }
    }
    return message;
  };
};

/**
 * Reads a message out of the bundle
 */
export class MessageReader {
  constructor(bundle) {
    this._resouceBundle = bundle;
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
  getMessage(key) {
    const delimiter = ".";
    // try getting the message out of the bundle
    let msg = this._resourceBundle.get(key),
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
      msg = this._resourceBundle.get(key);
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
