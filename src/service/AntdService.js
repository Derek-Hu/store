import axios from 'axios';
import { LIB_ANTD } from './constant';
import ANTD_Transfrom from './utils';

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
    data.blocks = data.blocks.map(ANTD_Transfrom(LIB_ANTD)).filter(v => v);
    return data;
}