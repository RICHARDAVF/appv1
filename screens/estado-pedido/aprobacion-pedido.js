import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Contex } from "../../components/global/globalContex";
import Icon from 'react-native-vector-icons/FontAwesome'
import Query from "../../data/querys";
import { useNavigation } from "@react-navigation/native";

import ListDatos from "./list-aprobacion";
function Aprobacion() {
  const navigation = useNavigation()
  const globalContex = useContext(Contex)
  const { aprobacion,cred,dominio,setAprobacion } = globalContex
  const [palabra,setPalabra] = useState('')
  useEffect(()=>{
   
  })
  async function RefreshData(){
    const response = await fetch(`${dominio}/api/pedidos/state/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}`)
    const data = await response.json({})
    data.states.sort((a,b)=>{
      return new Date(b.fecha)-new Date(a.fecha)
  })
    setAprobacion(data.states)
  }
  function buscador(palabra) {
    
    const result = aprobacion.filter(item=>item.cliente.includes(palabra.toUpperCase()));
   
    setAprobacion(result)
  }


  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput value={palabra} onChangeText={setPalabra} placeholder="Buscar Cliente" style={{width:'70%',paddingLeft:10}}/>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => buscador(palabra)}>
          <Icon name="search" size={30} color='blue' />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 15 }} onPress={()=>RefreshData()} >
          <Icon name="refresh" size={30} color='green' />
        </TouchableOpacity>
      </View>
        <View>
          <ListDatos componentes={aprobacion} navigation={navigation}/>
        </View>
       
    </View>
  );

}

export default Aprobacion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt:{
    color:'black',
    fontWeight:'bold'
  }
});
