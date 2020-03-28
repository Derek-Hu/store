import * as AntdService from './AntdService';
import * as IceWorkService from './IceWorkService';
import * as UmiService from './UmiService';

import { LIB_ICECOMP, LIB_ICEWORK, LIB_ANTD } from './constant';

export const Libs = [{
    key: LIB_ANTD,
    label: 'Antd',
}, {
    key: LIB_ICEWORK,
    label: '飞冰',
}, {
    key: LIB_ICECOMP,
    label: '飞冰组件',
}]
export const loadBlocks = async () => {

    const [antd, icework] = await Promise.all([
        AntdService.loadStoreData(),
        IceWorkService.loadStoreData(),
        UmiService.loadStoreData()
    ]);

    const datas = {
        [LIB_ANTD]: antd,
        [LIB_ICEWORK]: { blocks: icework.blocks },
        [LIB_ICECOMP]: { blocks: icework.components },
    }
    localStorage.setItem('store-data', JSON.stringify(datas));
    return datas;
}