const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

module.exports = async function handler(request, response) {
  var data = await xxx()
  response.status(200).send(`Hedllo 333! ${JSON.stringify(data)}`)
}

async function xxx() {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  })

  const page = await browser.newPage()
  await page.goto('https://www.baidu.com')

  const dimensions = await page.evaluate(() => {
    return {
      baseURI: document.baseURI,
      title: document.title,
    }
  })

  await browser.close()

  return dimensions
}
