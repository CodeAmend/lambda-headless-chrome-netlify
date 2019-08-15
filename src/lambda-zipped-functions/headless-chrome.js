const chromium = require('chrome-aws-lambda');
const fs = require('fs');
 

exports.handler = async (event, context, callback) => {
  let result1 = null;
  let result2 = null;
  let browser = null;
  const dirname = __dirname;
  const cwd = process.cwd();
  const PWD = process.PWD;
  let fileList = [];
 
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    fs.readdir(__dirname, function(err, items) {
      for (var i=0; i<items.length; i++) {
        fileList.push(items[i]);
      }
    });

    let page = await browser.newPage();
 
    await page.goto(__dirname + '/index.html');
 
    result1 = await page.title();

    await page.goto('file://' + __dirname + '/index.html');
    result2 = await page.title();

  } catch (error) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error }),
    });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        result1,
        result2,
        cwd,
        PWD,
        dirname,
        fileList: fileList.join(),
      })
    })
  }
 
  return context.succeed(result);
};
