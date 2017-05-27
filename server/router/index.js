import express  from 'express';
import RouterMap from '../../src/RouterMap';
let router=express.Router();

RouterMap.map((item)=>{
    router.route(item.path).all((req,res)=>{
        res.send(item.name);
    })
})

export default router;