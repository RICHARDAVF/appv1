import React, {  useContext, useEffect, useState } from "react";
import {TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import Query from "../../data/querys";
import { Contex } from "../../components/global/globalContex";
import { useNavigation } from "@react-navigation/native";
import ListaComponentes from "./event-status";


function StateP (){
    const navigation = useNavigation();
    const globalContex = useContext(Contex)
    const {dominio,cred} = globalContex;
    const [data,setData] = useState([])
    const [palabra,setPalabra] = useState('')
    useEffect(()=>{
        refrezcar();
    },[])
    
    async function refrezcar(){
        const url = `${dominio}/api/pedidos/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}/`
        const datos = await Query(url)
        
        datos.states.sort((a,b)=>{
            return new Date(b.fecha)-new Date(a.fecha)
        })
        
        setData(datos.states)
    }
    function realizarBusqueda(palabra) {
        const result = data.filter(item=>item.cliente.includes(palabra.toUpperCase()));
        setData(result)
    }
    return (
            <View>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:10}}>
                    <TextInput value={palabra} onChangeText={setPalabra} placeholder="Buscar cliente" style={{borderBottomWidth:1,width:'75%' }} />
                    <TouchableOpacity onPress={()=>realizarBusqueda(palabra)}>
                        <Icon name="search" size={25} color='blue'></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>refrezcar()}>
                        <Icon name="refresh" size={25} color='green'></Icon>
                    </TouchableOpacity>
                </View>
            
                <View >    
                    <ListaComponentes componentes={data} navigation={navigation}/>
                </View>
            </View>
        );
    
}
export default StateP