import React from 'react';
import { Menu } from 'antd';
import { Select } from 'antd';

const { Option } = Select;
const { SubMenu } = Menu;

export default class Sider extends React.Component {

  state = {
    lib: '__',
    allBlocks: [],
    antd: [],
    icework: []
  }

  handleChange = (lib) => {
    this.setState({
      lib
    })
  }

  componentWillReceiveProps(nextProps) {
    const { antd = {  }, icework = {  } } = nextProps.datas;

    const allBlocks = (antd.blocks || []).concat((icework.blocks||[]));
    this.setState({
      allBlocks,
      antd: antd.blocks,
      icework: icework.blocks
    })
  }
  render() {
    const { allBlocks, antd, icework, lib } = this.state;

    const dataMap = {
      antd,
      icework,
      __: allBlocks
    }

    const datas = dataMap[lib] || dataMap['__'];
    return (
      <Menu
        onSelect={this.props.onSelect}
        style={{ height: '100%', width: '100%', textAlign: 'left' }}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          className="store-left-menu"
          style={{ height: '100%', width: '100%', textAlign: 'left' }}
        >
          <Select defaultValue={lib} style={{ width: '80%' }} 
          suffixIcon={`共${datas.length}项`}
          onChange={this.handleChange}>
            <Option value="__">所有</Option>
            {antd && antd.length ? <Option value="antd">Antd</Option> : null}
            {icework && icework.length ? <Option value="icework">飞冰</Option> : null}
          </Select>
          {
            datas ? datas.map(item => <Menu.Item key={item.__lib__ + '|'+item.name}>{item.title}</Menu.Item>) : null
          }
        </SubMenu>
      </Menu>
    );
  }
}