import React from 'react';
import './App.css';
import StoreComponents from './pages/StoreComponents';
import { Layout, Spin } from 'antd';
import { SEPERATOR } from './service/constant';
import { loadBlocks } from './service/index';

const { Header, Content, Sider } = Layout;

export default class Main extends React.Component {

  state = {
    datas: {},
    libName: 'antd',
  }
  onSelect = ({ key }) => {

    if (!key) {
      return;
    }
    const [libName, compKey] = key.split(SEPERATOR);
    this.setState({
      libName,
      compKey
    })
  }

  componentDidMount() {
    let datas = null;
    try {
      datas = JSON.parse(localStorage.getItem('store-data'));
      if (datas) {
        const key = Object.keys(datas).find(key => datas[key] && datas[key].length);
        if (!this.state.compKey) {
          this.setState({
            libName: key,
            compKey: 0
          });
        }
        this.setState({
          datas,
        });
      }
    } catch (e) {
      console.error(e);
    }
    const noCache = !datas;
    setTimeout(async () => {
      this.setState({
        loading: noCache
      });
      const datas = await loadBlocks();
      this.setState({
        datas,
        loading: false
      });
    }, 0)
  }
  render() {

    const { datas, libName, loading,
      compKey
    } = this.state;

    const selectedLib = datas[libName];
    const BlockItem = selectedLib ? selectedLib[compKey] : null;
    return <Spin delay={500} spinning={loading}>
      <Layout style={{ height: '100vh', background: '#fff' }}>
        {/* <Header style={{ background: '#fff', height: '48px' }}>
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
        </Header> */}
        <Layout>
          <Sider><StoreComponents datas={datas} onSelect={this.onSelect} /></Sider>
          {
            <Content className="elements-container" style={{ width: '60%', background: '#fff' }}>{
              // BlockItem ? <img style={{maxWidth: '100%', maxHeight:'100%'}} src={BlockItem.screenshot} /> : null
              BlockItem ? <iframe style={{ border: 0, width: '100%', height: '100%' }} src={BlockItem.homepage} /> : null
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
    </Spin>;
  }
}