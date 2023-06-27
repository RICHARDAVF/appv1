import { useContext, useEffect, useState } from "react";
import { View,Text,TouchableOpacity,StyleSheet, TextInput, SafeAreaView } from "react-native";
import { Contex } from "../../components/global/globalContex";
import ListProduct from "../../components/base/list-product";
import { useNavigation } from "@react-navigation/native";
import Query from "../../data/querys";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
function NotaPedido(){
    const navigation = useNavigation();
    const globalContex = useContext(Contex)
    const {cliente,data,setData,dominio,almacenes,ubicacion,precios,cred,moneda,setMoneda,setIcoMon,alm,setAlm,local,setLocal,p,setP} = globalContex
    const [searchPro,setSearchPro] = useState('')
    
      const almacen = almacenes.map(item => ({
        label: item.nombre,
        value: item.codigo
      }));
      const ubic = ubicacion.map(item => ({
        label: item.nombre,
        value: item.codigo
      }));
      const pre = precios.map(item => ({
        label: item.nombre,
        value: item.codigo
      }));
      
    function buscador(palabra){
        const newData = [...data]
        const dataresult = newData.filter(item => item.nombre.includes(palabra.toUpperCase()));
     
        setData(dataresult)       
    }
    const fetchData= async (p,moneda,alm,local)=>{
        const urlproduct = `${dominio}/api/product/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}/${p}/${moneda}/${alm}/${local}`
        const resproduct = await Query(urlproduct)
        setData(resproduct)  
    }
    const simbolMoneda = (itemValue)=>{
        setMoneda(itemValue)
        if(itemValue=='D'){
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
            <View style={{marginBottom:5,backgroundColor:'#dfffff'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <TextInput placeholder="Buscar Producto" value={searchPro} onChangeText={setSearchPro} style={{borderBottomWidth:1,marginLeft:5,width:'50%'}}/>
                    <TouchableOpacity onPress={()=>buscador(searchPro)} style={{marginStart:0}} >
                        <Icon name="search" size={22} color="#000" style={{marginTop:30,marginRight:20}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,{marginTop:10}]} onPress={()=>fetchData(p,moneda,alm,local)}>
                        <Text style={{fontSize:20}}>Cargar <Icon name="download" size={22} color="blue" /></Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,marginTop:10}}>
                    
                    <View style={{width:'50%'}}>
                        
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={almacen}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="ALMACEN"
                            searchPlaceholder="Buscar..."
                            value={alm}
                            
                            onChange={item => {
                                setAlm(item.value);

                            }}
                            />
                    </View>
                   <View style={{width:"50%"}}>
                    
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={ubic}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="UBICACION"
                        searchPlaceholder="Buscar..."
                        value={local}
                        onChange={item => {
                            setLocal(item.value);
                        }}
                        />
                   </View>

                </View> 
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,marginTop:10}}>
                    <View style={{width:'50%'}}>
                        
                        <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={pre}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="LISTA PRECIOS"
                        searchPlaceholder="Buscar..."
                        value={p}
                        onChange={item => {
                            setP(item.value);
                        }}
                        />
                    </View>
                    <View style={{width:'50%'}}>
                    
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={[
                            {label:'USD',value:'D'},
                            {label:'PEN',value:'S'},
                        ]}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="MONEDA"
                        searchPlaceholder="Buscar..."
                        value={moneda}
                        onChange={item => {
                            simbolMoneda(item.value);
                        }}
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
        backgroundColor:'#dfffff',
     
        padding:10,
        height:'12%'
        

    },
    panelItems:{
        width:'100%',
        height:'30%',
        backgroundColor:'#b2ffff',
        borderWidth:1,
    },
    panelProduct:{
        width:'100%',
        height:'60%',
        backgroundColor:'#b2ffff',
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
        
    },
    dropdown: {
      height: 30,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 5,
    },
});
export default NotaPedido;