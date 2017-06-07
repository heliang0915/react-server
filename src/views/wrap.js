/**
 * Created by Administrator on 2017/5/27 0027.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';
import IndexView from '../views/indexview';


class Wrap extends Component{
    render(){
        return (
            <div>
                <h2>Index</h2>
                <Link to="/index">Index </Link>
                <Link to="/upload"> upload</Link>
                <Link to="/model"> model</Link>
                <hr/>
                {this.props.children}
            </div>
        )
    }
}

export  default Wrap;