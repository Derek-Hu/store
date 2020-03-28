import * as AntdService from './AntdService';
import * as IceWorkService from './IceWorkService';

export const loadBlocks = async () => {

    const [antd, icework] = await Promise.all([AntdService.loadStoreData(), IceWorkService.loadStoreData()]);

    const datas = {
        antd, 
        icework
        // blocks: (antd.blocks || []).concat(icwork.blocks || [])
    }
    localStorage.setItem('store-data', JSON.stringify(datas));
    return datas;
}