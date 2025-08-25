import express from "express";
import { expect } from "chai";
import path from "path";
import { chromium } from "playwright";

const app = express();
app.use(express.static(path.join(path.resolve(), "../../dist")));
app.use(express.static(path.join(path.resolve(), "../../public")));
const url = "http://localhost:3000";

describe("End to End Tests", () => {
  let httpServer = null;
  let browser = null;
  let page = null;

  before(async () => {
    httpServer = app.listen(8888);
    browser = await chromium.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(url);
  });

  after(async () => {
    await browser.close();
    httpServer.close();
  });

  // This is where your code is going to go
  it("should contain a <h1> element for the page title", async () => {
    await page.waitForSelector("h1", { timeout: 2000 });
    const header = await page.locator("h1").textContent();
    expect(header).to.not.be.null;
    expect(header.trim()).to.equal("Mortgage Calculator");
  });

  it("should contain a <button> element called Calculate", async () => {
    await page.waitForSelector("button#calculate", { timeout: 2000 });
    const button = await page.locator("button#calculate").textContent();
    expect(button).to.not.be.null;
    expect(button.trim()).to.equal("Calculate");
  });

  it("should contain a <select> element with options 'Monthly' and 'Quarterly'.", async () => {
    await page.waitForSelector("select[name=period]", { timeout: 2000 });
    const options = await page
      .locator("select[name=period] option")
      .allTextContents();
    expect(options).to.include.members(["Monthly", "Quarterly"]);
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
