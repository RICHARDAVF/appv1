import { Component } from "react";
import { View,Text,TouchableOpacity } from "react-native";
class EventAprobacion extends Component{
    constructor(props){
        super(props);
        this.item = this.props.item
    }
    render(){
        return(
            <View style={{ borderWidth: 1 }} key={this.item.id}>
                <Text>PEDIDO: {this.item.codigo_pedido}</Text>
                <Text>CLIENTE: {this.item.cliente}</Text>
                <Text>FECHA: {this.item.fecha}</Text>
                <Text>IGV: {this.item.igv}</Text>
                <Text>Total: {this.item.total}</Text>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                    <TouchableOpacity style={{ backgroundColor: 'cyan' }}>
                        <Text>Apro .1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: 'cyan', marginLeft: 10 }}>
                        <Text>Apro .2</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default EventAprobacion;