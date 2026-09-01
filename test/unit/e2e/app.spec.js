import express from "express";
import { expect } from "chai";
import path from "path";
import { chromium } from "playwright";

const app = express();

app.use(express.static(path.join(process.cwd(), "dist")));
app.use(express.static(path.join(process.cwd(), "public")));

const url = "http://localhost:3000";

describe("End to End Tests", function () {
  this.timeout(10000);

  let httpServer = null;
  let browser = null;
  let page = null;

  before(async () => {
    httpServer = app.listen(3000);
    browser = await chromium.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(url);
  });

  afterEach(async () => {
    await page.close();
  });

  after(async () => {
    await browser.close();
    httpServer.close();
  });

  it("should contain a <h1> element for the page title", async () => {
    await page.waitForSelector("h1", { timeout: 2000 });
    const header = await page.locator("h1").textContent();

    expect(header).to.not.be.null;
    expect(header.trim()).to.equal("Mortgage Calculator");
  });
    it("should have a principal input", async () => {
    await page.waitForSelector("input[name=principal]");
    const input = await page.locator("input[name=principal]");
    expect(input).to.not.be.null;
  });

  it("should have an interest rate input", async () => {
    await page.waitForSelector("input[name=interestRate]");
    const input = await page.locator("input[name=interestRate]");
    expect(input).to.not.be.null;
  });

  it("should have a loan term input", async () => {
    await page.waitForSelector("input[name=loanTerm]");
    const input = await page.locator("input[name=loanTerm]");
    expect(input).to.not.be.null;
  });

  it("should have a period dropdown", async () => {
    await page.waitForSelector("select[name=period]");
    const select = await page.locator("select[name=period]");
    expect(select).to.not.be.null;
  });

  it("should have Monthly and Quarterly options", async () => {
    const options = await page.locator("select[name=period] option").allTextContents();

    expect(options).to.include("Monthly");
    expect(options).to.include("Quarterly");
  });

  it("should have a Calculate button", async () => {
    await page.waitForSelector("button#calculate");
    const button = await page.locator("button#calculate");
    expect(button).to.not.be.null;
  });

  it("should display Calculate on the button", async () => {
    const buttonText = await page.locator("button#calculate").textContent();

    expect(buttonText.trim()).to.equal("Calculate");
  });

  it("should correctly calculate mortgage", async () => {
    await page.fill("input[name=principal]", "300000");
    await page.fill("input[name=interestRate]", "3.75");
    await page.fill("input[name=loanTerm]", "30");
    await page.selectOption("select[name=period]", "12");
    await page.click("button#calculate");

    await page.waitForSelector("#output", { timeout: 4000 });

    const outputText = await page.locator("#output").textContent();

    expect(outputText.trim()).to.equal("$1389.35");
  }).timeout(6500);
});