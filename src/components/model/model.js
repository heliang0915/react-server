/**
 * Created by hotread on 2017/6/7.
 */

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/model';

class Model extends Component{

    render(){
        return (
            <div onClick={this.changeState.bind(this)} className="model-box" style={{width:this.props.width,height:this.props.height, display:this.props.show?'block':'none'}}>
                    BOX
            </div>
        )
    }

    changeState(){
        this.props.onChange(!this.props.show)
    }
}


Model.propTypes={
    width:PropTypes.number.isRequired,
    height:PropTypes.number.isRequired,
    show:PropTypes.bool.isRequired
}


export default Model;