import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {Text, TouchableOpacity,StyleSheet,View,Alert} from "react-native";
import { Contex } from "../../components/global/globalContex";

function EventAprobacion({ route }) {
    const { item } = route.params
    const globalContex = useContext(Contex)
    const { dominio, cred, userLogged } = globalContex;
    const navigation = useNavigation()
    function confirm(btn,codigo){
        Alert.alert(
            'Confirmar',
            '¿Esta seguro(a) de realizar esta accion?',
            [
              {
                text: 'Cancelar',
                style: 'cancel',
              },
              {
                text: 'Aceptar',
                onPress: () => {
                    aprobacion(btn,codigo)
                    navigation.navigate('Aprobacion')
                },
              },
            ],
            { cancelable: false }
          );
    }
    async function aprobacion(btn, codigo_pedido) {
       
        try{
            const url = `${dominio}/api/pedidos/state/x/x/x/x/`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    "credencial": cred,
                    "user": userLogged,
                    "aprobacion": btn,
                    "codigo_pedido": codigo_pedido,
                })
            })
            const res = await response.json()
            
            Alert.alert(res.message)
        }catch(error){
            return Alert.alert(error.message)
        }
        
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.panel}>
                <Text style={styles.txtTitle}>Cliente</Text>
                <Text style={{borderWidth:0.2,borderRadius:5}} >{item.cliente}</Text>
                <Text style={styles.txtTitle}>Sub Total</Text>
                <Text  >{item.subtotal}</Text>
                <Text style={styles.txtTitle}>IGV</Text>
                <Text  >{item.igv}</Text>
                <Text style={styles.txtTitle}>Total</Text>
                <Text  >{item.total}</Text>
                {(userLogged.aprobacion1 == 1 & userLogged.aprobacion2 == 1) ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop:10,width:'100%'}}>
                        <TouchableOpacity style={styles.btns} onPress={() => confirm(1, item.codigo_pedido)}>
                            <Text>APROBACION 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btns} onPress={() => confirm(2, item.codigo_pedido)}>
                            <Text>APROBACION 2</Text>
                        </TouchableOpacity>
                    </View>

                    : (userLogged.aprobacion1 == 1) ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop:10}}>
                            <TouchableOpacity style={styles.btns} onPress={() => confirm(1, item.codigo_pedido)}>
                                <Text>APROBACION 1</Text>
                            </TouchableOpacity>

                        </View>
                        : <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop:10 }}>
                            <TouchableOpacity style={styles.btns} onPress={() => confirm(2, item.codigo_pedido)}>
                                <Text>APROBACION 2</Text>
                            </TouchableOpacity>

                        </View>
                }


            </View>
        </View>
    );



}
export default EventAprobacion;
const styles = StyleSheet.create({
    btns: {
        borderWidth: 1,
        borderRadius: 2
    },
    panel: {
        width: '90%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 10,
        borderWidth: 1


    },
    txtTitle:{
        fontSize:20,
        color:'#000'
    }

})