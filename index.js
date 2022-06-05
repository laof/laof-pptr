const http = require('http')
const fs = require('fs')
var url = require('url')
var util = require('util')
const puppeteer = require('puppeteer')
const stat = require('./static.js')

const _browser = require('./browser.js')

const server = http.createServer(async (req, res) => {
  const path = req.url
  if (path.startsWith('/api/ico?url=')) {
    const domain = url.parse(req.url, true).query.url
    const browser = await puppeteer.launch({
      timeout: 480000,
    })
    const data = await _browser(browser, atob(domain))
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(JSON.stringify(data))
    return
  } else if (path == '/') {
    var c = fs.readFileSync('public/index.html')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(c.toString())
    res.end()
  } else {
    stat(req, res)
  }
})

console.log('http://localhost:7687')
server.listen(7687, '0.0.0.0', () => {
  console.log('服务器启动成功')
})

function atob(str) {
  var buffer = Buffer.from(str, 'base64')
  return buffer.toString()
}
