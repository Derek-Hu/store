import axios from 'axios';
import { LIB_ANTD, Service } from './constant';
import ANTD_Transfrom, { isEmpty } from './utils';
import fallback from './fallback/antd-fallback';

const antdTrasfrom = ANTD_Transfrom(LIB_ANTD);

export const loadStoreData = async () => {
    let resp = {}
    try {
        resp = await axios.get(Service[LIB_ANTD].url);
    } catch (e) {
        console.error(e);
        resp = {
            data: fallback
        }
    }
    const data = resp.data;
    data.blocks = data.blocks.map(antdTrasfrom).filter(isEmpty);

    return data;
}