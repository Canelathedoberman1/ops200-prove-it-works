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
});