import { useContext, useEffect, useState } from "react";
import { View,Text,TouchableOpacity,StyleSheet, TextInput, SafeAreaView } from "react-native";
import { Contex } from "../../components/global/globalContex";
import ListProduct from "../../components/base/list-product";
import { useNavigation } from "@react-navigation/native";
import Query from "../../data/querys";
import RNPickerSelect from "react-native-picker-select";
import Icon from 'react-native-vector-icons/FontAwesome';
function NotaPedido(){
    const navigation = useNavigation();
    const globalContex = useContext(Contex)
    const {cliente,data,setData,dominio,almacenes,ubicacion,precios,cred,moneda,setMoneda,setIcoMon,alm,setAlm,local,setLocal,p,setP} = globalContex
    const [searchPro,setSearchPro] = useState('')
    const [datacopy,setDataCopy] = useState([])
    const [price, setPrice] = useState(parseInt(precios[0].codigo));
  
    
      const vals = almacenes.map(item => ({
        label: item.nombre,
        value: item.codigo
      }));
      const vals1 = ubicacion.map(item => ({
        label: item.nombre,
        value: item.codigo
      }));
      const vals2 = precios.map(item => ({
        label: item.nombre,
        value: item.codigo
      }));
      
    function buscador(palabra){
        
        const dataresult = datacopy.filter(item => item.nombre.includes(palabra));
        setData(dataresult)       
    }
    const fetchData= async (p)=>{
        const urlproduct = `${dominio}/api/product/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}/${p}/`
        const resproduct = await Query(urlproduct)
        setData(resproduct)
        setDataCopy(resproduct)
    }
    const simbolMoneda = (itemValue)=>{
        setMoneda(itemValue)
        if(itemValue=='USD'){
            setIcoMon('$')
        }else{
            setIcoMon('s/')
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style = {styles.panelClient}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignContent:'space-between',alignItems:'center'}}>
                    <Text style={{fontSize:20,color:'#000'}}>Cliente:</Text>
                    <TouchableOpacity style={[styles.btn]}  onPress={()=>navigation.navigate('Cliente')} >
                    {('nombre' in cliente)?<Text><Icon name='exchange' size={20} color='green' /> Cambiar</Text>:<Text><Icon name='plus' size={20} /> Agregar</Text>}      
                    </TouchableOpacity> 
                </View>
                <Text style={{fontSize:15,color:'#000'}}>{("nombre" in cliente)?cliente.nombre:''}</Text>
                
            </View>
            <View style={{marginBottom:5}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <TextInput placeholder="Buscar Producto" value={searchPro} onChangeText={setSearchPro} style={{borderBottomWidth:1,marginLeft:5,width:'50%'}}/>
                    <TouchableOpacity onPress={()=>buscador(searchPro)} style={{marginStart:0}} >
                        <Icon name="search" size={22} color="#000" style={{marginTop:30,marginRight:20}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,{marginTop:10}]} onPress={()=>fetchData(price)}>
                        <Text style={{fontSize:20}}>Cargar <Icon name="download" size={22} color="blue" /></Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,marginTop:10}}>
                    
                    <View>
                        <RNPickerSelect
                        onValueChange={(value) => setAlm(value)}
                        items={vals} doneText="Cerrar"
                        placeholder={{ label: "Almacen", value: null }}

                        />
                    </View>
                   <View>
                    <RNPickerSelect
                        onValueChange={(value) => setLocal(value)}
                        items={vals1}
                        doneText="Cerrar"
                        placeholder={{ label: "Ubicacion", value: null }}
                        />
                   </View>

                </View> 
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,marginTop:10}}>
                    <View>
                        <RNPickerSelect
                        onValueChange={(value) => setPrice(value)}
                        items={vals2} doneText="Cerrar"
                        placeholder={{ label: "Precios", value: null,color:'blue' }}
                        
                        />
                    </View>
                    <View>
                    <RNPickerSelect
                        onValueChange={(value) => simbolMoneda(value)}
                        items={[
                            {label:'USD',value:'USD'},
                            {label:'PEN',value:'PEN'},
                        ]} doneText="Cerrar"
                        placeholder={{ label: "Moneda", value: null,color:'blue' }}
                        
                    />
                    </View>
                    
                </View> 
                
            </View>
           
            <ListProduct data={data}/>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    panelClient:{
        width:"100%",
        backgroundColor:'#e8f3ff',
        borderWidth:1,
        padding:10,
        height:'15%'
        

    },
    panelItems:{
        width:'100%',
        height:'30%',
        backgroundColor:'#e8f3ff',
        borderWidth:1,
    },
    panelProduct:{
        width:'100%',
        height:'60%',
        backgroundColor:'#e8f3ff',
        borderWidth:1,
    },
    btn:{
        backgroundColor:'cyan',
        height:30,
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        paddingHorizontal:10,
        borderRadius:20
       
    },
    textbtn:{
        fontSize:15,
        
    }
});
export default NotaPedido;