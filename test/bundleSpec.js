const { ResourceBundle } = Core;

const BUNDLE_EN_US = {
  "hello": "hello",
  "goodbye": "goodbye",
  "my": "My",
  "my.big.key": "My Big Key"
};

const BUNDLE_ES = {
  "house": "casa"
};

const BUNDLE_ES_MX = {
  "hello": "hola",
  "goodbye": "adiós"
};

const FULL_BUNDLE = { "en_US": BUNDLE_EN_US, "es_MX": BUNDLE_ES_MX, "es": BUNDLE_ES };

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
      rb = new ResourceBundle({ "locale": "es_MX", "bundle": FULL_BUNDLE, "fallback": true });
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

    it("can get the key 'house' from the bundle with fallback", async () => {
      expect(await rb.get("house")).to.equal("casa");
    });
  });

  describe("Given an Resource Bundle in English", () => {
    let rb = null;
    beforeEach(() => {
      rb = new ResourceBundle({ "locale": "en_US", "bundle": FULL_BUNDLE, "fallback": true });
    });
    afterEach(() => {
      rb = null;
    })

    it("can get the key 'my.big.key.special' from the bundle (no existing key, but has fallback)", () => {
      expect(rb.get("my.big.key.special")).to.equal("My Big Key");
    });

    it("can get the key 'my.big' from the bundle (no existing key, but has fallback)", () => {
      expect(rb.get("my.big")).to.equal("My");
    });
  });

  describe("Given an Resource Bundle in English (no fallback)", () => {
    let rb = null;
    beforeEach(() => {
      rb = new ResourceBundle({ "locale": "en_US", "bundle": FULL_BUNDLE, "fallback": false });
    });
    afterEach(() => {
      rb = null;
    })

    it("can get the key 'my.big.key.special' from the bundle (no existing key)", () => {
      expect(rb.get("my.big.key.special")).to.equal(null);
    });

    it("can get the key 'my.big' from the bundle (no existing key)", () => {
      expect(rb.get("my.big")).to.equal(null);
    });
  });
});