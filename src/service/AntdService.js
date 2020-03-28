import axios from 'axios';

export const loadStoreData = async () => {
    let resp = {}
    try {
        resp = await axios.get('https://raw.githubusercontent.com/ant-design/ant-design-blocks/master/umi-block.json');
    } catch (e) {
        console.error(e)
    }
    if (!resp || !resp.data) {
        return {};
    }
    const data = resp.data;
    data.blocks = data.blocks.map(block => {
        if (!block) {
            return;
        }
        return {
            ...block,
            name: block.key,
            __lib__: 'antd',
            homepage: block.previewUrl,
            repository: block.url,
            screenshot: block.img,
            category: block.tags
        }
    }).filter(v => v);
    return data;
}