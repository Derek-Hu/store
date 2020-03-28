import axios from 'axios';
import { LIB_UMIBLOCK, LIB_UMICOMP } from './constant';
import fallback from './fallback/umi-fallback';
import ANTD_Transfrom from './utils';

export const loadStoreData = async () => {
    let resp = {}
    try {
        resp = await axios.get('https://github.com/ant-design/pro-blocks/blob/master/umi-block.json');
    } catch (e) {
        console.error(e)
        resp = {
            data: fallback
        }
    }
    const data = resp.data;
    if(data.list){
        data.list = data.list.map(ANTD_Transfrom(LIB_UMICOMP)).filter(v => v);
    }
    if(data.blocks){
        data.blocks = data.blocks.map(ANTD_Transfrom(LIB_UMIBLOCK)).filter(v => v);
    }
    return data;
}
