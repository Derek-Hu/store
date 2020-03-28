import React from 'react';
import { Menu } from 'antd';
import { Select } from 'antd';
import { Libs } from '../service/index';
import styles from './store.module.less';

const { Option } = Select;
const { SubMenu } = Menu;
const allKey = '__';
const optionCountStyle = {
  float: 'right',
  color: 'rgba(0, 0, 0, 0.25)',
  fontSize: '14px'
}
export default class Sider extends React.Component {

  state = {
    datas: {},
    lib: allKey,
    counts: {
      [allKey]: 0
    }
  }

  handleChange = (lib) => {
    this.setState({
      lib
    })
  }

  componentWillReceiveProps(nextProps) {
    const counts = {};
    const allBlocks = Object.keys(nextProps.datas).reduce((total, item) => {
      // debugger;
      counts[item] = nextProps.datas[item] ? nextProps.datas[item].length : 0;
      return total.concat(nextProps.datas[item] || []);
    }, []);

    counts[allKey] = allBlocks.length;
    this.setState({
      datas: {
        ...nextProps.datas,
        [allKey]: allBlocks,
      },
      counts
    })
  }
  render() {
    const { lib, datas, counts } = this.state;

    const items = datas[lib]? datas[lib] : [];
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
            padding: '0.5em 1em',
            position: 'absolute'
          }}
          suffixIcon={`共${items.length}项`}
          onChange={this.handleChange}>
          <Option value={allKey}>所有<span style={optionCountStyle}>{counts[allKey]}</span></Option>
          {
            Libs.map(lib => <Option key={lib.key} value={lib.key}>{lib.label}<span style={optionCountStyle}>共{counts[lib.key]}项</span></Option>)
          }
        </Select>
        <SubMenu
          key="sub1"
          className="store-left-menu"
          style={{ height: '100%', width: '100%', textAlign: 'left', paddingTop: '46px'}}
        >
          {
            items ? items.map(item => <Menu.Item key={item.__id__}>{item.title}</Menu.Item>) : null
          }
        </SubMenu>
      </Menu>
    );
  }
}