import * as AntdService from './AntdService';
import * as IceWorkService from './IceWorkService';
import * as UmiService from './UmiService';

import { LIB_ICECOMP, LIB_ICEWORK, LIB_ANTD, LIB_UMIBLOCK, LIB_UMICOMP, SEPERATOR } from './constant';

export const Libs = [{
    key: LIB_ANTD,
    label: 'Antd',
}, {
    key: LIB_ICEWORK,
    label: '飞冰',
}, {
    key: LIB_ICECOMP,
    label: '飞冰组件',
}, {
    key: LIB_UMIBLOCK,
    label: 'UmiJS',
}, {
    key: LIB_UMICOMP,
    label: 'UmiJS组件',
}]

export const loadBlocks = async () => {

    const [antd, icework, umijs] = await Promise.all([
        AntdService.loadStoreData(),
        IceWorkService.loadStoreData(),
        UmiService.loadStoreData()
    ]);

    const datas = {
        [LIB_ANTD]: antd.blocks,
        [LIB_UMICOMP]: umijs.list,
        [LIB_UMIBLOCK]: umijs.blocks ,
        [LIB_ICEWORK]: icework.blocks ,
        [LIB_ICECOMP]: icework.components ,
    }

    Object.keys(datas).forEach(lib => {
        if(datas[lib]){
            datas[lib].forEach((item, index) => {
                item.__id__ = `${lib}${SEPERATOR}${index}`;
            })
        }
    })
    localStorage.setItem('store-data', JSON.stringify(datas));
    return datas;
}