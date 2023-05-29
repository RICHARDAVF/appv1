import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View,ToastAndroid } from "react-native";
import { Contex } from "../global/globalContex";

function EventListProduct({id,codigo,nombre,precio}){
    const globalContex = useContext(Contex);
    const {cliente,icoMon} = globalContex;
    const navigation = useNavigation();
    const ValidateClient=()=>{
        if('codigo' in cliente){
            navigation.navigate('Select',{data:{id,codigo,nombre,precio}})
            return true;
            
            
        }
        ToastAndroid.show('Agregue un Cliente', ToastAndroid.SHORT);
       
    }


    
    
    return (
        <TouchableOpacity style={styles.item} onPress={()=>{ValidateClient()}}>
           
              
                <Text>Codigo: {codigo}</Text>
                <Text>Producto: {nombre}</Text>
                <Text>Precio:{icoMon} {precio}</Text>
                
                
           
        </TouchableOpacity>
    );
    }

const styles = StyleSheet.create({
    item:{
        borderWidth:1,
        padding:5,
        borderRadius:5
    }
});
export default EventListProduct;