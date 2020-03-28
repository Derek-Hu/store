import React from 'react';
import './App.css';
import StoreComponents from './pages/StoreComponents';
import { Menu, Icon, Layout, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { loadBlocks } from './service/index';

const { Header, Content, Sider } = Layout;

export default class Main extends React.Component {

  state = {
    selectedKey: '内联登录栏',
    datas: {},
    libName: 'antd',
  }
  onSelect = ({key}) => {

    console.log(typeof key, key);
    debugger;
    if(!key){
      return;
    }
    const [libName, compKey] = key.split('|');
    this.setState({
      libName,
      compKey
    })
  }

  componentDidMount() {
    try {
      const datas = JSON.parse(localStorage.getItem('store-data'));
      this.setState({ datas });
    } catch (e) {
      console.error(e);
    }
    setTimeout(async () => {
      const datas = await loadBlocks();
      this.setState({ datas });
    }, 1000)
  }
  render() {

    const { datas, libName,
      compKey
    } = this.state;

    const { antd,
      icework } = datas;

    const BlockMap = {
      antd,
      icework
    }
    const selectedLib = BlockMap[libName] ;
    const BlockItem = selectedLib&& selectedLib.blocks? selectedLib.blocks.find(element => element.name === compKey): null;

    return (
      <Layout style={{ height: '100vh', background: '#fff' }}>
        <Header style={{ background: '#fff', height: '48px' }}>
          <Menu mode="horizontal">
            <Menu.Item key="alipay">
              <a href="https://github.com/Derek-Hu/rc-form-dynamic" target="_blank" rel="noopener noreferrer">
                <Icon type="github" />
                Github
              </a>
            </Menu.Item>
            <Menu.Item key="project">
              <Link to="/project">
                <Icon type="github" />
                代码
              </Link>
            </Menu.Item>
            <Menu.Item key="store">
              <Link to="/">
                <Icon type="github" />
                物料库
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider><StoreComponents datas={datas} onSelect={this.onSelect} /></Sider>
          {
            <Content className="elements-container" style={{ width: '60%', background: '#fff' }}>{
              BlockItem ? <img src={BlockItem.screenshot} /> : null
            }</Content>
          }
          {/* 
          {
            Component ? <Layout style={{ width: '40%', padding: '1em 2em', background: '#FFF' }}>
              <Content style={{ background: '#fff' }} ><Component /></Content>
            </Layout> : null
          } */}

        </Layout>
      </Layout>
    );
  }
}