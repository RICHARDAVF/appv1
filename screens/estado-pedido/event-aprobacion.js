
import React, { Component, useContext } from "react";
import { View,Text,TouchableOpacity, StyleSheet,Button } from "react-native";
import { Contex } from "../../components/global/globalContex";
function EventAprobacion ({item}){
    
   
    async function aprobacion1(btn,codigo_pedido){
        const globalContex = useContext(Contex)
        const {dominio,cred,userLogged} = globalContex;
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
        return (<TouchableOpacity>
                
                    <Text>CLIENTE: {item.cliente}</Text>
                    <Text>PEDIDO: {item.codigo_pedido}</Text>
                    <Text>FECHA: {item.fecha}</Text>
                    <Text>IGV: {item.igv}</Text>
                    <Text>Total: {item.status1}</Text>
                    <Text>Total: {item.status2}</Text>
                    
                
                
            </TouchableOpacity>
        );
                  
           
    
}
export default EventAprobacion;
const styles= StyleSheet.create({
    btns:{
        borderWidth:1,
        borderRadius:10
    }
})