import { expect } from "chai";
import Mortgage from "../../src/js/lib/Mortgage.js";

describe("Mortgage Calculator", () => {
  it("should have a monthlyPayment function", () => {
    const mortgage = new Mortgage(200000, 5, 30, 12);
    expect(mortgage.monthlyPayment).to.exist;
  });

  it("should calculate the monthly payment correctly", () => {
    const mortgage = new Mortgage(200000, 5, 30, 12);
    expect(mortgage.monthlyPayment()).to.equal("1073.64");
  });
});
