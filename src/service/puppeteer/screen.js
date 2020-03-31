import downScreen from './block';
import { Service, LOCALE_EN, LOCALE_ZH, DATA_ATTRBUITES_SELECTOR } from '../constant';
import { asyncForEach } from './utils/index';
import fs from 'fs';
import path from 'path';

const keys = Object.keys(Service);
const preloadEnFile = fs.readFileSync(path.resolve(__dirname, './preload/preload-en.js'), 'utf8');
const preloadZhFile = fs.readFileSync(path.resolve(__dirname, './preload/preload-zh.js'), 'utf8');

asyncForEach(keys, async name => {
    const lib = Service[name];
    const blockData = require(`../fallback/${lib.name}`).default;
    if (!lib.selector) {
        lib.selector = DATA_ATTRBUITES_SELECTOR;
    }
    if (typeof lib.selector !== 'object') {
        throw new Error('selector属性请使用Object类型');
    }
    const selectors = Object.keys(lib.selector);

    await asyncForEach(selectors, async attribute => {
        if (typeof lib.selector[attribute] !== 'string') {
            throw new Error('selector中的value为CSS Selector字符串');
        }
        if (lib.runInBrowser && typeof lib.runInBrowser !== 'function') {
            throw new Error('runInBrowser为函数类型，运行在浏览器中');
        }
        const params = {
            selector: lib.selector[attribute],
            name,
            attribute,
            blockData,
            forceUpdate: process.env.FORCE_UPDATE === 'true',
            delay: typeof lib.delay === 'number' ? lib.delay : 5,
            runInBrowser: lib.runInBrowser,
            runBeforeWaitForSelector: lib.runBeforeWaitForSelector,
            waitUntil: lib.waitUntil
        }
        let languages = lib.languages;
        if (!languages || (!languages.includes(LOCALE_EN) && !languages.includes(LOCALE_ZH))) {
            languages = [LOCALE_ZH];
        }
        debugger;
        await asyncForEach(languages, async language => {
            await downScreen({
                ...params,
                locale: language,
                preload: language === LOCALE_ZH ? preloadZhFile : preloadEnFile,
            });
        });
    });
});