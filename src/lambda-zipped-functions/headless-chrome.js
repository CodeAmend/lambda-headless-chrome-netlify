const chromium = require('chrome-aws-lambda');


exports.handler = async (event, context, callback) => {
  let title = null;
  let browser = null;
 
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    let page = await browser.newPage();
    await page.goto('file://' + __dirname + '/index.html');
    title = await page.title();

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
      body: JSON.stringify({ title })
    })
  }
 
  return context.succeed(result);
};
