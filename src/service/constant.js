export const LIB_ICECOMP = 'icecomp';
export const LIB_ANTD = 'antd';
export const LIB_ICEWORK = 'icework';
export const LIB_UMIBLOCK = 'umijs';
export const LIB_UMICOMP = 'umijscomp';
export const LIB_ICESCA = 'icework-sca';
export const LIB_MATERIAL_ICECOMP = 'LIB_MATERIAL_ICECOMP';
export const LIB_MATERIAL_ICEWORK = 'LIB_MATERIAL_ICEWORK';
export const LIB_MATERIAL_ICESCA = 'LIB_MATERIAL_ICESCA';

export const Service = {
    [LIB_ANTD]: {
        url: 'https://gitee.com/ant-design/ant-design-blocks/raw/master/umi-block.json',
        name: 'antd-fallback',
    },
    [LIB_MATERIAL_ICEWORK]: {
        url: 'https://ice.alicdn.com/assets/react-materials.json',
        name: 'merterial-fallback',
    },
    [LIB_ICEWORK]: {
        url: 'http://ice.alicdn.com/assets/materials/react-materials.json',
        name: 'ice-fallback',
    },
    [LIB_UMIBLOCK]: {
        url: 'https://github.com/ant-design/pro-blocks/blob/master/umi-block.json',
        name: 'umi-fallback',
    },
}

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
    label: 'AntPro组件',
}, {
    key: LIB_ICESCA,
    label: '飞冰脚手架'
}, {
    key: LIB_MATERIAL_ICECOMP,
    label: '飞冰官方组件',
}, {
    key: LIB_MATERIAL_ICEWORK,
    label: '飞冰官方区块'
}, {
    key: LIB_MATERIAL_ICESCA,
    label: '飞冰官方脚手架'
}]

export const SEPERATOR = '_$$_';
