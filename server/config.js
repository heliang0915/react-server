let env=process.env.NODE_ENV||"development";
let cacheTime=24*60*60*60*1000;
//全局模板文件
let templateName="template";

let config={
    development:{
        port:4000
    },
    production:{
        port:5000
    }
};

let conf= config[env];
export {conf,env,cacheTime,templateName};
