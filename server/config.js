let env=process.env.NODE_ENV||"development";
let config={
    development:{
        port:"",
        api:""
    },
    production:{
        
    }
};

let conf= config[env];
export {conf,env};
