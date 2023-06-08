import React, {useContext } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity ,Text,VirtualizedList} from "react-native";
import { Contex } from "../../components/global/globalContex";
import Icon from 'react-native-vector-icons/FontAwesome'
import Query from "../../data/querys";
function Aprobacion() {
  const globalContex = useContext(Contex)
  const {aprobacion} = globalContex

 function buscador(cliente){
    return
  }
  function ListItem({item}){
        
    return (
        <TouchableOpacity style={{borderWidth:1}}>
              <Text>{item.cliente}</Text>
              <Text>{item.codigo_pedido}</Text>
              <Text>{item.fecha}</Text>
        </TouchableOpacity>
    );
    
}  
const getItemCount =()=>aprobacion.states.length
const getItem=(data,index) =>data[index]
  return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput placeholder="Buscar Cliente" />
          <TouchableOpacity style={{marginRight:10}} onPress={()=>buscador('')}>
            <Icon name="search" size={30} color='blue'/>
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight:15}} >
            <Icon name="download" size={30} color='blue'/>
          </TouchableOpacity>
        </View>
        <VirtualizedList
                    data={aprobacion.states}
                    getItem={getItem}
                    getItemCount={getItemCount}
                    renderItem={({item})=><ListItem item={item}/>}
                    keyExtractor={(item, index) => String(index)}
                    />
      </View>
    );
  
}

export default Aprobacion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search:{
    flexDirection:'row',
    justifyContent:'space-between',
  }
});
