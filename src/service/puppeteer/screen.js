import downScreen from './block';
import { Service } from '../constant';
import { asyncForEach } from './utils/index';

const keys = Object.keys(Service);

asyncForEach(keys, async name => {
    const lib = Service[name];
    const blockData = require(`../fallback/${lib.name}`).default;
    if(!lib.selector){
        lib.selector = {
            blocks: 'html'
        }
    }
    if(typeof lib.selector !== 'object'){
        throw new Error('selector属性请使用Object类型');
    }
    const selectors = Object.keys(lib.selector);

    await asyncForEach(selectors, async attribute => {
        if(typeof lib.selector[attribute] !== 'string'){
            throw new Error('selector中的value为CSS Selector字符串');
        }
        if(lib.runInBrowser && typeof lib.runInBrowser !== 'function'){
            throw new Error('runInBrowser为函数类型，运行在浏览器中');
        }
        await downScreen({
            selector: lib.selector[attribute],
            name,
            attribute,
            blockData,
            forceUpdate: process.env.FORCE_UPDATE === 'true',
            delay: typeof lib.delay === 'number'? lib.delay : 5,
            runInBrowser: lib.runInBrowser
        });
    });
});