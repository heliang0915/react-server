/**
 * @author: heliang
 * @date: 2017/2/3
 */
import {FETCH_INDEX,RECEIVE_INDEX} from '../../actions/actionTypes';
let initState={
    data:[],
    loaded:'loading'
};

function fetchData(state=initState,action){
    if(action.type==FETCH_INDEX){
       return state;
    }else if(action.type==RECEIVE_INDEX){
        return Object.assign({},state,{
            data:action.data,
            loaded:'loaded'
        })
    }else {
        return state;
    }
}

export {fetchData};

