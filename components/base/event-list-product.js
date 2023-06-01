import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity,Alert } from "react-native";
import { Contex } from "../global/globalContex";

function EventListProduct({id,codigo,nombre,precio,afecto}){
    const globalContex = useContext(Contex);
    const {cliente,icoMon} = globalContex;
    const navigation = useNavigation();
    const ValidateClient=()=>{
        if('codigo' in cliente){
            navigation.navigate('Select',{data:{id,codigo,nombre,precio,afecto}})
            return true;
        }
        Alert.alert('Agregue un Cliente');
       
    }    
    
    return (
        <TouchableOpacity style={styles.item} onPress={()=>{ValidateClient()}}>
           
              
                <Text>Codigo: {codigo}</Text>
                <Text>Producto: {nombre}</Text>
                <Text>Precio:{icoMon} {precio}</Text>
                {/* <Text>Afecto:{afecto}</Text> */}
                
           
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