import puppeteer from 'puppeteer';
import { writeFallback } from './index';

export default (async (url, name) => { 
  const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  let response = null;

  page.on('response', async (res) => { 
    response = await res.json(); 
  });
  await page.goto(url, { waitUntil: 'networkidle0' });

  writeFallback(name, response);

  await browser.close();
});
