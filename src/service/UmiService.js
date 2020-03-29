import axios from 'axios';
import { LIB_UMIBLOCK, LIB_UMICOMP, Service } from './constant';
import fallback from './fallback/umi-fallback';
import ANTD_Transfrom, { isEmpty }  from './utils';

const umiCompTransfrom = ANTD_Transfrom(LIB_UMICOMP);
const umiBlockTransfrom = ANTD_Transfrom(LIB_UMIBLOCK);

export const loadStoreData = async () => {
    let resp = {}
    try {
        resp = await axios.get(Service[LIB_UMIBLOCK].url);
    } catch (e) {
        console.error(e)
        resp = {
            data: fallback
        }
    }
    const data = resp.data;
    if(data.list){
        data.list = data.list.map(umiCompTransfrom).filter(isEmpty);
    }
    if(data.blocks){
        data.blocks = data.blocks.map(umiBlockTransfrom).filter(isEmpty);
    }
    return data;
}
