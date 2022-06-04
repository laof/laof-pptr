import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

export default async function handler(request, response) {
  var data = await screenshot()
  response.status(200).send(`Hello 333! ${JSON.stringify(data)}`)
}

export async function screenshot() {
  const options = {
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  }
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.goto('https://www.baidu.com')

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      baseURI: document.baseURI,
      title: document.title,
    }
  })

  await browser.close()

  return dimensions
}
