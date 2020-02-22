import React from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

const datas = [{
  label: '通用',
  menus: [{
    name: 'Button',
    label: '按钮'
  },
  {
    name: 'Icon',
    label: '图标'
  },
  {
    name: 'Typography',
    label: '排版'
  }]
}, {
  label: '数据录入',
  menus: [{
    name: 'Form',
    label: '表单'
  }]
}];

export default class Sider extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ height:'100%', width: '100%', textAlign:'left' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>Ant Design</span>
            </span>
          }
        >
          {
            datas.map(item => <Menu.ItemGroup key={item.label} title={item.label}>
              {
                item.menus.map(m => <Menu.Item key={m.name}>{m.name}&nbsp;{m.label}</Menu.Item>)
              }
            </Menu.ItemGroup>)
          }
        </SubMenu>
      </Menu>
    );
  }
}