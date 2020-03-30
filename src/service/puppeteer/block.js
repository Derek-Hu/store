import puppeteer from 'puppeteer';
import { Service, LOCALE_EN, LOCALE_ZH } from '../constant';
import { writeFallback, writeSync, asyncForEach, createFolderIfNotExists, sleep, hashVal, isObject } from './utils/index';
import path from 'path';
import fs from 'fs';
import pkg from '../../../package.json';
import isImageEmpty from './utils/isImageEmpty';

const saveFolder = 'screenshots';
const emtpyPath = path.resolve(process.cwd(), `./public/${saveFolder}/empty.json`);
const errorPath = path.resolve(process.cwd(), `./public/${saveFolder}/error.json`);

const isHeadless = process.env.HEADLESS !== 'false';
const { homepage } = pkg;
const baseUrl = homepage ? (/\/$/.test(homepage) ? homepage : homepage + '/') : './';

let emptyImages = [];
let errorItems = {};
try {
    if (fs.existsSync(emtpyPath)) {
        emptyImages = JSON.parse(fs.readFileSync(emtpyPath));
    }
    if (fs.existsSync(errorPath)) {
        errorItems = JSON.parse(fs.readFileSync(errorPath));
    }
} catch (e) {
    console.error(e);
}

const saveErrors = (item) => {
    errorItems[item.__ID__] = item;
    writeSync(errorPath, JSON.stringify(errorItems, null, 2));
}

const WaitUntilMap = {
    networkidle2: 'networkidle2',
    networkidle0: 'networkidle0'
}
export default (async ({ name, viewport, preload, waitUntil, locale, runBeforeWaitForSelector, blockData, delay, attribute, forceUpdate, selector: normalSelector, runInBrowser }) => {
    const folder = `./public/${saveFolder}/${name}`;

    createFolderIfNotExists(path.resolve(process.cwd(), folder, 'sample.png'));

    const browser = await puppeteer.launch({ headless: isHeadless, args: ['--no-sandbox'] });

    const width = viewport && typeof viewport.width === 'number' ? viewport.width : 1300;
    const height = viewport && typeof viewport.height === 'number' ? viewport.height : 900;
    try {
        await asyncForEach(blockData[attribute], async (item, index) => {
            if (!item) {
                return;
            }
            item.__ID__ = hashVal(item);
            const screenEmpty = !isObject(item.__HASH__) || !item.__HASH__[locale]
            const descriptionEmpty = !isObject(item.__DESCRIPTION__) || item.__DESCRIPTION__[locale] === undefined || item.__DESCRIPTION__[locale] === null;

            if (forceUpdate || screenEmpty || descriptionEmpty) {
                const page = await browser.newPage();
                await page.evaluateOnNewDocument(preload);
                try {
                    console.log(`${locale.toUpperCase()}: ${index}/${blockData[attribute].length}`, item.title || item.name);
                    await page.setViewport({
                        width,
                        height
                    });
                    const url = item.previewUrl || item.homepage;
                    await page.goto(url, { waitUntil: WaitUntilMap[waitUntil] || WaitUntilMap.networkidle0 });
                    const hasRunBefore = typeof runBeforeWaitForSelector === 'function';
                    if (hasRunBefore) {
                        await page.evaluate(({ runBeforeWaitForSelector, currentLocale, settings }) => {
                            debugger;
                            if (runBeforeWaitForSelector) {
                                return (eval(runBeforeWaitForSelector))(currentLocale, settings);
                            }
                        }, {
                            settings: {
                                LOCALE_EN,
                                LOCALE_ZH
                            },
                            currentLocale: locale,
                            runBeforeWaitForSelector: hasRunBefore ? `(${runBeforeWaitForSelector.toString()})` : null
                        });
                    }

                    let selector = normalSelector;
                    try {
                        await page.waitForSelector(selector);
                        await sleep(delay);
                    } catch (e) {
                        selector = 'html';
                        saveErrors(item);
                    }
                    const clip = await page.evaluate(({ selector, runInBrowser }) => {
                        debugger;
                        if (runInBrowser) {
                            (eval(runInBrowser))();
                        }
                        const target = document.querySelector(selector);
                        const rect = target.getBoundingClientRect();
                        var x = rect.left + document.documentElement.scrollLeft;
                        var y = rect.top + document.documentElement.scrollTop;
                        return { x: x + 1, y: y + 1, width: rect.width - 2, height: rect.height - 2, text: target.innerText.replace(/\s+/g, ' ') };
                    }, {
                        selector,
                        runInBrowser: typeof runInBrowser === 'function' ? `(${runInBrowser.toString()})` : null
                    });

                    const hash = `${index}-${locale}-${hashVal(item)}`;

                    if (!isObject(item.__DESCRIPTION__)) {
                        item.__DESCRIPTION__ = {};
                    }
                    if (!isObject(item.__HASH__)) {
                        item.__HASH__ = {};
                    }
                    const subPath = `${saveFolder}/${name}/${hash}.png`;

                    item.__HASH__[locale] = `${baseUrl}${subPath}`;
                    item.__DESCRIPTION__[locale] = clip.text;

                    const imagePath = `./public/${subPath}`;
                    const absolutePath = path.resolve(process.cwd(), imagePath);
                    try {
                        const imageBuffer = await page.screenshot({
                            path: imagePath,
                            clip
                        });
                        const isEmpty = await isImageEmpty(imageBuffer);
                        if (isEmpty) {
                            emptyImages.push({
                                ...item,
                                __EMPTY__: absolutePath
                            });
                            writeSync(emtpyPath, JSON.stringify(emptyImages, null, 2));
                        }
                    } catch (e) {
                        console.error(e);
                    }
                    writeFallback(Service[name].name, blockData);
                } catch (e) {
                    console.error(e);
                    saveErrors(item);
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
