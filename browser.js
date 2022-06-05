
const path = require('path')

module.exports = async function (browser, url) {
  try {
    const page = await browser.newPage()
    await page.goto(url)

    const data = await page.evaluate(() => {
      var link = document.querySelectorAll('head link')

      var href = []
      link.forEach((ddd) => {
        const aa = ddd.getAttribute('href')
        href.push(aa)
      })

      return {
        base: document.baseURI,
        list: href,
      }
    })

    await browser.close()

    return { code: 200, url: getss(data.list, data.base) }
  } catch (e) {
    return { code: 500, url: '', error: JSON.stringify(e) }
  }
}

function getss(list, base) {
  for (var i = 0; i < list.length; i++) {
    const s = anyHref(list[i], base)
    if (s) {
      return s
    }
  }
  return ''
}

function anyHref(href, base) {
  var types = ['.ico', '.png', '.svg', '.gif']
  for (let i = 0; i < types.length; i++) {
    if (href.endsWith(types[i])) {
      return link(href, base)
    }
  }
  return ''
}

function link(href, base) {
  if (href.startsWith('//')) {
    return 'https:' + href
  } else if (href.startsWith('http')) {
    return href
  }

  var aa = path.join(base, href)
  return aa
}
