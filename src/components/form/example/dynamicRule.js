import React from 'react';
import DynamicForm from '~/components/form/DynamicForm';
import { Input, Form, Button, Checkbox } from 'antd';

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};

export default class Example extends React.Component {

    state = {
        fields: {
            checkNick: {
                value: true,
            }
        }
    };

    handleSubmit = (e, form) => {
        e.preventDefault();
        form.validateFields(err => {

            if (!err) {
                console.info('success');
            }else{
                console.error(err);
            }
        });
    };

    onValuesChange = (_, __, form) => {
        form.validateFields(['nickname'], { force: true });
    }

    onFieldsChange = (changedFields, allFields) => {
        console.log(changedFields, allFields);
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    }

    render() {
        const { fields } = this.state;

        const settings = {
            fields: [
                {
                    key: 'username',
                    component: [Input, {
                        placeholder: 'Please input your name',
                    }],
                    props: {
                        label: "Name",
                        ...formItemLayout,
                    },
                    decorator: {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your name',
                            },
                        ],
                    }
                }, {
                    key: 'nickname',
                    component: [Input, {
                        placeholder: 'Please input your nickname',
                    }],
                    props: {
                        label: "Nickname",
                        ...formItemLayout,
                    },
                    decorator: {
                        rules: [
                            {
                                required: fields.checkNick.value,
                                message: 'Please input your nickname',
                            },
                        ],
                    }
                }, {
                    key: 'checkNick',
                    component: [Checkbox, {
                        children: 'Nickname is required'
                    }],
                    props: {
                        ...formTailLayout
                    },
                    decorator: {
                        valuePropName: 'checked',
                    }
                }
            ]
        };

        return (
            <DynamicForm
                settings={settings}
                fields={fields}
                onFieldsChange={this.onFieldsChange}
                onValuesChange={this.onValuesChange}
                onSubmit={this.handleSubmit}>
                <Form.Item {...formTailLayout}>
                    <Button type="primary" htmlType="submit">
                        Check
                    </Button>
                </Form.Item>
            </DynamicForm>
        );
    }
}