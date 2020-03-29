import * as AntdService from './AntdService';
import * as IceWorkService from './IceWorkService';
import * as UmiService from './UmiService';
import * as MaterialService from './IceMaterialService';
import { LIB_ICECOMP, LIB_ICEWORK, LIB_ICESCA, LIB_ANTD, LIB_MATERIAL_ICECOMP, LIB_MATERIAL_ICEWORK, LIB_MATERIAL_ICESCA, LIB_UMIBLOCK, LIB_UMICOMP, SEPERATOR } from './constant';

export const loadBlocks = async () => {

    const [antd, icework, umijs, material] = await Promise.all([
        AntdService.loadStoreData(),
        IceWorkService.loadStoreData(),
        UmiService.loadStoreData(),
        MaterialService.loadStoreData()
    ]);

    const datas = {
        [LIB_ANTD]: antd.blocks,
        [LIB_UMICOMP]: umijs.list,
        [LIB_UMIBLOCK]: umijs.blocks,
        [LIB_ICEWORK]: icework.blocks,
        [LIB_ICECOMP]: icework.components,
        [LIB_ICESCA]: icework.scaffolds,
        [LIB_MATERIAL_ICECOMP]: material.components,
        [LIB_MATERIAL_ICEWORK]: material.blocks,
        [LIB_MATERIAL_ICESCA]:material.scaffolds
    }

    Object.keys(datas).forEach(lib => {
        if (datas[lib]) {
            datas[lib].forEach((item, index) => {
                item.__id__ = `${lib}${SEPERATOR}${index}`;
            })
        }
    })
    localStorage.setItem('store-data', JSON.stringify(datas));
    return datas;
}