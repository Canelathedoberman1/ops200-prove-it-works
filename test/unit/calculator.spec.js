import { expect } from "chai";
import Calculator from "../../src/js/Calculator.js";

describe("Calculator", () => {
  it("should have an add function", () => {
    expect(Calculator.add).to.exist;
  });

  it("should add 2 + 2 together correctly", () => {
    expect(Calculator.add(2, 2)).to.equal(4);
  });
});
