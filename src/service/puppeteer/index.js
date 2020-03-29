const puppeteer = require('puppeteer/puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const iPhone = devices['iPhone 6'];
const Constant = require('../const');
const Utils = require('../utils');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const gotoScreen = async(page, url, filename, notFullPage) => {
  await page.goto(url);
  // waiting for loading images
  await sleep(2000);
  await Utils.Screenshot(page, url, filename, !notFullPage);
};

(async () => {
  
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.setViewport({
    width: 375,
    height: 667
  })

  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');

  const navigationPromise = page.waitForNavigation({waitUntil: 'networkidle0'});
  await page.goto(Constant.urls.companyList);
  await navigationPromise;

  const nextStep = await page.$('div a[role="button"]');

  await nextStep.click();

  await gotoScreen(page, Constant.urls.mcah5.amountsTestResult, 'mcah5-amounts-test-result.png');

  await gotoScreen(page, Constant.urls.mcah5.amountsTest, 'mcah5-amounts-test.png');

  await gotoScreen(page, Constant.urls.mcah5.material.menu, 'mcah5-material-menu.png');

  await gotoScreen(page, Constant.urls.mcah5.material.income, 'mcah5-material-income.png');
  await gotoScreen(page, Constant.urls.mcah5.material.basicInfo, 'mcah5-material-basic-info.png');
  await gotoScreen(page, Constant.urls.mcah5.material.shareHolder, 'mcah5-material-share-holder.png');
  await gotoScreen(page, Constant.urls.mcah5.material.relatedCompany, 'mcah5-material-related-company.png');
  await gotoScreen(page, Constant.urls.mcah5.material.company, 'mcah5-material-company.png');
  await gotoScreen(page, Constant.urls.mcah5.material.document, 'mcah5-material-document.png');

  await gotoScreen(page, Constant.urls.common.personalCredit, 'common－personal－credit.png');


  await gotoScreen(page, Constant.urls.mcah5.channelAuthProtocol, 'mcah5-channel-auth-protocol.png');

  await browser.close();

})();
