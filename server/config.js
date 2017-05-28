let env=process.env.NODE_ENV||"development";
let cacheTime=24*60*60*60*1000;

let config={
    development:{
        port:4000
    },
    production:{

    }
};

let conf= config[env];
export {conf,env,cacheTime};
