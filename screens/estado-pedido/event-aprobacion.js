
import React, { Component } from "react";
import { View,Text,TouchableOpacity } from "react-native";
import { Contex } from "../../components/global/globalContex";
class EventAprobacion extends Component{
    static contextType = Contex
    constructor(props){
        super(props);
        this.item = this.props.item
        this.state ={
            aprobacion1 : null,
            aprobacion2 : null
        }

    }
    componentDidMount(){
        const {userLogged} = this.context
       
        this.setState({
            aprobacion1:userLogged.aprobacion1,
            aprobacion2:userLogged.aprobacion2
        })

    }
    aprobacion1(btn,codigo_pedido){
        const {dominio,cred,userLogged} = this.context;
        const url = `${dominio}/api/pedidos/state/././././`
        const response =  fetch(url,{
            method:'POST',
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({
                "credencial":cred,
                "user":userLogged,
                "aprobacion":btn,
                "codigo_pedido":codigo_pedido,
            })
        })
        const res =  response.json()
        console.log(res)
    }
    render(){
        try{
            return<View style={{borderWidth:1}}>
                    <>
                    <Text>CLIENTE: {this.item.cliente}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10}}>
                        <View>
                            <Text>PEDIDO: {this.item.codigo_pedido}</Text>
                            <Text>FECHA: {this.item.fecha}</Text>
                            <Text>IGV: {this.item.igv}</Text>
                        </View>
                        <View>
                            <Text>Total: {this.item.total}</Text>
                            <Text>Aprobacion 1: {(this.item.status1==0)?'PENDIENTE':"APROBADO"}</Text>
                            <Text>Aprobacion 2: {(this.item.status2==0)?'PENDIENTE':"APROBADO"}</Text>
                        </View>
                    </View>
                        
                    <View style={{flexDirection:'row',justifyContent:'flex-end',paddingHorizontal:20}}>
                        
                        <TouchableOpacity  style={{ backgroundColor: 'cyan',borderWidth:1 ,borderRadius:10}} onPress={()=>this.aprobacion1(1,this.item.codigo_pedido)}>
                            <Text>APROBACION 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: 'cyan' ,borderWidth:1,marginLeft:20,borderRadius:10}} onPress={()=>this.aprobacion1(2,this.item.codigo_pedido)}>
                            <Text>APROBACION 2</Text>
                        </TouchableOpacity>
                        
                    </View>
                        
                    </>
                    
                </View>
        }catch(error){
            console.log(error.message)
        }
        
        
    }
}
export default EventAprobacion;