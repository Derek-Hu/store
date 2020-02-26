import { Input } from 'antd';
import BasicInfoLayout from './layout'
/*
 * 1. 素数
 * 2. 中间渲染
 * 3. Multiple
 * 4. Visible
 */
export default {
    template: BasicInfoLayout,
    // props: {

    // },
    fields: [
        {
            key: 'name',
            props: {
                label: '资金方名称',
            },
            component: [Input, {
                placeholder: '请输入',
                maxLength: 2500,
            }],
            decorator: {
                rules: [
                    {
                        required: true,
                        message: 'Error',
                    },
                ],
            },
        },
        {
            key: 'from',
            props: {
                // label: '开始',
            },
            component: [Input, {
                placeholder: '请输入开始时间',
                maxLength: 2500,
            }],
            decorator: {
                rules: [
                    {
                        required: true,
                        message: 'Error',
                    },
                ],
            },
        },
        {
            key: 'to',
            props: {
                // label: '结束',
            },
            component: [Input, {
                placeholder: '请输入结束时间',
                maxLength: 2500,
            }],
            decorator: {
                rules: [
                    {
                        required: true,
                        message: 'Error',
                    },
                ],
            },
        },
        {
            key: 'day',
            props: {
                label: '天',
            },
            component: [Input, {
                placeholder: '请输入天',
                maxLength: 2500,
            }],
            decorator: {
                rules: [
                    {
                        required: true,
                        message: 'Error',
                    },
                ],
            },
        },
        {
            key: 'month',
            props: {
                label: '月',
            },
            component: [Input, {
                placeholder: '请输入月',
                maxLength: 2500,
            }],
            decorator: {
                rules: [
                    {
                        required: true,
                        message: 'Error',
                    },
                ],
            },
        }
    ]
};