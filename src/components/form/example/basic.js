import React from 'react';
import DynamicForm from '~/components/form/DynamicForm';
import { Icon, Input, Form, Button } from 'antd';

const settings = {
  props: {
    layout: "inline"
  },
  fields: [
    {
      key: 'username',
      component: [Input, {
        prefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />,
        placeholder: "Username"
      }],
      props: {
        validateStatus: '',
      },
      decorator: {
        rules: [{ required: true, message: 'Please input your Password!' }],
      },
    }, {
      key: 'password',
      component: [Input, {
        type: "password",
        prefix: <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />,
        placeholder: "Password"
      }],
      decorator: {
        rules: [{ required: true, message: 'Please input your username!' }],
      },
    }
  ]
};
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@Form.create()
export default class Example extends React.Component {

  componentDidMount() {
    // To disable submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  onChange = () => {

  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    console.log(getFieldsError());
    return (
      <DynamicForm settings={settings} onChange={this.onChange}>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Log in
          </Button>
        </Form.Item>
      </DynamicForm>
    );
  }
}