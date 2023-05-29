import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Contex } from "../global/globalContex";

function EventListClient({item}){
    const globalContex = useContext(Contex)
    const {setCliente} = globalContex;
    const navigation = useNavigation();
    const handleSelectCLient =()=>{
        setCliente(item)
        navigation.navigate('Pedido')
    }

    return (
        <TouchableOpacity style={styles.item} onPress={()=>handleSelectCLient()}>
            <View>
              
                <Text>Cliente: {item.nombre}</Text>
              
                <Text>RUC: {item.ruc}</Text>
               
                
            </View>
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
export default EventListClient;