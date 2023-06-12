
import React, { Component, useContext } from "react";
import { View,Text,TouchableOpacity, StyleSheet,Button } from "react-native";
import { Contex } from "../../components/global/globalContex";
function EventAprobacion ({route}){
    const  {item} = route.params
    const globalContex = useContext(Contex)
    const {dominio,cred,userLogged} = globalContex;
    async function aprobacion1(btn,codigo_pedido){
        
        const url = `${dominio}/api/pedidos/state/././././`
        const response = await  fetch(url,{
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
        const res = await response.json()
        console.log(res)
    }     
        return (
            <View style={{flex:1}}>
                <Text>{item.cliente}</Text>
                <Text>{item.status1}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <TouchableOpacity style={styles.btns}>
                        <Text>APROBACION 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btns}>
                        <Text>APROBACION 2</Text>
                    </TouchableOpacity>
                </View>
               
            </View>
        );
                  
           
    
}
export default EventAprobacion;
const styles= StyleSheet.create({
    btns:{
        borderWidth:1,
        borderRadius:5
    },
    
})