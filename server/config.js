let env=process.env.NODE_ENV||"development";
console.log(process.env.NODE_ENV);
let cacheTime=24*60*60*60*1000;

let config={
    development:{
        port:4000
    },
    production:{
        port:5000
    }
};

let conf= config[env];
export {conf,env,cacheTime};
