import {Component } from "react";
import { View,Text, StyleSheet, Alert,TouchableOpacity, TextInput } from "react-native";
import { Contex } from "../../components/global/globalContex";
import { Dropdown } from 'react-native-element-dropdown';

class  Methods extends Component{
  static contextType = Contex;
  constructor(props){
    super(props)
    const {route} = this.props;
    this.t =route.params.t,
   
    this.state = {
      tipoCambio:null,
      monto : this.t,
      montcambio : this.t,
      cambio :null,
      status:false, 
      tipo : null, 
      obs:''   
    }
    
  }
    savedata(){
        
        
        const {setProductos,setCliente} = this.context;
        setProductos([])
        setCliente({})
        this.registrarPedido()
        this.props.navigation.navigate('NotaPedido');
      }
    fetchTipoCambio = async () => {
      try {
        const fecha = new Date();
        const mes = (fecha.getMonth()+1).toString().padStart(2,'0')
        const fmt = `${fecha.getFullYear()}-${mes}-${fecha.getDate()}`
        const response = await fetch(`https://api.apis.net.pe/v1/tipo-cambio-sunat?fecha=${fmt}`
        );
        const data = await response.json({});
        this.setState({tipoCambio:data['venta']})

      } catch (error) {
        ()=>{}
        
      }
     
    };
    

    async registrarPedido(){
      const {dominio,productos,cliente,local,alm,cred,userLogged,p} = this.context;
      
      const response = await fetch(`${dominio}/api/product/venta/add/`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          "detalle":productos,
          "cabeceras":cliente,
          "vendedor":userLogged,
          "opt":{
            "tipo":this.state.tipo,
            'obs' :this.state.obs,
            "total":this.t,
            "local":local,
            "almacen":alm,
            "credencial":cred,
            'precio':p
          }

        })
      })
      const data = await response.json()
      
      Alert.alert(data.message)
      
    }
  
    render(){
      const {moneda,tipoPago} = this.context;
      const vals = tipoPago.map((item) => ({
        label: item.nombre,
        value: item.codigo
      }));
      return (
        <View style={styles.container}>
          
          <View>
            <Text style={{marginLeft:15,fontSize:22}}>MONEDA  :{moneda} </Text>
            <Text style={{marginLeft:15,fontSize:22}}>MONTO  : {this.state.montcambio}</Text>
            
              
           
              <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={vals}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="TIPO DE PAGO"
              searchPlaceholder="Buscar..."
              value={this.state.tipo}
              onChange={item => {
                this.setState({tipo:item.value});
              }}
              />
             
      
            <Text style={{marginLeft:15,fontSize:22}}>Obervaciones: </Text>
            <TextInput style={styles.obs}  multiline={true}  numberOfLines={6} value={this.state.obs} onChangeText={(text)=>this.setState({obs:text})} />
            <TouchableOpacity style={styles.button} onPress={()=>this.savedata()}>
                <Text style={styles.buttonText}>Guardar Pedido</Text>
            </TouchableOpacity>
            
            
          </View>
        </View>
      );
    }
  
}
export default Methods;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    txt:{
        textAlign:'center',
        fontSize:22
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        
      },
    buttonText: {
        color: 'white',
      
        textAlign:'center'
      },
      obs :{
        borderWidth:1,
        width:'95%',
        margin:10,
        height:100,
        padding:5,

      },
      dropdown: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
      },

  })