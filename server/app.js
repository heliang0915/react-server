import express from 'express';
import  path from 'path';
import debug from 'morgan';
import  cookieParser from 'cookie-parser';
import  bodyParser from 'body-parser';
import {env,cacheTime} from './config';
import index from './router/index';


let App=express();
App.use(debug('dev'));
App.use(cookieParser());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended:false}));
App.use((req,res,next)=>{
    res.setHeader("Cache-control","max-age:"+cacheTime);
    next();
})

App.use("/",index);

// App.use(express.static(path.join(__dirname,"/../assets/")));
// App.use(express.static(path.join(__dirname,"/../assets"))

if(env!="development"){
    App.use(express.static(path.join(__dirname,"/../../"+env)));
    console.log("生产状态：静态目录地址==="+path.join(__dirname,"/../../"+env));
}else{
    App.use(express.static(path.join(__dirname,"/../build/"+env)));
    console.log("开发状态：静态目录地址==="+path.join(__dirname,"/../build/"+env));
}

// App.use(express.static(path.join(__dirname,"/nodeServer")));

export default App;




