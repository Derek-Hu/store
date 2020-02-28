import { Input } from 'antd';

export default {
    // <Form ...{props}> 
    props: {

    },
    fields: [
        {
            // getFieldDecorator(key, decorator)(<component>)
            key: 'name',
            decorator: {
                rules: [
                    {
                        required: true,
                        message: 'Error',
                    },
                ],
            },
            component: [Input, {
                placeholder: '请输入',
                maxLength: 2500,
            }],
            // <Form.Item ...{props}>
            props: {
                label: '资金方名称',
            },
        },
    ]
};