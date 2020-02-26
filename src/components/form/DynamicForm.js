import React from 'react';
import { Form } from 'antd';

class Graph extends React.Component {

  renderField = (field) => {
    const { getFieldDecorator } = this.props.form;
    const { key, props, component, decorator } = field;
    const [Component, componentProps] = Array.isArray(component) ? component : [component]
    return <Form.Item {...props} key={key}>
      {getFieldDecorator(key, decorator)(<Component {...componentProps} />)}
    </Form.Item>;
  }

  render() {
    const { settings: { props, fields }, render, children } = this.props;
    if (!fields || !fields.length) {
      return;
    }
    const keyArgs = {};
    const totalKey = fields.reduce((keys, field) => {
      keys[field.key] = true;
      keyArgs[field.key] = field.key;
      return keys;
    }, {});
    const keys = Object.keys(totalKey);
    const FieldInstances = fields.reduce((instances, field) => {
      instances[field.key] = this.renderField(field);
      return instances;
    }, {});
    
    const batchKeys = {};
    let currentBatchNumber = -1;
    const FormFieldsGetter = {};

    keys.forEach((key)=>{
      Object.defineProperty(FormFieldsGetter, key, {
        get: function(){
          if(!(key in totalKey)){
            return null;
          }
          if (!batchKeys[currentBatchNumber]) {
            batchKeys[currentBatchNumber] = [];
          }
          batchKeys[currentBatchNumber].push(key);
          return FieldInstances[key];
        }
      });
    })

    const interceptors = render ? render.filter(child => typeof child === 'function') : null;

    const CustomItems = interceptors ? interceptors.map((interceptor, index) => {
      currentBatchNumber = index;
      return interceptor(keyArgs, FormFieldsGetter);
    }) : null;

    const batchKeyGraph = Object.keys(batchKeys).reduce((graph, batchIndex)=> {
      const batch = batchKeys[batchIndex];
      graph[batch[0]] = { index: batchIndex, args: batch };
      return graph;
    }, {});

    const formItems = keys.map((key) => {
      if(!totalKey[key]) { 
        return;
      }
      if ((key in batchKeyGraph)) {
        batchKeyGraph[key].args.forEach(batchKey => {
          totalKey[batchKey] = false;
        });
        return CustomItems[batchKeyGraph[key].index];
      }
      return FieldInstances[key];
    });
    return (
      <Form {...props}>{formItems}{children}</Form>
    );
  }
}

export default Form.create()(Graph);