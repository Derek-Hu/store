import puppeteer from 'puppeteer';
import { Service, LIB_ANTD } from '../constant';
import { writeFallback, asyncForEach, createFolderIfNotExists } from './utils/index';
import antdData from '../fallback/antd-fallback';
import XXH from 'xxhashjs';
import path from 'path';
import fs from 'fs';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const folder = '../fallback/screenshots/antd';

const cwd = process.cwd();
const getRelative = filename => path.relative(cwd, path.resolve(__dirname, folder, filename));

createFolderIfNotExists(path.resolve(__dirname, folder, 'sample.png'));

const errors = [];
export default (async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

    try {
        let currentItem;
        asyncForEach(antdData.blocks, async (item, index) => {
            let currentItem = index;

            const page = await browser.newPage();
            try {
                await page.setViewport({
                    width: 1500,
                    height: 850
                });
                const url = item.previewUrl;
                await page.goto(url);
                await page.waitForSelector('.code-box:target');
                await sleep(2000);
                const clip = await page.evaluate(() => {
                    const target = document.querySelector('.code-box:target');
                    const rect = target.getBoundingClientRect();
                    var x = rect.left + document.documentElement.scrollLeft;
                    var y = rect.top + document.documentElement.scrollTop;
                    return { x: x + 1, y: y + 1, width: rect.width - 2, height: rect.height - 2, text: target.innerText.replace(/\s+/g, ' ') };
                });
                console.log(`${index}/${antdData.blocks.length}`, item.title);
                const hash = index + '_' + XXH.h32([
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
                item.__DESCRIPTION__ = clip.text;

                await page.screenshot({
                    path: getRelative(`${hash}.png`),
                    clip
                });

                writeFallback(Service[LIB_ANTD].name, antdData);
                await page.close();
            } catch (e) {
                console.error(e);
                errors.push(antdData.blocks[currentItem]);
                fs.writeFileSync('./error.json', JSON.stringify(errors, null, 2));
                if (page) {
                    await page.close();
                }
            }
            if (index === antdData.blocks.length - 1) {
                fs.writeFileSync('./error.json', JSON.stringify(errors, null, 2));
                if (browser) {
                    await browser.close();
                }
            }
        });
    } catch (e) {
        console.error(e);
        if (browser) {
            await browser.close();
        }
    }

})();
