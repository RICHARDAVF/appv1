import React, { Component } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import {DataTable} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import Query from "../../data/querys";
import { Contex } from "../../components/global/globalContex";
interface State {
    client :any,
    dataCopy : any,

}
interface MyContext {
    dominio: any;
    userLogged: any;
    cred:any;
  }
class StateP extends Component<{},State> {
    datos:Array<any | any[]>;
    static contextType = Contex;
  
    constructor(props: {} ){
        super(props);
        
        this.datos = [];
        
        this.state = {
            client : null,
            dataCopy:this.datos,
        };
        
    }
    async refrezcar(){
        const {dominio,userLogged,cred} = this.context as MyContext
        const url = `${dominio}/api/pedidos/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}/`
        
        const data = await Query(url)
        this.datos = data.states,
        this.forceUpdate()
      
    }
    eliminar(index:number){
        const newData = [...this.datos]
        newData.splice(index, 1)
        this.datos = newData
        this.forceUpdate()
        
    }
    
    buscador(nombre:string){
        

        const dataresult = this.state.dataCopy.filter((item: { cliente: string | string[]; }) => item.cliente.includes(nombre));
        
        
        this.forceUpdate()
    }
    renderPedidos(datos:Array<any | any[]>){
        try{
            const iters = datos.map((value,index)=>(
                <DataTable.Row key={value.id} >
                    <DataTable.Cell style={{width:60}}>{value.cliente}</DataTable.Cell>
                    <DataTable.Cell style={{width:60}}>{value.codigo}</DataTable.Cell>
                    <DataTable.Cell style={{width:60,justifyContent:'flex-end'}}>{value.monto}</DataTable.Cell>
                    <DataTable.Cell style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:100}}>
                        <TouchableOpacity style={{backgroundColor:(value.aprobacion%2)?'green':'yellow',borderRadius:15}}>
                            <Text>{(value.aprobacion%2)?'Aprobado':'Pendiente'}</Text>
                        </TouchableOpacity>
                    </DataTable.Cell>
                    <DataTable.Cell style={{width:100}}>{value.fecha}</DataTable.Cell>
                    <DataTable.Cell style={{width:60,justifyContent:'flex-end'}}>{(value.monto*0.18).toFixed(2)}</DataTable.Cell>
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
        }catch(error:any){
            console.log(error.message)
            return ;
        }
        
    }
    
    render(){
        
        return (
            <View>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:10}}>
                    <TextInput placeholder="Buscar cliente" style={{borderBottomWidth:1,width:'75%'}} value={this.state.client} onChangeText={(text)=>this.setState({client:text})}/>
                    <TouchableOpacity onPress={()=>this.buscador(this.state.client)}>
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
                            <DataTable.Title style={{width:60}}>ESTADO</DataTable.Title>
                            <DataTable.Title style={{width:100,justifyContent:'center'}}>FECHA</DataTable.Title>
                            <DataTable.Title style={{width:60}}>IGV</DataTable.Title>
                            <DataTable.Title style={{width:60}}>TOTAL</DataTable.Title>
                            <DataTable.Title style={{width:100,justifyContent:'center'}}>OPCIONES</DataTable.Title>
                            
                        </DataTable.Header>
                    </DataTable>
                    <ScrollView>
                        <View>
                        
                        {this.datos.map((value, index) => (
                            <DataTable.Row key={value.id}>
                          
                                <DataTable.Cell style={{width:300}}>{value.cliente}</DataTable.Cell>
                                <DataTable.Cell style={{width:100}}>{value.codigo_pedido}</DataTable.Cell>
                                <DataTable.Cell style={{width:60}}>{value.status}</DataTable.Cell>
                                <DataTable.Cell style={{width:60}}>{value.status}</DataTable.Cell>
                                <DataTable.Cell style={{width:100}}>{value.fecha}</DataTable.Cell>
                                <DataTable.Cell style={{width:60}}>{value.id}</DataTable.Cell>
                                <DataTable.Cell style={{width:60}}>{value.id}</DataTable.Cell>
                                <DataTable.Cell style={{width:100}}>{value.id}</DataTable.Cell>
                         
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