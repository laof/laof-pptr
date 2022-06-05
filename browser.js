module.exports = async function (browser) {
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com");

  const dimensions = await page.evaluate(() => {
    return {
      baseURI: document.baseURI,
      title: document.title,
    };
  });

  await browser.close();

  return dimensions;
};
