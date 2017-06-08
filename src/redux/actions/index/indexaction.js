/**
 * @author: heliang
 * @date: 2017/2/3
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');
import {FETCH_INDEX,RECEIVE_INDEX} from '../actionTypes';
import {conf} from '../../../../server/config';

let fetchType=()=>{
    return {
        type:FETCH_INDEX,
        data:""
    }
}

let receiveType=(data)=>{
    return {
        type:RECEIVE_INDEX,
        data:data
    }
}

//发送请求
function fetchIndex() {
    return (dispatch)=>{
        dispatch(fetchType());
        //ajax异步

       return fetch(`${conf.api}/users`).then((res)=>res.json()).then((json)=>{
            //成功后
            dispatch(receiveType(json.data))
        })
    }
}
export {fetchIndex}


