/**
 * Created by Administrator on 2017/5/27 0027.
 */

import  React from 'react';
import  {Route} from 'react-router';
import Wrap from '../views/wrap';
import IndexView from '../views/indexview';
const routes=(
    <Route path="/" component={Wrap}>
        <Route path="/index" component={IndexView}/>
    </Route>
)
export default  routes;