import axios from 'axios';
import { LIB_UMI } from './constant';

export const loadStoreData = async () => {
    let resp = {}
    try {
        resp = await axios.get('https://github.com/ant-design/pro-blocks/blob/master/umi-block.json');
    } catch (e) {
        console.error(e)
    }
    if (!resp || !resp.data) {
        return {};
    }
    const data = resp.data;
    data.blocks = data.list.map(block => {
        if (!block) {
            return;
        }
        return {
            ...block,
            name: block.key,
            __lib__: LIB_UMI,
            homepage: block.previewUrl,
            repository: block.url,
            screenshot: block.img,
            category: block.tags
        }
    }).filter(v => v);
    return data;
}
