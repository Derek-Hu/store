import axios from 'axios';
import { LIB_ICECOMP, LIB_ICEWORK, LIB_ICESCA } from './constant';
import fallback from './fallback/ice-fallback';

export const loadStoreData = async () => {
    let resp = {}
    try {
        resp = await axios.get('http://ice.alicdn.com/assets/materials/react-materials.json');
    } catch (e) {
        console.error(e)
        resp = {
            data: fallback
        }
    }
    resp.data.blocks.forEach(element => {
        element.__lib__ = LIB_ICEWORK;
    });

    resp.data.components.forEach(element => {
        element.__lib__ = LIB_ICECOMP;
    });

    resp.data.scaffolds.forEach(element => {
        element.__lib__ = LIB_ICESCA;
    });

    return resp.data;
}