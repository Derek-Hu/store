import puppeteer from 'puppeteer';
import path from 'path';
import { Service_ANTD } from '../constant';
import { writeFallback } from './utils/index';

const FallbackAntd = 'antd-fallback.json';

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('load', (a) => console.log('Page loaded!', a));
  let response = null;

  page.on('response', async (res) => { 
    debugger; 
    console.log('Page response!');
    response = await res.json(); 
  });
  await page.goto(Service_ANTD, { waitUntil: 'networkidle0' });

  writeFallback(FallbackAntd, JSON.stringify(response, null, 2));

  await browser.close();
})();
