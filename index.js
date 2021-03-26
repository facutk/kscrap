// https://farm.space/

const express = require("express");
const app = express();
const port = process.env.PORT || 5000
const puppeteer = require("puppeteer");
const { htmlToText } = require('html-to-text');

app.get("/scrap/:site", async (req, res) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto(`https://${req.params.site}`);

  const data = await page.evaluate(() => document.querySelector('*').outerHTML);

  const text = htmlToText(data);
  res.send(`<pre>${text}</pre>`);

  await browser.close();
});

app.get("/", (req, res) => {
  const example = `/scrap/farm.space`;
  res.send(`<a href='${example}'>${example}</a>`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
