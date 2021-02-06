const DEFAULT_LANGUAGE = "en",
      DEFAULT_COUNTRY = "US";

/**
 * ResourceBundle
 */
export class ResourceBundle {
  constructor(options = {}) {
    // setup a library
    if (options.locale && typeof options.locale === "string") {
      const locale = options.locale.split("_");
      this._language = locale[0];
      this._country = locale[1];
    } else {
      this._language = DEFAULT_LANGUAGE;
      this._country = DEFAULT_COUNTRY;
    }

    /**
     * @property {boolean} fallback Is fallback support enabled
     */
    this._fallback = (options.fallback && options.fallback === true) ? true : false;
    
    /**
     * @property {object} bundle The bundle used
     */
    this._bundle = (options.bundle && typeof options.bundle === "object") ? options.bundle : {};

    /**
     * @property {string} delimiter The key delimiter (if fallback is enabled)
     */
    this._delimiter = (options.delimiter) ? options.delimiter : ".";

    /**
     * @property {string} locale The locale
     */

     /**
     * @property {language} language The language
     */

     /**
     * @property {country} country The country
     */
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

  /**
   * Get a string from the bundle
   * @param {string} key The key to find in the bundle
   */
  get(key) {
    if (key) {
      const msg = this._getMessage(this.bundle[this.locale], key);
      let fallback = null;
      if (!msg || msg === `[${key}]`) {
        fallback = this._getMessage(this.bundle[this.language], key);
      }
      console.debug("get call msg", msg, fallback, this._fallback);
      if (this._fallback) {
        if (fallback && fallback !== `[${key}]`) {
          console.debug("fallback is correct", fallback);
          return fallback;
        } else if (!fallback && msg && msg !== `[${key}]`) {
          console.debug("original is correct", msg);
          return msg;
        } else {
          console.debug("not found", key);
        }
      }
      if (msg || msg !== `[${key}]`) {
        return msg;
      }
    }
    return null;
  };

  /**
   * _getMessage - get the message out of the bundle.<br/>
   * If message is not found, then ResourceBundle returns the key
   * wrapped in square brackets
   * loop through the fallback path of the key by removing the
   * last attribute and searching the bundle again
   * stop when you get back a real message (not just the [key])
   * @param {string} key The key to return from the bundle
   * @private
   */
  _getMessage(bundle, key) {
    // try getting the message out of the bundle
    let msg = bundle[key],
    last = key.length,
    originalKey = key;
    console.debug("_getMessage org msg", msg, key, bundle);
    // if message is not found, then ResourceBundle returns the key
    // wrapped in square brackets
    // loop through the fallback path of the key by removing the
    // last attribute and searching the bundle again
    // stop when you get back a real message (not just the [key])
    while ( last > 0 && (msg === `[${key}]` || msg === undefined)) {
      last = key.lastIndexOf(this._delimiter);
      key = key.substring(0,last);
      msg = bundle[key];
      console.debug("_getMessage msg", msg, key);
    }
    // if the original key or a fallback was found, return the
    // message
    // otherwise return the original key with square brackets
    return key ? msg : `[${originalKey}]`;
  };
};

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
