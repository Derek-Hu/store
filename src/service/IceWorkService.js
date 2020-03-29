import axios from 'axios';
import { LIB_ICECOMP, LIB_ICEWORK, LIB_ICESCA, Service } from './constant';
import fallback from './fallback/ice-fallback';
import { ICETransform, isEmpty } from './utils';

export const loadStoreData = async () => {
    let resp = {}
    try {
        resp = await axios.get(Service[LIB_ICEWORK].url);
    } catch (e) {
        console.error(e)
        resp = {
            data: fallback
        }
    }

    resp.data.blocks.forEach(ICETransform(LIB_ICEWORK));
    resp.data.blocks = resp.data.blocks.filter(isEmpty);

    resp.data.components.forEach(ICETransform(LIB_ICECOMP));
    resp.data.components = resp.data.components.filter(isEmpty);

    resp.data.scaffolds.forEach(ICETransform(LIB_ICESCA));
    resp.data.scaffolds = resp.data.scaffolds.filter(isEmpty);
    
    return resp.data;
}