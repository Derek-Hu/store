import puppeteer from 'puppeteer';
import { Service, LIB_ANTD } from '../constant';
import { writeFallback, asyncForEach, createFolderIfNotExists } from './utils/index';
import antdData from '../fallback/antd-fallback';
import XXH from 'xxhashjs';
import path from 'path';

const folder = path.resolve(__dirname, '../fallback/screenshots/antd');

createFolderIfNotExists(folder);
export default (async () => {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });

    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 850
    });
    asyncForEach(antdData.blocks, async (item, index) => {
        const url = item.previewUrl;
        await page.goto(url);
        await page.waitForSelector('.code-box:target');
        const clip = await page.evaluate(() => {
            const target = document.querySelector('.code-box:target');
            const rect = target.getBoundingClientRect();
            var x = rect.left + document.documentElement.scrollLeft;
            var y = rect.top + document.documentElement.scrollTop;
            return { x: x, y: y, width: rect.width, height: rect.height };
        });
        const hash = XXH.h32([
            item.title,
            item.key,
            item.value,
            item.description,
            item.name,
            item.previewUrl,
            item.url,
            item.homepage,
            item.repository
        ].join('|'), 0xABCD).toString(16);

        item.__HASH__ = hash;

        debugger;
        await page.screenshot({
            path: + path.resolve(folder, `${hash}.png`),
            clip
        });

        writeFallback(Service[LIB_ANTD].name, JSON.stringify(antdData, null, 2));

        if(index === antdData.blocks.length - 1){
            await browser.close();
        }
    });

})();
