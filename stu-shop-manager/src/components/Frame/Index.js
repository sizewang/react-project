import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Avatar, message, Badge } from 'antd';
import {connect} from 'react-redux';
import logo from './logo.jpg';
import { adminRoutes } from '../../routes';
import './frame.css';
import { clearToken } from '../../utils/auth'



const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter(route => route.isShow)




function Index(props) {
  console.log(props)
  const popMenu = (
    <Menu onClick={(p)=>{
      if(p.key == 'logOut'){
        clearToken();
        props.history.push('/login');
      }else{
        // message.info(p.key)
        if((p.key = "noti")){
          props.history.push("/admin/notices");
        }
      }
    }}>
      <Menu.Item key="noti 通知中心信息">通知中心</Menu.Item>
      <Menu.Item key="setting 设置信息">设置</Menu.Item>
      <Menu.Item key="logOut">退出</Menu.Item>
    </Menu>
  )
  return (
    <Layout>
      <Header className="header" style={{
        backgroundColor: 'white'
      }}>
        <div className="logo">
          <img src={logo} alt="logo" style={{ marginTop: '-30px' }} />
        </div>
        <Dropdown overlay={popMenu}>
          <div>
            <Avatar>U</Avatar>
            {/* 全部已读时红点消失 */}
            <Badge dot={!props.isAllRead}>
              <span style={{color:'skyblue'}}>超级管理员</span>
            </Badge>
            
            <Icon type="down" />
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {routes.map(route => {
              return (<Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>
                <Icon type={route.icon} />
                {route.title}
              </Menu.Item>)
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: '16px' }}>
          <Content
            className="site-layout-background"
            style={{
              background:'#fff',
              // padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = state => state.notice

export default connect(mapStateToProps)(withRouter(Index));
