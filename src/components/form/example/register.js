import React from 'react';
import DynamicForm from '~/components/form/DynamicForm';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default class Example extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    compareToFirstPassword = (rule, value, callback) => {
        // debugger;
        const { form } = this.formRef;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        // debugger;
        const { form } = this.formRef;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    settings = {
        props: {
            ...formItemLayout,
        },
        fields: [
            {
                key: 'email',
                component: [Input, {
                    prefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />,
                    placeholder: "Username"
                }],
                props: {
                    label: 'E-mail'
                },
                decorator: {
                    rules: [
                        { type: 'email', message: 'The input is not valid E-mail!' },
                        { required: true, message: 'Please input your E-mail!' },
                    ],
                },
            }, {
                key: 'password',
                component: Input.Password,
                props: {
                    label: 'Password',
                    hasFeedback: true,
                },
                decorator: {
                    rules: [
                        { required: true, message: 'Please input your password!' },
                        { validator: this.validateToNextPassword },
                    ],
                },
            }, {
                key: 'confirm',
                component: [Input.Password, {
                    onBlur: this.handleConfirmBlur
                }],
                props: {
                    label: 'Confirm Password',
                    hasFeedback: true,
                },
                decorator: {
                    rules: [
                        { required: true, message: 'Please confirm your password!' },
                        { validator: this.compareToFirstPassword },
                    ],
                },
            }, {
                key: 'nickname',
                component: Input,
                props: {
                    label: <span>Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                    </span>,
                },
                decorator: {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                },
            }, {
                key: 'residence',
                component: [Cascader, {
                    options: residences
                }],
                props: {
                    label: 'Habitual Residence',
                },
                decorator: {
                    initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                    rules: [
                        { type: 'array', required: true, message: 'Please select your habitual residence!' },
                    ],
                },
            }, {
                key: 'phone',
                component: [Input, {
                    // addonBefore: prefixSelector,
                    style: { width: '100%' }
                }],
                props: {
                    label: 'Phone Number',
                },
                decorator: {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                },
            }, {
                key: 'prefix',
                component: [Select, {
                    style: { width: 70 },
                    children: <>
                        <Option value="86">+86</Option>
                        <Option value="87">+87</Option>
                    </>
                }],
                decorator: {
                    initialValue: '86',
                },
            }
        ]
    };

    componentDidMount() {
        console.log(this.formRef)
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    handleSubmit = e => {
        e.preventDefault();
        this.formRef.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    onFieldsChange = (changedFields, allFields) => {
        console.log(changedFields, allFields);
    }

    onValuesChange = (changedValues, allValues) => {
        console.log(changedValues, allValues);
    }

    render() {
        const { fields } = this.state;
        return (
            <DynamicForm
                wrappedComponentRef={this.saveFormRef}
                settings={this.settings}
                fields={fields}
                onSubmit={this.handleSubmit}
                onValuesChange={this.onValuesChange}
                onFieldsChange={this.onFieldsChange}
                render={[({ prefix, phone }, fields) => <Form.Item>
                    
                </Form.Item>]}>
                <Button type="primary" htmlType="submit">
                    Log in
                </Button>
                <Form.Item>
                    Or <a href="">register now!</a>
                </Form.Item>
            </DynamicForm>
        );
    }
}