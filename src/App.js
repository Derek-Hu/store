import React from 'react';
import './App.css';
import SelectPannel from './components/select-pannel.jsx';
import Graph from './components/graph.jsx';
import IFrame from './components/iframe';
import Desktop from './components/desktop';
import { Menu, Icon } from 'antd';
import { Layout } from 'antd';

const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;
const App = () => {
  return (
    <Layout style={{ height: '100vh', background: '#fff' }}>
      <Header style={{background: '#fff', height: '48px'}}>
        <Menu mode="horizontal">
          <Menu.Item key="alipay">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              <Icon type="github" />
              Github
          </a>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout >
        <Sider><SelectPannel></SelectPannel></Sider>
        <Content className="elements-container" style={{ background: '#fff' }}><Graph></Graph></Content>
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
