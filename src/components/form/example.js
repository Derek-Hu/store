import React from 'react';
import DynamicForm from 'src/components/form/DynamicForm';
import settings from './settings';
import { Row, Col } from 'antd';

export default class Example extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <div>
        <DynamicForm settings={settings} render={[({ from, to }, fields) => <Row>
          <Col span={18} push={6}>
            {fields[from]}
          </Col>
          <Col span={6} pull={18}>
            {fields[to]}
          </Col>
        </Row>, ({ from, day }, fields) => <Row>
          <Col span={18} push={6}>
            {fields[from]}
          </Col>
          <Col span={6} pull={18}>
            {fields[day]}
          </Col>
        </Row>]}>
          <div>sss</div>
        </DynamicForm>
      </div>
    );
  }
}