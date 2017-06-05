/**
 * APP挂载入口文件 此文件中只引入 router
 * @author: heliang
 * @date: 2017/1/25
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import RootRouter from './routers/router';
import getStoreConfig from './redux/store/store';
import {match,RouterContext} from 'react-router';

// class App extends Component{
//     render(){
//         let initialState=window.__INITIAL_STATE;
//         let store=getStoreConfig(initialState);
//         return(
//             <Provider store={store}>
//                 <RootRouter />
//             </Provider>
//         )
//     }
// }
// let app=document.getElementById("app")
// render(<App />,app)



import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router} from 'react-router';
import routes from './routers/routes';

const app = document.getElementById('app');
let initialState=window.__INITIAL_STATE;
let store=getStoreConfig(initialState);
let history = createBrowserHistory();
let location = history.createLocation(window.location.pathname + window.location.search);

match({ location, history, routes }, (error, redirectLocation, renderProps) => {
    render(
        <Provider store={store}>
            <Router history={history} {...renderProps} />
        </Provider>,
        app
    )
});

