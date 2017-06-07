import React,{Component} from 'react';
import Model from "../components/model/model";
/**
 * Created by hotread on 2017/6/7.
 */
class ModelContainer extends Component{
    state={
        show:false,
        height:300,
        width:300
    }

    render(){
        return (
             <div>
                 <button  onClick={this.toggle.bind(this)}>改变</button>
                 <Model onChange={this.toggle.bind(this)} {...this.state} />
             </div>
        )
    }

    toggle(){
        this.setState({
            show:!this.state.show
        })

    }
}

export default ModelContainer;