/**
 * Created by hotread on 2017/6/8.
 */

import fetch from 'isomorphic-fetch';
let apiURl="https://api.github.com";

//转发请求
export default function(url){
    // url=apiURl+url;
    if(url.indexOf("/api/")>-1){
        let urlReg=/(\/\w+)/;
        let  query="";
        let pathName="";
        let queryStr="";
        if(url.indexOf('?')==-1){
            url=url.replace(urlReg,'');
            url=apiURl+url;
        }else{
            query=url.split('?');
            pathName=query[0];
            queryStr=query[1]==undefined?"":query[1];
            pathName=pathName.replace(urlReg,'');
            url=apiURl+pathName+"?"+queryStr;
        }
    }

    console.log("代理后的url地址%s",'color: #bada55;',url)
    console.log("%c我是红色！！！","color:red");


    return fetch(url).then((res)=>res.json()).then((data)=>{
        return {
            data,
            err:null
        }
        return data;
    }).catch((err)=>{
        return {
            data:null,
            err:err
        }
    });
}