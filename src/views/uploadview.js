/**
 * Created by hotread on 2017/6/1.
 */

import React,{Component} from 'react';
import Upload from '../components/upload/Upload';
class UploadView extends Component{
    state={
        pic:''
    }
    changePic(json){
        json=JSON.parse(json);
        this.setState({
            pic:json.pic
        });
    }
    render(){
        return(
            <div>
                <Upload onSuccess={this.changePic.bind(this)}/>
                <img src={this.state.pic} alt=""/>
            </div>
        )
    }

}



export default UploadView;