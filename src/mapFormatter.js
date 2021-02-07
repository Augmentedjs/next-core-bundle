import replaceAll from "string.prototype.replaceall";
replaceAll.shim(); // will be a no-op if not needed

export class MapFormatter {
  constructor() {
  };

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