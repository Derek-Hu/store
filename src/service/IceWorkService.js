import axios from 'axios';
import { LIB_ICECOMP, LIB_ICEWORK } from './constant';

export const loadStoreData = async () => {
    try {
        const resp = await axios.get('http://ice.alicdn.com/assets/materials/react-materials.json');
        resp.data.blocks.forEach(element => {
            element.__lib__ = LIB_ICEWORK;
        });

        resp.data.components.forEach(element => {
            element.__lib__ = LIB_ICECOMP;
        });

        return resp.data;
    } catch (e) {
        console.error(e)
        return {};
    }
}