/**
 * 上传组件
 * onSuccess 回调后返回数据
 *
 */

import React,{Component} from  'react';
import PropTypes from 'prop-types';

class Upload extends Component{
    restForm(e){
        this.refs.fileForm.reset();
        var pre=e.target.contentWindow.document.querySelector('pre');
        if(pre){
            var json=pre.innerHTML;
            let {onSuccess} =this.props;
            onSuccess(json)
            console.log(json);
        }
    }
    triggerUpload(fileId){
        this.refs[fileId].click();
    }
    uploadForm(){
        let url="/uploadFile/";
        this.refs.fileForm.action=url;
        console.log('正在上传...');
        this.refs.fileForm.submit();
    }
    render(){
        let prefix=this.props.prefix||'';
        return(
            <div>
                <iframe style={{display:'none'}} id={"uploadIframe"+prefix} name={"uploadIframe"+prefix} frameBorder="0" onLoad={this.restForm.bind(this)}></iframe>
                <form ref="fileForm"  target={"uploadIframe"+prefix} style={{position:'relative'}}>
                    <button onClick={this.triggerUpload.bind(this,"file"+prefix)}>上传按钮</button>
                    <input type="file" onChange={this.uploadForm.bind(this)}  ref={"file"+prefix} style={{display:'none'}}/>
                </form>
            </div>
        )
    }
}

Upload.propTypes={
    onSuccess:PropTypes.func.isRequired
}

export default Upload;
