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
        selector: {
           blocks: '.code-box:target'
        },
        runBeforeWaitForSelector: function(locale){
            const cacheLocale = localStorage.getItem('locale');
            if(cacheLocale !== locale){
                document.querySelector('.header-lang-button').click();
            }
        }
    },
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
    // [LIB_UMIBLOCK]: {
    //     url: 'https://raw.githubusercontent.com/ant-design/pro-blocks/master/umi-block.json',
    //     name: 'umi-fallback',
    //     selector: {
    //         list: 'section.ant-layout > div',
    //     },
    //     viewport: {
    //         width: 1000,
    //         height: 800
    //     },
    //     runInBrowser: function(){
    //         const sideMenu  = document.querySelector('section.ant-layout aside.ant-layout-sider');
    //         const settings = document.querySelector('.ant-pro-setting-drawer-handle');
    //         if(settings){
    //             settings.style.cssText = "display:none"
    //         }
    //         document.getElementById('root').style.cssText = 'height: auto';
    //         document.querySelector('body').style.cssText = 'height: auto';
    //         document.querySelector('html').style.cssText = 'height: auto';
    //         if(sideMenu){
    //             sideMenu.style.cssText = "display:none"
    //         }
    //     }
    // },
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
