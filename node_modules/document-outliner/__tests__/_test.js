const path = require('path');
const minify = require('html-minifier').minify;

let page;

beforeAll(async () => {
  page = await browser.newPage();
});

const minifyHtml = (html) => {
  return minify(html, {
    collapseWhitespace: true,
  });
};

const domTest = (testFile, message) => {
  test(message, async () => {
    await page.goto(`file://${path.resolve(__dirname, `./${testFile}.html`)}`);
    const res = await page.evaluate(() => {
      return {
        test: document.querySelector('.test').innerHTML,
        result: document.querySelector('.result').innerHTML,
      }
    });
    await expect(minifyHtml(res.result)).toEqual(minifyHtml(res.test));
  });
};

domTest('spec-1', 'spec-1 test.');
domTest('spec-2', 'spec-2 test.');
domTest('spec-3', 'spec-3 test.');
domTest('spec-4', 'spec-4 test.');
domTest('spec-5', 'spec-5 test.');
domTest('spec-6', 'spec-6 test.');
domTest('default-option', 'default option test.');
domTest('full-option', 'full option test.');
domTest('jquery-plugin', 'jquery plugin test.');
