const chromium = require('chrome-aws-lambda');
 

exports.handler = async (event, context, callback) => {
  let result = null;
  let browser = null;
  const dirname = __dirname;
  const cwd = process.cwd();
  const PWD = process.PWD;
 
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
 
    let page = await browser.newPage();
 
    await page.setContent(__dirname + '/index.html');
 
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
        cwd,
        PWD,
        dirname,
      })
    })
  }
 
  return context.succeed(result);
};
