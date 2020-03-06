import React from 'react';
import './App.css';
import ExampleList from './components/example-list';
import CodeView from './components/codeview.jsx';
import { Menu, Icon, Layout } from 'antd';
import codegen from 'babel-plugin-codegen/macro'

import BasicExample from './components/form/example/basic';
import CascadeExample from './components/form/example/cascade';
import CustomExample from './components/form/example/custom';
import DynamicRuleExample from './components/form/example/dynamicRule';
import LayoutExample from './components/form/example/layout';
import LoginExample from './components/form/example/login';
import ModalExample from './components/form/example/modal';
import RegisterExample from './components/form/example/register';
import SearchExample from './components/form/example/search';
import TimeExample from './components/form/example/time';

import Markdown from 'react-markdown';

const datas = [
//   {
//   label: '文档',
//   menus: [{
//     label: 'README',
//     language: 'markdown',
//     source: codegen.require('./transform/readPath', 'README.md')
//   }],
// }, 
{
  label: '通用',
  menus: [{
    label: '内联登录栏',
    Component: BasicExample,
    source: codegen.require('./transform/readFileSync', 'basic')
  },
  {
    label: '登录框',
    Component: LoginExample,
    source: codegen.require('./transform/readFileSync', 'login')
  },
  {
    label: '注册新用户',
    Component: RegisterExample,
    source: codegen.require('./transform/readFileSync', 'register')
  },
  {
    label: '高级搜索',
    Component: SearchExample,
    source: codegen.require('./transform/readFileSync', 'search')
  },
  {
    label: '弹出层中表单',
    Component: ModalExample,
    source: codegen.require('./transform/readFileSync', 'modal')
  },
  {
    label: '时间类控件',
    Component: TimeExample,
    source: codegen.require('./transform/readFileSync', 'time')
  },
  {
    label: '自定义表单控件',
    Component: CustomExample,
    source: codegen.require('./transform/readFileSync', 'custom')
  },
  {
    label: '表单联动',
    Component: CascadeExample,
    source: codegen.require('./transform/readFileSync', 'cascade')
  },
  {
    label: '表单布局',
    Component: LayoutExample,
    source: codegen.require('./transform/readFileSync', 'layout')
  },
  {
    label: '动态校验规则',
    Component: DynamicRuleExample,
    source: codegen.require('./transform/readFileSync', 'dynamicRule')
  }]
}
// , {
//   label: '自定义渲染',
//   menus: [{
//     label: '表单'
//   }]
// }
];

const ComponentMap = datas.reduce((map, category) => {
  category.menus.forEach(m => {
    map[m.label] = m;
    ;
  });
  return map;
}, {});

const { Header, Content, Sider } = Layout;

export default class Main extends React.Component {

  state = {
    selectedKey: '内联登录栏'
  }
  onSelect = (selectedKey) => {
    this.setState({
      selectedKey
    })
  }
  render() {

    const { selectedKey } = this.state;
    const {source, language, Component} = ComponentMap[selectedKey];

    console.log(source);
    
    return (
      <Layout style={{ height: '100vh', background: '#fff' }}>
        <Header style={{ background: '#fff', height: '48px' }}>
          <Menu mode="horizontal">
            <Menu.Item key="alipay">
              <a href="https://www.npmjs.com/package/rc-form-dynamic" target="_blank" rel="noopener noreferrer">
                <Icon type="github" />
                Github
              </a>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout >
          <Sider><ExampleList datas={datas} onSelect={this.onSelect} /></Sider>
          {
            source ? <Content className="elements-container" style={{ width: '60%', background: '#fff' }}>{
              selectedKey==='README'? <Markdown source={source} /> : <CodeView code={source} language={language} />
            }</Content>: null
          }
          
          {
            Component ? <Layout style={{ width: '40%', padding: '1em 2em', background: '#FFF' }}>
            <Content style={{ background: '#fff' }} ><Component /></Content>
          </Layout> : null
          }
          
        </Layout>
      </Layout>
    );
  }
}