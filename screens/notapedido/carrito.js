import { useContext } from "react";
import { StyleSheet, View,TouchableOpacity ,Text, Alert} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Contex } from "../../components/global/globalContex";
import { useNavigation } from "@react-navigation/native";

const Carrito=()=>{
    const navigation = useNavigation();
    const  globalContex = useContext(Contex);
    const {productos,setProductos,icoMon} = globalContex;
    function eliminar(index){
        const newdata = [...productos]
        newdata.splice(index,1)
        setProductos(newdata)
        
    }
    
    
    function sumar(){
        var t = 0;
        for (item in productos){
            t+=parseFloat(productos[item].total);
        }
        return t.toFixed(2);
      
    }

    

    const validT= ()=>{
        if(sumar()>0){
        navigation.navigate('Final',{t:sumar()})
        }else{
            Alert.alert('No hay productos seleccionados')
        }

    }
    const renderItem = productos.map((value,index)=>(
        
        <View key={index} style={[styles.element,{justifyContent:'space-between',flexDirection:'row',height:30}]}>
            <TouchableOpacity style={{width:'20%',textAlign:'center',borderRightWidth:1}} onPress={()=>Alert.alert(title='Producto',message=value.nombre)}>
                <Text  style={{color:'blue',textDecorationLine:'underline'}}>{value.codigo}</Text>
            </TouchableOpacity>
           
            <Text style={{width:'10%',textAlign:'center',borderRightWidth:1}}>{value.cantidad}</Text>
            <Text style={{width:'15%',textAlign:'center',borderRightWidth:1}}>{icoMon}{value.precio}</Text>
            <Text style={{width:'15%',textAlign:'center',borderRightWidth:1}}>{value.descuento}%</Text>
            <Text style={{width:'15%',textAlign:'center',borderRightWidth:1}}>{icoMon}{value.total}</Text>
            <View style={{width:'25%',borderRightWidth:1 ,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                <TouchableOpacity onPress={()=>eliminar(index)} >
                    <Icon name="trash" size={20} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Edit',{data:value,index:index})}>
                    <Icon name="edit" size={20} color="green" />
                </TouchableOpacity>
            </View>
        </View>
        
    ))
  
    return (
        <View style={styles.container}>
            
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:12}}>
                <Text style={{width:'20%',borderWidth:1,textAlign:'center'}}>Codigo</Text>
                <Text style={{width:'10%',borderWidth:1,textAlign:'center'}}>CAN</Text>
                <Text style={{width:'15%',borderWidth:1,textAlign:'center'}}>P/U</Text>
                <Text style={{width:'15%',borderWidth:1,textAlign:'center'}}>DSC</Text>
                <Text style={{width:'15%',borderWidth:1,textAlign:'center'}}>T. {icoMon}</Text>
                <Text style={{width:'25%',borderWidth:1,textAlign:'center'}}>OPC</Text>
            </View>
            <View style={{height:'87%'}}>
            {renderItem}
            </View>
            <View style={{height:"10%",justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={[styles.btnsave,(sumar()>0)?styles.enable:styles.disabled]} onPress={()=>validT()}>
                    <Text style={{fontSize:22}}>Continuar</Text>
                    <Text style={{fontSize:22,borderRadius:15,borderWidth:1,backgroundColor:'#00e277'}}>Total {icoMon}: {sumar()}</Text>
                </TouchableOpacity>
               
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        fleax:1,
        backgroundColor:'fff1',
    },
    element :{
        width:"100%",
            
    },
    btnsave:{
        backgroundColor:'cyan',
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        height:43,
        justifyContent:'space-between',
        paddingHorizontal:30
    },
    enable:{
        opacity:1,
    },
    disabled:{
        opacity:0.5
    }
    
});
export default Carrito;