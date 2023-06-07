import React,{Component} from "react";
import { FlatList } from "react-native";
import { Contex } from "../../components/global/globalContex";
import EventAprobacion from "./event-aprobacion";
class ListAprobacion extends Component{
    static contextType = Contex
    constructor(props){
        super(props);
        this.data= this.props.data
    }
    renderStatus({item}){
        
        return <EventAprobacion item={item}/>;
        
    }
    render(){
       
        return (<FlatList
                data={this.data}
                keyExtractor={item=>item.id}
                renderItem={this.renderStatus}
                
                style={{backgroundColor:'#e0ffff'}}
                
                />
        )
    }
}
export default ListAprobacion;