import React, {  useContext, useEffect, useState } from "react";
import { VirtualizedList, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import Query from "../../data/querys";
import { Contex } from "../../components/global/globalContex";
import { useNavigation } from "@react-navigation/native";


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
     
        setData(datos.states)
    }
    function realizarBusqueda() {
        const result = data.filter((item)=>item.cliente.includes(palabra));
        setData(result)
    }
    async function EditItem(item){
        const url = `${dominio}/api/pedidos/edit/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}/`
    }
    function ListItem({ item }) {
       
       
        return (
       <TouchableOpacity style={{borderWidth:1}} onPress={()=>navigation.navigate('PedidoStack',{screen:'Carrito'})}>
            <Text>{item.codigo_pedido}</Text>
            <Text>{item.cliente}</Text>
            <Text>{item.status}</Text>
       </TouchableOpacity>
        );
      }

    const getItemCount = () => data.length;
    const getItem = (data, index) => data[index]; 


    return (
            <View>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:10}}>
                    <TextInput placeholder="Buscar cliente" style={{borderBottomWidth:1,width:'75%'}} />
                    <TouchableOpacity onPress={()=>realizarBusqueda}>
                        <Icon name="search" size={25} color='blue'></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>refrezcar}>
                        <Icon name="refresh" size={25} color='green'></Icon>
                    </TouchableOpacity>
                </View>
            
                <View >    
                <VirtualizedList
                    data={data}
                    getItemCount={getItemCount}
                    getItem={getItem}
                   
                    renderItem={({item})=><ListItem item={item}/>}
                    keyExtractor={(item, index) => String(index)}
                    />
                
                    
                </View>
            </View>
        );
    
}
export default StateP