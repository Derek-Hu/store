import React from 'react';
import { Menu } from 'antd';
import { Select } from 'antd';
import { Libs } from '../service/index';
import styles from './store.module.less';

const { Option } = Select;
const { SubMenu } = Menu;

export default class Sider extends React.Component {

  state = {
    datas: {},
    lib: '__',
    allBlocks: [],
  }

  handleChange = (lib) => {
    this.setState({
      lib
    })
  }

  componentWillReceiveProps(nextProps) {
    const allBlocks = Object.keys(nextProps.datas).reduce((total, item) => {
      return total.concat(nextProps.datas[item].blocks || []);
    }, []);
    this.setState({
      datas: nextProps.datas,
      allBlocks,
    })
  }
  render() {
    const { allBlocks, lib, datas } = this.state;

    const items = datas[lib] && datas[lib].blocks ? datas[lib].blocks : allBlocks;
    return (
      <Menu
        className={styles.root}
        onSelect={this.props.onSelect}
        style={{ height: '100%', width: '100%', textAlign: 'left' }}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Select defaultValue={lib}
          style={{
            width: '100%',
            padding: '0.5em 1em'
          }}
          suffixIcon={`共${items.length}项`}
          onChange={this.handleChange}>
          <Option value="__">所有</Option>
          {
            Libs.map(lib => <Option key={lib.key} value={lib.key}>{lib.label}</Option>)
          }
        </Select>
        <SubMenu
          key="sub1"
          className="store-left-menu"
          style={{ height: '100%', width: '100%', textAlign: 'left' }}
        >
          {
            items ? items.map(item => <Menu.Item key={item.__lib__ + '|' + item.name}>{item.title}</Menu.Item>) : null
          }
        </SubMenu>
      </Menu>
    );
  }
}