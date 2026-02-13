const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const response = await page.evaluate(async () => {
    const res = await fetch('https://randomuser.me/api/');
    return await res.json();
  });
  
  console.log(JSON.stringify(response, null, 2));
  await browser.close();
})();
