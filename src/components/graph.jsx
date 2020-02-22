import React from 'react';
import { Button } from 'antd';
import './graph.less';
import ButtonExample from 'src/vendors/ant-design/button/index.js'

export default class Graph extends React.Component {

  render() {
    return (
      <div id="components-button-demo-" style={{padding: '1em'}}>
        <ButtonExample></ButtonExample>
      </div>
    );
  }
}