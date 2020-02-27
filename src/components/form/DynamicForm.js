import React from 'react';
import { Form } from 'antd';

const renderField = (field, parentProps) => {
  const { getFieldDecorator } = parentProps.form;
  const { key, props, component, decorator } = field;
  const [Component, componentProps] = Array.isArray(component) ? component : [component]
  return <Form.Item {...props} key={key}>
    {getFieldDecorator(key, decorator)(<Component {...componentProps} />)}
  </Form.Item>;
}
export default Form.create()(props => {
  const { settings: { props: fromProps, fields }, render, children } = props;

  if (!fields || !fields.length) {
    return null;
  }
  const keyArgs = {};
  const FieldInstances = {};
  const batchKeys = {};
  let currentBatchNumber = -1;
  const FormFieldsGetter = {};
  const totalKey = {};

  fields.forEach(field => {
    const key = field.key;
    totalKey[key] = true;
    FieldInstances[key] = renderField(field, props);
    keyArgs[key] = key;
    Object.defineProperty(FormFieldsGetter, key, {
      get: function () {
        if (!(key in keyArgs)) {
          return null;
        }
        if (!batchKeys[currentBatchNumber]) {
          batchKeys[currentBatchNumber] = [];
        }
        batchKeys[currentBatchNumber].push(key);
        return FieldInstances[key];
      }
    });
  });

  const interceptors = render ? render.filter(child => typeof child === 'function') : null;
  const CustomItems = interceptors ? interceptors.map((interceptor, index) => {
    currentBatchNumber = index;
    return React.cloneElement(interceptor(keyArgs, FormFieldsGetter), {key: `batch_${index}`});
  }) : null;

  const batchKeyGraph = Object.keys(batchKeys).reduce((graph, batchIndex) => {
    const batch = batchKeys[batchIndex];
    if (!graph[batch[0]]) {
      graph[batch[0]] = [];
    }
    graph[batch[0]].push({ index: batchIndex, args: batch });
    return graph;
  }, {});

  const formItems = fields.map((field) => {
    const key = field.key;
    if (!totalKey[key]) {
      return null;
    }
    if ((key in batchKeyGraph)) {
      return batchKeyGraph[key].map(batch => {
        batch.args.forEach(batchKey => {
          totalKey[batchKey] = false;
        });
        return CustomItems[batch.index];
      });
    }
    return FieldInstances[key];
  });
  return (
    <Form {...fromProps}>{formItems}{children}</Form>
  );
});