import React,{PureComponent} from "react";
import { Text, TextInput, View,ActivityIndicator,Modal, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import Icon  from "react-native-vector-icons/FontAwesome";
import ListaOrden from "./list-orden";
import { Contex } from "../../components/global/globalContex";
// import { withNavigation } from "@react-navigation/compat";

class Orden extends PureComponent{
  static contextType = Contex
  constructor(props){
    super(props);
    this.state={
      loading:true,
      data:[],
      modalVisible:false
    }
  }
  componentDidMount(){
    // this.requestData()
    console.log(this.props)
  }
  closeModal(){
    this.setState({modalVisible:false})

  }
  openModal(){
    this.setState({modalVisible:true})
  }
  async requestData(){
    const {dominio,cred} = this.contex
    const url = `${dominio}/api/product/${cred.bdhost}/${cred.bdname}/${cred.user}/${cred.password}`
    console.log(url)
    const res = await fetch(url,{method:'GET'})
    const result = await res.json({})
    this.setState({data:result.message})
  }
  tiempo (data){
    return Math.ceil(data.length / 1000) * 100;
  }

  render(){
    const {data} = this.state
    return(
      <View style={{flex:1,position:'relative'}}>
        <TouchableOpacity style={styles.btnadd} onPress={()=>this.openModal()}>
          <Text>Buscar Producto</Text>
          <Icon name="search" size={25} color='blue'/>
        </TouchableOpacity>
        <Modal animationType="slice" visible={this.state.modalVisible}  >
          
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',height:'60%',width:'90%' }}>
            <Text>Contenido del PopUp</Text>
            <View style={styles.modal}>
              <TouchableOpacity style={{backgroundColor:'green',width:100,alignItems:'center'}} onPress={()=>this.closeModal()}>
                <Text>Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:'red',width:100,alignItems:'center'}} onPress={()=>this.closeModal()}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
         
        </View>
        </Modal>
        <View>
          <ListaOrden data={data}/>
        </View>
       <TouchableOpacity style={styles.btnnext} onPress={()=>this.props.navigation.navigate('Form')} >
        <Text>Continuar</Text>
       </TouchableOpacity>
      </View>
    )
  }
}
export  default Orden
const styles = StyleSheet.create({
  btnadd:{
    flexDirection:'row',
    margin:6,
    justifyContent:'space-around',
    borderWidth:1,
    alignContent:'center',
    alignItems:'center',
    borderRadius:7,
    backgroundColor:'#2ab4ab'

  },
  modal:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-around'
  },
  btnnext:{
    position: 'absolute',
    bottom: 20, 
    left: 20, 
    backgroundColor: '#545cd7',
    padding: 10,
    borderRadius: 5,
    width:'90%',
    alignItems:'center'
  }
}
)