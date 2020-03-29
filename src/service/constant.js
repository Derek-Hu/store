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
    // [LIB_ANTD]: {
    //     url: 'https://gitee.com/ant-design/ant-design-blocks/raw/master/umi-block.json',
    //     name: 'antd-fallback',
    //     selector: {
    //        blocks: '.code-box:target'
    //     },
    // },
    // [LIB_MATERIAL_ICEWORK]: {
    //     url: 'https://ice.alicdn.com/assets/react-materials.json',
    //     name: 'merterial-fallback',
    //     selector: ''
    // },
    // [LIB_ICEWORK]: {
    //     url: 'http://ice.alicdn.com/assets/materials/react-materials.json',
    //     name: 'ice-fallback',
    //     selector: ''
    // },
    [LIB_UMIBLOCK]: {
        url: 'https://raw.githubusercontent.com/ant-design/pro-blocks/master/umi-block.json',
        name: 'umi-fallback',
        selector: {
            list: 'section.ant-layout > div',
        },
        runInBrowser: function(){
            if(document.querySelector('.ant-pro-setting-drawer-handle')){
                document.querySelector('.ant-pro-setting-drawer-handle').style.cssText = "display:none"
            }
        }
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
