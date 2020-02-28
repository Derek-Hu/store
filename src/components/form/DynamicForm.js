import React, { forwardRef, useImperativeHandle } from 'react';
import { Form } from 'antd';

const renderField = (field, parentProps) => {
  const { getFieldDecorator } = parentProps.form;
  const { key, component, decorator } = field;
  const [Component, componentProps] = Array.isArray(component) ? component : [component];
  const {children} = componentProps || {};
  return getFieldDecorator(key, decorator)(<Component {...componentProps}>{children}</Component>);
}
export default Form.create({
  onFieldsChange(props, changedFields, allFields) {
    props.onFieldsChange && props.onFieldsChange(changedFields, allFields);
  },
  mapPropsToFields(props) {
    const { settings: { fields } } = props;
    if(fields){
      return fields.reduce((formFields, field) => {
        const formData = props.fields;
        const fieldData = formData ? formData[field.key] : null;
        formFields[field.key] = Form.createFormField({
          ...fieldData,
          value: fieldData ? fieldData.value : undefined,
        });
        return formFields;
      }, {});
    }
  },
  onValuesChange(props, changedValues, allValues) {
    props.onValuesChange && props.onValuesChange(changedValues, allValues);
  },
})(forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({
    form: props.form,
  }));

  const { settings: { props: fromProps, fields }, render, children, onSubmit } = props;

  if (!fields || !fields.length) {
    return null;
  }
  const keyArgs = {};
  const FieldInstances = {};
  const batchKeys = {};
  let currentBatchNumber = -1;
  const FormFieldsGetter = {};
  const totalKey = {};

  Object.defineProperty(FormFieldsGetter, 'undefined', {
    get: function(){
      console.error(`Key not match in render params: <DynamicForm render={[({key}, fields) => Component ]} />`)
      return null;
    }
  });
  fields.forEach(field => {
    const key = field.key;
    if(key in totalKey){
      console.error(`Duplicate Key '${key}' props settings, <Dynamic settings={settings} />`)
      return;
    }
    totalKey[key] = true;
    FieldInstances[key] = renderField(field, props);
    keyArgs[key] = key;
    Object.defineProperty(FormFieldsGetter, key, {
      get: function () {
        if (!batchKeys[currentBatchNumber]) {
          batchKeys[currentBatchNumber] = [];
        }
        batchKeys[currentBatchNumber].push(key);
        return FieldInstances[key];
      }
    });
  });

  const interceptors = (Array.isArray(render) ? render : [render]).filter(child => typeof child === 'function');
  const CustomItems = interceptors && interceptors.length ? interceptors.map((interceptor, index) => {
    currentBatchNumber = index;
    const customs = interceptor(keyArgs, FormFieldsGetter);
    if(!customs){
      console.error(`Should return Component: <DynamicForm render={[({key}, fields) => Component]} />`);
      return null;
    }
    return React.cloneElement(customs, {key: `batch_${index}`});
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
    const { key, props } = field;
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
    return <Form.Item {...props} key={key}>{FieldInstances[key]}</Form.Item>;
  });
  return (
    <Form {...fromProps} onSubmit={onSubmit}>{formItems}{children}</Form>
  );
}));