const { MapFormatter } = Core;

describe("Given an message", () => {
  const MESSAGE = "Hello {firstName}, we have selected you for the {position} position as you appear to be qualified due to your experience in {skill}.";
  it("can replace keywords in a string", () => {
    const message = MapFormatter.format(MESSAGE, { "firstName": "Bob", "position": "pizza baker", "skill": "clay oven baking" });
    //console.debug(message);
    expect(message).to.not.be.undefined;
    expect(message).to.not.equal(MESSAGE);
    expect(message).to.equal("Hello Bob, we have selected you for the pizza baker position as you appear to be qualified due to your experience in clay oven baking.");
  });

});