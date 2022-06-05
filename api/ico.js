const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')
const _browser = require('../browser.js')

function atob(str) {
  var buffer = Buffer.from(str, 'base64')
  return buffer.toString()
}

module.exports = async function handler(request, response) {
  const domain = url.parse(request.url, true).query.url
  const data = xxx(atob(domain))

  response.writeHead(200, { 'Content-type': 'application/json' })
  response.end(JSON.stringify(data))
}

async function xxx(url) {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  })

  return _browser(browser, url)
}
