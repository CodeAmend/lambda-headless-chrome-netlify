const chromium = require('chrome-aws-lambda');
 

exports.handler = async (event, context, callback) => {
  let result = null;
  let browser = null;
 
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
 
    let page = await browser.newPage();
 
    await page.goto(event.url || 'https://example.com');
 
    result = await page.title();

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
        title: result,
      })
    })
  }
 
  return context.succeed(result);
};
