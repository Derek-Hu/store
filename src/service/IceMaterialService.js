import axios from 'axios';
import { LIB_MATERIAL_ICECOMP, LIB_MATERIAL_ICEWORK, LIB_MATERIAL_ICESCA, Service } from './constant';
import fallback from './fallback/merterial-fallback';
import { ICETransform, isEmpty } from './utils';

export const loadStoreData = async () => {
    let resp = {}
    try {
        resp = await axios.get(Service[LIB_MATERIAL_ICEWORK].url);
    } catch (e) {
        console.error(e)
        resp = {
            data: fallback
        }
    }

    resp.data.blocks.forEach(ICETransform(LIB_MATERIAL_ICEWORK));
    resp.data.blocks = resp.data.blocks.filter(isEmpty);

    resp.data.components.forEach(ICETransform(LIB_MATERIAL_ICECOMP));
    resp.data.components = resp.data.components.filter(isEmpty);

    resp.data.scaffolds.forEach(ICETransform(LIB_MATERIAL_ICESCA));
    resp.data.scaffolds = resp.data.scaffolds.filter(isEmpty);

    return resp.data;
}