import React from 'react';
import './App.css';
import SelectPannel from './components/select-pannel.jsx';
import Graph from './components/graph.jsx';
import IFrame from './components/iframe';
import Desktop from './components/desktop';
import { Menu, Icon } from 'antd';
import { Layout, Switch } from 'antd';

const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;
const App = () => {
  return (
    <Layout style={{ height: '100vh', background: '#fff' }}>
      <Header style={{background: '#fff', height: '48px'}}>
        <Menu mode="horizontal">
          <Menu.Item key="mail">
            <Icon type="mail" />
            开启Preview视图
        </Menu.Item>
          <Menu.Item key="app" disabled>
            <Icon type="appstore" />
            Navigation Two
        </Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Icon type="setting" />
                Navigation Three - Submenu
            </span>
            }
          >
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="alipay">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Navigation Four - Link
          </a>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout >
        <Sider><SelectPannel></SelectPannel></Sider>
        <Content style={{ background: '#fff' }}><Graph></Graph></Content>
        <Layout style={{width: '50%'}}>
          <Content style={{ background: '#fff'}} ><Desktop></Desktop></Content>
        </Layout>
        {
          false? <Sider width={500}><IFrame></IFrame></Sider>: null
        }
      </Layout>
    </Layout>
  );
}

export default App;
