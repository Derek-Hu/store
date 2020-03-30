import puppeteer from 'puppeteer';
import { Service } from '../constant';
import { writeFallback, asyncForEach, createFolderIfNotExists } from './utils/index';
import XXH from 'xxhashjs';
import path from 'path';
import pkg from '../../../package.json';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
}

const isObject = val => Object.prototype.toString.call(val) !== '[object Object]'
const isHeadless = process.env.HEADLESS !== 'false';
const saveFolder = 'screenshots';
const { homepage } = pkg;
const baseUrl = homepage? (/\/$/.test(homepage)? homepage : homepage+ '/') : './';

export default (async ({ name, viewport,preload, locale, runBeforeWaitForSelector, blockData, delay, attribute, forceUpdate, selector, runInBrowser }) => {
    const folder = `./public/${saveFolder}/${name}`;

    createFolderIfNotExists(path.resolve(process.cwd(), folder, 'sample.png'));

    const browser = await puppeteer.launch({ headless: isHeadless , args: ['--no-sandbox'] });

    const width = viewport && typeof viewport.width === 'number' ?viewport.width: 1300;
    const height = viewport && typeof viewport.height === 'number' ?viewport.height: 900;
    try {
        await asyncForEach(blockData[attribute], async (item, index) => {
            if(!item){
                return;
            }
            const screenEmpty = !isObject(item.__HASH__) || item.__HASH__[locale]===undefined
            const descriptionEmpty = !isObject(item.__DESCRIPTION__) || item.__DESCRIPTION__[locale]===undefined;

            if (forceUpdate || screenEmpty || descriptionEmpty) {
                const page = await browser.newPage();
                await page.evaluateOnNewDocument(preload);
                try {
                    console.log(`${locale.toUpperCase()}: ${index}/${blockData[attribute].length}`, item.title||item.name);
                    await page.setViewport({
                        width,
                        height
                    });
                    const url = item.previewUrl;
                    await page.goto(url, { waitUntil: 'networkidle0' });
                    await page.evaluate(({ runBeforeWaitForSelector, locale }) => {
                        debugger;
                        if(runBeforeWaitForSelector){
                            (eval(runBeforeWaitForSelector))(locale);
                        }
                    }, {
                        locale,
                        runBeforeWaitForSelector: typeof runBeforeWaitForSelector === 'function'? `(${runBeforeWaitForSelector.toString()})`: null
                    });
                    await page.waitForSelector(selector);
                    await sleep(delay);
                    const clip = await page.evaluate(({ selector, runInBrowser }) => {
                        debugger;
                        if(runInBrowser){
                            (eval(runInBrowser))();
                        }
                        const target = document.querySelector(selector);
                        const rect = target.getBoundingClientRect();
                        var x = rect.left + document.documentElement.scrollLeft;
                        var y = rect.top + document.documentElement.scrollTop;
                        return { x: x + 1, y: y + 1, width: rect.width - 2, height: rect.height - 2, text: target.innerText.replace(/\s+/g, ' ') };
                    }, {
                        selector,
                        runInBrowser: typeof runInBrowser === 'function'? `(${runInBrowser.toString()})`: null
                    });
                    
                    const hash = `${index}-${locale}-` + XXH.h32([
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
                    if(isObject(item.__DESCRIPTION__)){
                        item.__DESCRIPTION__ = {};
                    }
                    item.__DESCRIPTION__[locale] = clip.text;

                    await page.screenshot({
                        path: `./public/${subPath}`,
                        clip
                    });

                    writeFallback(Service[name].name, blockData);
                } catch (e) {
                    console.error(e);
                }
                if (page) {
                    await page.close();
                }
            }
        });
    } catch (e) {
        console.error(e);
    }
    if (browser) {
        await browser.close();
    }

});
