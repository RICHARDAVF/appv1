import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Contex } from "../components/global/globalContex";
import { useNavigation } from "@react-navigation/native";

function Select({ route }) {
    const navigation = useNavigation();
    const { data } = route.params;

    const globalContex = useContext(Contex)
    const { productos, setProductos,icoMon } = globalContex;
    const [price, setPrice] = useState((data.precio != null ? data.precio : 0.00).toString())
    const [cantidad, setCantidad] = useState('1')
    const [descuento, setDescuento] = useState('0.00')

    const valbuton = (price, cantidad) => {
        try {
            if (isNaN(parseFloat(price)) || isNaN(parseFloat(cantidad)) || parseFloat(cantidad) == 0 || parseFloat(price) == 0) {

                return false;
            }

            return true;
        } catch {

            return false
        }
    }
    const calcular = (cantidad, precio, descuento) => {
        try {
            if (isNaN(parseFloat(cantidad)) || isNaN(parseFloat(precio)) || isNaN(parseFloat(descuento))) {
                throw new Error('Los datos ingresados no son numéricos');

            }

            return (cantidad * precio * (1 - descuento / 100)).toFixed(2);
        } catch (error) {
            Alert.alert(error.message)
            return '0.00';
        }

    }


    const addDates = () => {
        if (valbuton(price, cantidad)) {
            const datos = { id: data.id, codigo: data.codigo, nombre: data.nombre, precio: price, cantidad: cantidad, descuento: descuento, total: calcular(cantidad, price, descuento) }
            setProductos([...productos, datos])
            navigation.navigate('Pedido')
        }
    }
    return (
        <View style={styles.home}>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text style={styles.txt} >Codigo: </Text>
                <Text style={[styles.txt, { borderBottomWidth: 1 }]} >{data.codigo}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text style={styles.txt}>Producto: </Text>
                <Text style={[styles.txt, { borderBottomWidth: 1 }]}>{data.nombre}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text style={styles.txt}>Precio</Text>
                <TextInput style={styles.txtinput} value={price} onChangeText={setPrice} selectTextOnFocus={true} keyboardType='numeric' />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text style={styles.txt}>Cantidad</Text>
                <TextInput style={styles.txtinput} value={cantidad} onChangeText={setCantidad} selectTextOnFocus={true} keyboardType='numeric' />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text style={styles.txt}>Descuento</Text>
                <TextInput style={styles.txtinput} value={descuento} onChangeText={setDescuento} selectTextOnFocus={true} keyboardType='numeric' />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text style={styles.txt}>Total  </Text>
             
                <TextInput style={[styles.txtinput,{color:'blue'}]} value={icoMon.toString()+calcular(cantidad, price, descuento).toString()} editable={false} />
            </View>
            <TouchableOpacity style={[styles.btn, valbuton(price, cantidad) ? styles.enable : styles.disabled]} onPress={() => addDates()} >
                <Text style={{ fontSize: 20 }}>Agregar</Text>
            </TouchableOpacity>
            {/* <ToastContainer/> */}
        </View>
    );
}
const styles = StyleSheet.create({
    home: {
        padding: 20,
        fontSize: 30,
        

    },
    txt: {
        fontSize: 15,
        color: '#000',
        width: '50%',
        paddingTop: 5,
        justifyContent: 'space-between',
        
    },
    txtinput: {
        fontSize: 22,
        borderWidth: 1,
        paddingTop: 5,
        marginTop: 10,
        width: "50%",
        textAlign: 'center',
        marginLeft: 12,
        borderRadius: 20


    },
    btn: {
        width: '100%',
        backgroundColor: '#abcdef',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop:12
    },
    enable: {
        opacity: 1,
    },
    disabled: {
        opacity: 0.5
    }
})
export default Select;