import React, { Component } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import {DataTable} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import Query from "../../data/querys";
import { Contex } from "../../components/global/globalContex";

class StateP extends Component{

    static contextType = Contex;
  
    constructor(props){
        super(props);
        
        this.datos = [];
        
        this.state = {
            client : null,
            dataCopy:[],
           
        };
        
    }
     componentDidMount() {
         this.refrezcar()
    }
    async refrezcar(){
        const {dominio,cred} = this.context
        const url = `${dominio}/api/pedidos/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}/`
        const data = await Query(url)
        this.datos = data.states,
        this.setState({dataCopy:data.states})
        
      
    }
    realizarBusqueda() {
        const result = this.datos.filter(value=>value.cliente.includes(this.state.client))
        this.setState({dataCopy:result})
        console.log(result)
    }
      
    
    render(){
        
        return (
            <View>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:10}}>
                    <TextInput placeholder="Buscar cliente" style={{borderBottomWidth:1,width:'75%'}} value={this.state.client} onChangeText={(text)=>this.setState({client:text})}/>
                    <TouchableOpacity onPress={()=>this.realizarBusqueda()}>
                        <Icon name="search" size={25} color='blue'></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.refrezcar()}>
                        <Icon name="refresh" size={25} color='green'></Icon>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true}>
                <View >
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={{width:300}}>CLIENTE</DataTable.Title>
                            <DataTable.Title style={{width:100}}>CODIGO</DataTable.Title>
                            <DataTable.Title style={{width:60}}>MONTO</DataTable.Title>
                            <DataTable.Title style={{width:150,justifyContent:'center'}}>ESTADO</DataTable.Title>
                            <DataTable.Title style={{width:100,justifyContent:'center'}}>FECHA</DataTable.Title>
                            <DataTable.Title style={{width:100,justifyContent:'flex-end'}}>IGV</DataTable.Title>
                            <DataTable.Title style={{width:100,justifyContent:'flex-end'}}>TOTAL</DataTable.Title>
                            <DataTable.Title style={{width:100,justifyContent:'center'}}>OPCIONES</DataTable.Title>
                            
                        </DataTable.Header>
                    </DataTable>
                    <ScrollView>
                        <View>
                        
                        {this.state.dataCopy.map(value => (
                            <DataTable.Row key={value.id} >
                          
                                <DataTable.Cell style={{width:300}}>{value.cliente}</DataTable.Cell>
                                <DataTable.Cell style={{width:100}}>{value.codigo_pedido}</DataTable.Cell>
                                <DataTable.Cell style={{width:60,justifyContent:'flex-end'}}>{value.subtotal}</DataTable.Cell>
                                <DataTable.Cell style={{width:150,justifyContent:'center'}}>
                                    {(value.status=='APROBADO')?
                                    <Text style={{color:'green'}}>{value.status}</Text>
                                    :(value.status=='PENDIENTE')?
                                
                                        <Text style={{color:'#e0db07'}}>PENDIENTE</Text>
                                    
                                    :(value.status=='ANULADO')?
                                    <Text style={{color:'red'}}>{value.status}</Text>
                                    :<Text style={{color:'orange'}}>{value.status}</Text>}
                                </DataTable.Cell>
                                <DataTable.Cell style={{width:100}}>{value.fecha}</DataTable.Cell>
                                <DataTable.Cell style={{width:100,justifyContent:'flex-end'}}>{value.igv}</DataTable.Cell>
                                <DataTable.Cell style={{width:100,justifyContent:'flex-end'}}>{value.total}</DataTable.Cell>
                                <DataTable.Cell style={{width:100,justifyContent:'center'}}>

                                    <TouchableOpacity>
                                        <Icon name="edit" color = 'green' size={22}/>
                                    </TouchableOpacity>

    
                                </DataTable.Cell>
                                
                         
                            </DataTable.Row>
                        ))}
                        


                            
                        </View>
                    </ScrollView>

                   
                    
                </View>
                </ScrollView>
            </View>
        );
    }
}
export default StateP