import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity ,Text} from "react-native";
import { Contex } from "../../components/global/globalContex";
import ListAprobacion from "./list-aprobacion";
import Icon from 'react-native-vector-icons/FontAwesome'
import Query from "../../data/querys";
class Aprobacion extends Component {
  static contextType = Contex

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
   
    this.state ={
        status:[],
        cliente:null,
        dates:null
   
    }
    
  }

  componentDidMount(){
    const {aprobacion} = this.context
    this.setState({status:aprobacion.states})
  }
  buscador(cliente){
    const {aprobacion} = this.context
    const result = aprobacion.states.filter(item=>item.cliente.includes(cliente))
    console.log(result)

  }
  render() {
    
    const {aprobacion} = this.context
  
   
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput placeholder="Buscar Cliente" value={this.state.cliente} onChangeText={(text)=>this.setState({cliente:text})} style={{width:'80%',marginLeft:10}}/>
          <TouchableOpacity style={{marginRight:10}} onPress={()=>this.buscador(this.state.cliente)}>
            <Icon name="search" size={30} color='blue'/>
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight:15}} >
            <Icon name="download" size={30} color='blue'/>
          </TouchableOpacity>
        </View>
        <ListAprobacion data={aprobacion.states}/>
      </View>
    );
  }
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
