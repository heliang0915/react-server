/*
* react渲染服务器
* */
import express from 'express';
import  path from 'path';
import debug from 'morgan';
import  cookieParser from 'cookie-parser';
import  bodyParser from 'body-parser';
import {env,cacheTime} from './config';
import api from './router/api';
import index from './router/index';
let compression=require("compression");

let app=express();
app.use(compression());
app.use(debug('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    let date=new Date();
    date.setTime(date.getTime()+cacheTime);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-control","max-age:"+cacheTime);
    res.header("Expires",date.toUTCString());
    next();
})

app.use("/api/",api)
app.use("/",index);
app.use(express.static(path.join(__dirname,"/../assets/")));

if(env!="development"){
    app.use(express.static(path.join(__dirname,"/../build/"+env)));
    app.use(express.static(path.join(__dirname,"/../build/server")));
    console.log("生产状态：静态目录地址==="+path.join(__dirname,"/../build/"+env));
}else{
    app.use(express.static(path.join(__dirname,"/../build/"+env)));
    console.log("开发状态：静态目录地址==="+path.join(__dirname,"/../build/"+env));
}
export default app;




