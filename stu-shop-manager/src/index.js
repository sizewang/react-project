// 入口文件

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import {mainRoutes} from "./routes"
import "antd/dist/antd.css";

ReactDOM.render(
    // 把创建好的redux的数据放在了整个应用里面
<Provider store={store}>
<Router>
    <Switch>
        <Route path="/admin" render={routeProps=><App {...routeProps}/>}/>
        {mainRoutes.map(route=>{
            return <Route key={route.path} {...route} />
        })}
        <Redirect to="/admin" from="/"/>
        <Redirect to="/404"/>
    </Switch>
</Router> 
</Provider>,
document.getElementById('root')
);


