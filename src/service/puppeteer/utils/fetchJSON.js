import puppeteer from 'puppeteer';
import { writeFallback, readFallback, isObject, hashVal, isHeadless } from './index';
import { ATTR_ID, ATTR_SNAPSHOT_EN, ATTR_SNAPSHOT_ZH, DATA_ATTRBUITES_SELECTOR } from '../../constant';

export default (async (url, name) => {
  const browser = await puppeteer.launch({ headless: isHeadless, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  let response = null;

  page.on('response', async (res) => {
    response = await res.json();
  });
  await page.goto(url, { waitUntil: 'networkidle0' });

  if (!isObject(response)) {
    throw new Error('返回的数据格式为对象，参考：https://ice.work/docs/materials/reference/protocol');
  }

  debugger;
  const cacheContent = readFallback(name);
  if (isObject(cacheContent)) {
    Object.keys(DATA_ATTRBUITES_SELECTOR).forEach(key => {
      const data = cacheContent[key];
      const latest = response[key];
      if (!Array.isArray(data) || !Array.isArray(latest)) {
        return;
      }

      const attrMap = data.reduce((maps, element) => {
        if (!element) {
          return maps;
        }
        maps[element[ATTR_ID]] = element;
        return maps;
      }, {});

      response[key] = latest.map(item => {
        if (!item) {
          return;
        }

        const hash = hashVal(item);
        const cache = attrMap[hash];
        if(!cache){
          item[ATTR_ID] = hash;
          return item;
        }
        return {
          ...item,
          [ATTR_ID]: hash,
          [ATTR_SNAPSHOT_EN]: cache[ATTR_SNAPSHOT_EN],
          [ATTR_SNAPSHOT_ZH]: cache[ATTR_SNAPSHOT_ZH]
        }
      });

    })
  }
  writeFallback(name, response);

  await browser.close();
});
