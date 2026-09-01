const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/mortgage');

describe('Mortgage Calculator', () => {

  it('should create a Mortgage instance', () => {
    const mortgage = new Mortgage(300000, 3.75, 30, 12);
    expect(mortgage).to.be.instanceOf(Mortgage);
  });

  it('should have a monthlyPayment function', () => {
    const mortgage = new Mortgage(300000, 3.75, 30, 12);
    expect(mortgage.monthlyPayment).to.exist;
  });

  it('should return a value when monthlyPayment is called with valid inputs', () => {
    const mortgage = new Mortgage(300000, 3.75, 30, 12);
    expect(mortgage.monthlyPayment()).to.exist;
  });

  it('should calculate the correct monthly payment for known values', () => {
    const mortgage = new Mortgage(300000, 3.75, 30, 12);
    expect(mortgage.monthlyPayment()).to.equal('1389.35');
  });

});