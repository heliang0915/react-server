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
            }else if(redirectLocation){

            }else if(renderPorps){
                let store=getStoreConfig();
                let initialState=store.getState();
                let title=env=="development"?"开发":"生产"
                let html=renderToString(<Provider store={store}><RouterContext {...renderPorps} /></Provider>);
                helper.getHTMLFormTemplate("index",{
                    body:html,
                    initialState:JSON.stringify(initialState),
                    title:title
                },(err,page)=>{
                    // console.log(err);
                    res.send(page);
                })
            }else{
                res.send("404");
            }
        })

    })
})

export default router;