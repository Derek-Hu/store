import puppeteer from 'puppeteer';
import { Service } from '../constant';
import { writeFallback, asyncForEach, createFolderIfNotExists } from './utils/index';
import XXH from 'xxhashjs';
import path from 'path';
import pkg from '../../../package.json';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
}

const isHeadless = process.env.HEADLESS !== 'false';
const saveFolder = 'screenshots';
const { homepage } = pkg;
const baseUrl = homepage? (/\/$/.test(homepage)? homepage : homepage+ '/') : './';

export default (async ({ name, blockData, delay, attribute, forceUpdate, selector, runInBrowser }) => {
    const folder = `./public/${saveFolder}/${name}`;

    createFolderIfNotExists(path.resolve(process.cwd(), folder, 'sample.png'));

    const browser = await puppeteer.launch({ headless: isHeadless , args: ['--no-sandbox'] });

    try {
        asyncForEach(blockData[attribute], async (item, index) => {
            const hashEmpty = item && (!item.__HASH__ || !item.__HASH__.length); // item maybe null
            if (forceUpdate || hashEmpty) {
                const page = await browser.newPage();
                try {
                    await page.setViewport({
                        width: 1300,
                        height: 900
                    });
                    const url = item.previewUrl;
                    await page.goto(url, { waitUntil: 'networkidle0' });
                    await page.waitForSelector(selector);
                    await sleep(delay);
                    const clip = await page.evaluate(({ selector, runInBrowser }) => {
                        debugger;
                        if (typeof runInBrowser === 'function') {
                            runInBrowser();
                        }
                        const target = document.querySelector(selector);
                        const rect = target.getBoundingClientRect();
                        var x = rect.left + document.documentElement.scrollLeft;
                        var y = rect.top + document.documentElement.scrollTop;
                        return { x: x + 1, y: y + 1, width: rect.width - 2, height: rect.height - 2, text: target.innerText.replace(/\s+/g, ' ') };
                    }, {
                        selector,
                        runInBrowser
                    });
                    console.log(`${index}/${blockData[attribute].length}`, item.title||item.name);
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

                    const subPath = `${saveFolder}/${name}/${hash}.png`;

                    item.__HASH__ = [`${baseUrl}${saveFolder}/${name}/${hash}.png`];
                    item.__DESCRIPTION__ = clip.text;

                    await page.screenshot({
                        path: `./public/${subPath}`,
                        clip
                    });

                    writeFallback(Service[name].name, blockData);
                    await page.close();
                } catch (e) {
                    console.error(e);
                    if (page) {
                        await page.close();
                    }
                }
            }
            if (index === blockData[attribute].length - 1) {
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

});
