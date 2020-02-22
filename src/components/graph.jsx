import React from 'react';
import './graph.less';
import ButtonExample from 'src/vendors/ant-design/button/index.js'

export default class Graph extends React.Component {

  render() {
    return (
      <div className="components-button-demo-" style={{padding: '1em', borderRight: '1px solid #ddd'}}>
        <ButtonExample></ButtonExample>
      </div>
    );
  }
}