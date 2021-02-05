const { BundleObject, ResourceBundle, MessageReader, MessageKeyFormatter } = Core;

const BUNDLE_EN_US = {
  "hello": "hello",
  "goodbye": "goodbye"
};

const BUNDLE_ES = {
  "house": "casa"
};

const BUNDLE_ES_MX = {
  "hello": "hola",
  "goodbye": "adiós"
};

describe("Given an Resource Bundle", () => {
  it("can init the bundle with default language / locale", () => {
    const rb = new ResourceBundle();
    expect(rb).to.not.be.undefined;
    expect(rb.locale).to.equal("en_US");
  });

  it("can init the bundle with a language / locale", () => {
    const rb = new ResourceBundle({ "locale": "es_MX" });
    expect(rb).to.not.be.undefined;
    expect(rb.locale).to.not.equal("en_US");
    expect(rb.locale).to.equal("es_MX");
  });

  describe("Given an Resource Bundle in Spanish", () => {
    let rb = null;
    beforeEach(() => {
      rb = new ResourceBundle({ "locale": "es_MX", "bundle": { "en_US": BUNDLE_EN_US, "es_MX": BUNDLE_ES_MX, "es": BUNDLE_ES }, "fallback": true });
    });
    afterEach(() => {
      rb = null;
    })

    it("can init the bundle with a language / locale with keys in the bundle", () => {
      expect(rb.bundle).to.not.deep.equal({});
    });

    it("can get the key 'hello' from the bundle", () => {
      expect(rb.get("hello")).to.equal("hola");
    });

    it("can get the key 'house' from the bundle with fallback", () => {
      expect(rb.get("house")).to.equal("casa");
    });
  });
});