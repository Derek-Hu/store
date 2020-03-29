import puppeteer from 'puppeteer';
import { Service_ANTD } from '../constant';
import { writeFallback } from './utils/index';

const FallbackAntd = 'antd-fallback';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  let response = null;

  page.on('response', async (res) => { 
    response = await res.json(); 
  });
  await page.goto(Service_ANTD, { waitUntil: 'networkidle0' });

  debugger;
  writeFallback(FallbackAntd, response);

  await browser.close();
})();
