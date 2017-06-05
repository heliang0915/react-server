/**
 * Created by Administrator on 2017/5/27 0027.
 */
import  React from 'react';
import  {Route} from 'react-router';
import Wrap from '../views/wrap';
import RouterMap from '../routermaps';
import syncRoutes from './modules';

//加载动态路由
let getMethod=(method)=>syncRoutes[method];
//过滤路由映射对象
let mapRouter=RouterMap.filter((item)=>{
    return item.isSys;
})
//
let sysRouterList=mapRouter.map((item,index)=>{
    let method=getMethod(item.componentName);
    return <Route  key={index} path={item.path} getComponent={method} />
})

const routes=(
    <Route path="/" component={Wrap}>
        {sysRouterList}
    </Route>
)
export default  routes;