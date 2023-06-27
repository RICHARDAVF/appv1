import React,{PureComponent} from "react";
import { View ,Text} from "react-native";
class AprobacionOrden extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    render(){
        return(
            <View>
                <Text>LISTADO DE ORDEN DE REQUERIMIENTO</Text>
            </View>
        )
    }
}

export default AprobacionOrden