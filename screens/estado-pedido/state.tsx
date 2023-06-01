import React, { Component } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import {DataTable} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
class StateP extends Component {
    datos:number[][];
    constructor(props: {} | Readonly<{}>){
        super(props);
        this.datos = [[1,2,3,4,5,4,5,6,7],[6,7,8,9,10,5,7,9],[2,4,6,8,3,5,8,0]]
        
    }
    
    renderItem(){
        const iters = this.datos.map((value,index)=>(
            <DataTable.Row key={index} >
                <DataTable.Cell style={{width:60}}>{value[0]}</DataTable.Cell>
                <DataTable.Cell style={{width:60}}>{value[1]}</DataTable.Cell>
                <DataTable.Cell style={{width:60}}>{value[2]}</DataTable.Cell>
                <DataTable.Cell style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:100}}>
                    <TouchableOpacity style={{backgroundColor:(value[3]%2)?'green':'yellow',borderRadius:15}}>
                        <Text>{(value[3]%2)?'Aprobado':'Pendiente'}</Text>
                    </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={{width:60}}>{value[4]}</DataTable.Cell>
                <DataTable.Cell style={{width:60}}>{value[2]}</DataTable.Cell>
                <DataTable.Cell style={{width:60}}>{value[2]}</DataTable.Cell>
                <DataTable.Cell style={{width:100}}>
                    <View style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}>
                        <TouchableOpacity >
                            <Icon name="times" size={25} color='red'></Icon>
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
                    <TextInput placeholder="Buscar cliente" style={{borderBottomWidth:1,width:'75%'}}/>
                    <TouchableOpacity>
                        <Icon name="search" size={25} color='blue'></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity>
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
                            <DataTable.Title style={{width:60}}>FECHA</DataTable.Title>
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