import { useContext, useState } from "react";
import { TouchableOpacity ,Text,View, TextInput,StyleSheet} from "react-native";
import { Contex } from "../global/globalContex";
import { useNavigation } from "@react-navigation/native";


function Modals({route}){
    const navigation = useNavigation()
    const {data,index} = route.params;
    const globalContex = useContext(Contex)
    const {productos,setProductos} = globalContex;
    const [price,setPrice] = useState((data.precio).toString());
    const [cant,setCant] = useState((data.cantidad).toString());
    const [desc,setDesc] = useState((data.descuento).toString())
    const updateData=()=>{
        const newData = [...productos];

        const sum = (parseFloat(cant)*parseFloat(price)*(1-parseFloat(desc)/100)).toFixed(2);
        
        newData[index] = {id:data.id,codigo:data.codigo,cantidad:cant,precio:price,descuento:desc,total:sum}
        setProductos(newData)
        navigation.navigate('Pedido')
        
        
    }
   
    
    return(
        <View>
            
            <View style={{marginTop:20,alignContent:'center',alignItems:'center'}} >
                    <Text>Codigo: {data.codigo}</Text>
                    <Text>Cantidad anterior: {data.cantidad}</Text>
                    <TextInput style={[styles.txtinput]} placeholder="Nueva Cantidad" value={cant} onChangeText={setCant} keyboardType="numeric" selectTextOnFocus={true}/>
                    <Text>Precio anterior {data.precio}</Text>
                    <TextInput style={styles.txtinput} placeholder="Nuevo Precio" value={price} onChangeText={setPrice} keyboardType="numeric" selectTextOnFocus={true}/>
                    <Text>Descuento anterior {data.precio}</Text>
                    <TextInput style={styles.txtinput} placeholder="Nuevo Precio" value={desc} onChangeText={setDesc} keyboardType="numeric" selectTextOnFocus={true}/>
                <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',paddingHorizontal:50,marginTop:20}}>
                    <TouchableOpacity onPress={()=>updateData()} style={[styles.btn,{backgroundColor:'cyan'}]}>
                        <Text>Guardar Cambios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Pedido')}  style={[styles.btn,{backgroundColor:'red'}]}>
                        <Text>Cancelar</Text>
                    </TouchableOpacity>
                </View> 
                
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    txtinput:{
        borderWidth:1,
        borderRadius:30,
        marginTop:10,
        paddingLeft:10,
        height:40,
        width:"60%",
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
    },
    btn:{
        width:'45%',
        height:30,
        alignItems:'center',
        justifyContent:'center'
    }

});
export default Modals;