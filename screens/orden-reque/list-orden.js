import React,{PureComponent} from "react";
import { Contex } from "../../components/global/globalContex";
import { TouchableOpacity, VirtualizedList } from "react-native";

class ListaOrden extends PureComponent{
    static contextType = Contex
    constructor(props){
        super(props);
        this.state = {
            data:[]

        }
    }
    componentDidMount(){
        const{data} = this.props
        this.setState({data:data})
    }
    renderItem({item}){
        return(
            <TouchableOpacity>
                <Text>{item.codigo}</Text>
            </TouchableOpacity>
        )
    }
    
    render(){
        return(
           <VirtualizedList
           data={this.state.data}
           keyExtractor={(item)=>item.id.toString()}
           renderItem={this.renderItem}
           getItemCount={()=>this.state.data.length}
           getItem={(data,index)=>data[index]}
           />
        );
    }
}
export default ListaOrden