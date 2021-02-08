const DEFAULT_LANGUAGE = "en",
      DEFAULT_COUNTRY = "US",
      DEFAULT_DELIMITER = ".";

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
    this._delimiter = (options.delimiter) ? options.delimiter : DEFAULT_DELIMITER;

    /**
     * @property {string} locale The locale
     */

    /**
     * @property {string} language The language
     */

    /**
     * @property {string} country The country
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
   * Get a string from the bundle by key
   * @param {string} key The key to find in the bundle
   * @returns {string} Message from bundle, [key] if not found, or null if missing the key
   */
  get(key) {
    if (key) {
      const msg = this._getMessage(this.bundle[this.locale], key);
      let fallback = null;
      if (this._fallback && (!msg || msg === `[${key}]`)) {
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
   * @param {object} bundle The bundle to return from
   * @param {string} key The key to return from the bundle
   * @returns {string} Message from bundle, [key] if not found, or null if missing bundle or key
   * @private
   */
  _getMessage(bundle, key) {
    if (this._fallback && (bundle && key)) {
      // try getting the message out of the bundle
      let msg = bundle[key],
      last = key.length,
      originalKey = key;
      const TEST_KEY = `[${key}]`;
      console.debug("_getMessage org msg", msg, key, bundle);
      // if message is not found, then ResourceBundle returns the key
      // wrapped in square brackets
      // loop through the fallback path of the key by removing the
      // last attribute and searching the bundle again
      // stop when you get back a real message (not just the [key])
      while ( last > 0 && (msg === TEST_KEY || msg === undefined)) {
        last = key.lastIndexOf(this._delimiter);
        key = key.substring(0, last);
        msg = bundle[key];
        console.debug("_getMessage msg", msg, key);
      }
      // if the original key or a fallback was found, return the
      // message
      // otherwise return the original key with square brackets
      return key ? msg : `[${originalKey}]`;
    } else if (bundle && key) {
      return (bundle[key]) ? bundle[key] : null;
    }
    return null;
  };
};
