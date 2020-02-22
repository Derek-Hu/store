import React from 'react';
import './App.css';
import SelectPannel from './components/select-pannel.jsx';
import Graph from './components/graph.jsx';
import IFrame from './components/iframe';

import { Layout } from 'antd';

const { Header, Content, Sider } = Layout;

const App = () => {
  return (
    <Layout style={{height: '100vh'}}>
      <Header>Header</Header>
      <Layout >
        <Sider><SelectPannel></SelectPannel></Sider>
        <Content style={{background: '#fff'}}><Graph></Graph></Content>
        <Sider width={500}><IFrame></IFrame></Sider>
      </Layout>
    </Layout>
  );
}

export default App;
