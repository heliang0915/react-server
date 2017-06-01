import express  from 'express';
import  React from 'react';
import {match,RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import getStoreConfig from '../../src/redux/store/store'
import routes from '../../src/routers/routes';
import helper from '../helper';
import {env} from '../config';

import RouterMap from '../../src/RouterMap';

let router=express.Router();

RouterMap.map((item)=>{
    router.route(item.path).all((req,res)=>{
        match({routes,location:req.originalUrl},(err,redirectLocation,renderPorps)=>{
            if(err){
                res.status(500).end(`Internal Server Error ${err}`);
            }else if(redirectLocation){
                res.redirect(redirectLocation.pathname + redirectLocation.search);
            }else if(renderPorps){
                let store=getStoreConfig();
                let title=env=="development"?"开发":"生产";
                // Promise.all([store.dispatch(fetchIndex())]).then(()=>{
                    let html=renderToString(<Provider store={store}><RouterContext {...renderPorps} /></Provider>);
                    let initialState=store.getState();
                    helper.getHTMLFormTemplate("index",{
                        body:html,
                        initialState:JSON.stringify(initialState),
                        title:title
                    },(err,page)=>{
                        // console.log(err);
                        res.send(page);
                    })
                // })
            }else{
                res.send("404");
            }
        })

    })
})



router.route('/uploadFile').all((req,res)=>{
    let json={pic:'//img13.360buyimg.com/n1/g13/M04/11/0C/rBEhUlLTSwkIAAAAAAGhELKHr2sAAH3BwEuo-wAAaEo805.jpg'}
   res.send(json)
})

export default router;