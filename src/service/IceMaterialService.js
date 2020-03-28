import axios from 'axios';
import { LIB_MATERIAL_ICECOMP, LIB_MATERIAL_ICEWORK, LIB_MATERIAL_ICESCA } from './constant';
import fallback from './fallback/merterial-fallback';

export const loadStoreData = async () => {
    let resp = {}
    try {
        resp = await axios.get('https://ice.alicdn.com/assets/react-materials.json');
    } catch (e) {
        console.error(e)
        resp = {
            data: fallback
        }
    }
    resp.data.blocks.forEach(element => {
        element.__lib__ = LIB_MATERIAL_ICEWORK;
    });

    resp.data.components.forEach(element => {
        element.__lib__ = LIB_MATERIAL_ICECOMP;
    });

    resp.data.scaffolds.forEach(element => {
        element.__lib__ = LIB_MATERIAL_ICESCA;
    });

    return resp.data;
}