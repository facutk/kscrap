// https://farm.space/

const express = require("express");
const app = express();
const port = process.env.PORT || 5000
const puppeteer = require("puppeteer");

app.get("/scrap/:site", async (req, res) => {
  // res.send(req.params.site);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto(`https://${req.params.site}`);

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log("Dimensions:", dimensions);
  res.send(dimensions);
  await browser.close();
});

app.get("/", (req, res) => {
  const example = `/scrap/farm.space`;
  res.send(`<a href='${example}'>${example}</a>`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
