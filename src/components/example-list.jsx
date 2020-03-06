import React from 'react';
import { Menu } from 'antd';

const { SubMenu } = Menu;

export default class Sider extends React.Component {
  onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    console.log('click ', { item, key, keyPath, selectedKeys, domEvent });
    this.props.onSelect && this.props.onSelect(key);
  };

  render() {
    const {datas} = this.props;

    return (
      <Menu
        onSelect={this.onSelect}
        style={{ height:'100%', width: '100%', textAlign:'left' }}
        defaultSelectedKeys={['README']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        // theme="dark"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <span>rc-dynamic-form</span>
            </span>
          }
        >
          {
            datas.map(item => <Menu.ItemGroup key={item.label} title={item.label}>
              {
                item.menus.map(m => <Menu.Item key={m.label}>{m.name}&nbsp;{m.label}</Menu.Item>)
              }
            </Menu.ItemGroup>)
          }
        </SubMenu>
      </Menu>
    );
  }
}