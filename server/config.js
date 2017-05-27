let env=process.env.NODE_ENV||"development";
let config={
    development:{
        port:"",
        api:"",
        
        
    },
    production:{
        
    }
};

export default config[env];