// 主页面

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { adminRoutes } from './routes';
import Frame from './components/Frame/Index';
import { isLogined } from './utils/auth';
import './App.css';

function App() {
  // 登录判断isLogined() 登录后进入相应页面或者跳转到登录页面
  return isLogined() ? ( 
    <Frame>
      <Switch>
        {/* 使用map循环把路由取出来 在App组件中展示  所有admin对应的路由访问地址 都会在App组件内部进行展示*/}
        {adminRoutes.map(route=>{
          // exact是否完全匹配
          return <Route 
          key={route.path}
           path={route.path} 
           exact={route.exact} 
           render={
            routeProps=>{
              return <route.component {...routeProps} />
            }
          } />
        })}

        {/* 路由默认地址处理 */}
        <Redirect to={adminRoutes[0].path } from="/admin"/>
        {/* 页面重定向 admin找不到页面时跳转到404 */}
        <Redirect to="/404"/>
      </Switch>
    </Frame>
    ) : (
      <Redirect to="/login" />
    );
}

export default App;
