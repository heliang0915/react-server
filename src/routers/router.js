/**
 * 定义所有路由映射
 * @author: heliang
 * @date: 2017/1/25
 */
import React,{Component} from 'react';
import {Router,browserHistory} from 'react-router';
import routes from './routes';

class RootRouter extends  Component{
    render(){
        return (
            <Router history={browserHistory}>
                {routes}
            </Router>
        )
    }
}
export  default RootRouter;
