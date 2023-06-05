import React, { Component } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import {DataTable} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
interface State {
    client :any
}
class StateP extends Component<{},State> {
    datos:Array<any | any[]>;

    constructor(props: {} ){
        super(props);
        
        this.datos = [
            {cliente:'Richard',codigo:123,monto:100,aprobacion:2,fecha:'10-12-2023'},
            {cliente:'Juan',codigo:345,monto:98,aprobacion:1,fecha:'10-12-2023'},
            {cliente:'Pedro',codigo:345,monto:780,aprobacion:3,fecha:'10-12-2023'},
            {cliente:'Maria',codigo:678,monto:450,aprobacion:4,fecha:'10-12-2023'},
           
        ];
        this.state = {
            client : null
        };
        
    }
    refrezcar(){
        this.forceUpdate()
    }
    eliminar(index:number){
        const newData = [...this.datos]
        newData.splice(index, 1)
        this.datos = newData
        this.forceUpdate()
        
    }
    updateState(){
    
    }
    buscador(cliente:string){
        const newClients = [...this.datos]
        const dataresult = newClients.filter(item => item.cliente.includes(cliente));
        this.datos = dataresult
        this.forceUpdate()
    }
    renderItem(){
        const iters = this.datos.map((value,index)=>(
            <DataTable.Row key={index} >
                <DataTable.Cell style={{width:60}}>{value.cliente}</DataTable.Cell>
                <DataTable.Cell style={{width:60}}>{value.codigo}</DataTable.Cell>
                <DataTable.Cell style={{width:60,justifyContent:'flex-end'}}>{value.monto}</DataTable.Cell>
                <DataTable.Cell style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:100}}>
                    <TouchableOpacity style={{backgroundColor:(value.aprobacion%2)?'green':'yellow',borderRadius:15}}>
                        <Text>{(value[3]%2)?'Aprobado':'Pendiente'}</Text>
                    </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={{width:100}}>{value.fecha}</DataTable.Cell>
                <DataTable.Cell style={{width:60,justifyContent:'flex-end'}}>{value.monto*0.18}</DataTable.Cell>
                <DataTable.Cell style={{width:60,justifyContent:'flex-end'}}>{(value.monto*1.18).toFixed(2)}</DataTable.Cell>
                <DataTable.Cell style={{width:100}}>
                    <View style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>this.eliminar(index)}>
                            <Icon name="times" size={25} color='red' ></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Icon name="edit" size={25} color='green'></Icon>
                        </TouchableOpacity>
                    </View>
                    
                </DataTable.Cell>
            </DataTable.Row>
        ))
        return iters
    }
    
    render(){
        
        return (
            <View>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:10}}>
                    <TextInput placeholder="Buscar cliente" style={{borderBottomWidth:1,width:'75%'}} value={this.state.client} onChangeText={(text)=>this.setState({client:text})}/>
                    <TouchableOpacity onPress={()=>this.buscador(this.state.client)}>
                        <Icon name="search" size={25} color='blue'></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.forceUpdate()}>
                        <Icon name="refresh" size={25} color='green'></Icon>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true}>
                <View >
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={{width:60}}>CLIENTE</DataTable.Title>
                            <DataTable.Title style={{width:60}}>CODIGO</DataTable.Title>
                            <DataTable.Title style={{width:60}}>MONTO</DataTable.Title>
                            <DataTable.Title style={{width:60}}>ESTADO</DataTable.Title>
                            <DataTable.Title style={{width:100,justifyContent:'center'}}>FECHA</DataTable.Title>
                            <DataTable.Title style={{width:60}}>IGV</DataTable.Title>
                            <DataTable.Title style={{width:60}}>TOTAL</DataTable.Title>
                            <DataTable.Title style={{width:100}}>OPCIONES</DataTable.Title>
                            
                        </DataTable.Header>
                    </DataTable>
                    <ScrollView>
                        <View>
                            {this.renderItem()}
                        </View>
                    </ScrollView>

                   
                    
                </View>
                </ScrollView>
            </View>
        );
    }
}
export default StateP