import { useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Contex } from "../../components/global/globalContex";
import { useNavigation } from "@react-navigation/native";
import { DataTable } from 'react-native-paper'
const Carrito = () => {
    const navigation = useNavigation();
    const globalContex = useContext(Contex);
    const { productos, setProductos, icoMon } = globalContex;

    function eliminar(index) {
        Alert.alert(
            'Confirmar',
            '¿Esta seguro(a) de eliminar el producto?',
            [
              {
                text: 'Cancelar',
                style: 'cancel',
              },
              {
                text: 'Aceptar',
                onPress: () => {
                    const newdata = [...productos]
                    newdata.splice(index, 1)
                    setProductos(newdata)
                },
              },
            ],
            { cancelable: false }
          );
        

    }


    function sumar() {
        var t = 0;
        for (item in productos) {
            t += parseFloat(productos[item].total);
        }
        return t.toFixed(2);

    }



    const validT = () => {
        if (sumar() > 0) {
            navigation.navigate('Final', { t: sumar() })
        } else {
            Alert.alert('No hay productos seleccionados')
        }

    }
    const renderItem = productos.map((value, index) => (
        <DataTable.Row key={index} style={{backgroundColor:(index%2)?'#f0ffff':'#fff8e7'}}>
            <DataTable.Cell style={{ width: 100 }}>
                <TouchableOpacity onPress={() => Alert.alert(title = 'Producto', message = value.nombre)}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>{value.codigo}</Text>
                </TouchableOpacity>

            </DataTable.Cell>
            <DataTable.Cell style={{ width: 100 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', paddingHorizontal: 10 }}>
                    <TouchableOpacity style={{ width: '50%' }} onPress={() => eliminar(index)}>
                        <Icon name="trash" size={20} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '50%' }} onPress={() => navigation.navigate('Edit', { data: value, index: index })}>
                        <Icon name="edit" size={20} color="green" />
                    </TouchableOpacity>
                </View>
            </DataTable.Cell>
            <DataTable.Cell style={{ width: 100 }}>{value.cantidad}</DataTable.Cell>
            <DataTable.Cell style={{ width: 100 }}>{icoMon}{value.precio}</DataTable.Cell>
            <DataTable.Cell style={{ width: 100 }}>{value.descuento}%</DataTable.Cell>
            <DataTable.Cell style={{ width: 100 }}>{icoMon}{value.total}</DataTable.Cell>
            <DataTable.Cell style={{ width: 250 }}>{value.nombre}</DataTable.Cell>
            
        </DataTable.Row>

    ))

    return (
        <View style={styles.container}>
            <View style={{height:'91%'}}>
                <ScrollView horizontal={true}>
                    <View >
                        <DataTable>
                            <DataTable.Header style={{backgroundColor:'#ffbf00'}}>
                                <DataTable.Title style={{ width: 100 }}>CODIGO</DataTable.Title>
                                <DataTable.Title style={{ width: 100 }}>OPCIONES</DataTable.Title>
                                <DataTable.Title style={{ width: 100 }}>CANTIDAD</DataTable.Title>
                                <DataTable.Title style={{ width: 100 }}>PRECIO/U</DataTable.Title>
                                <DataTable.Title style={{ width: 100 }}>DESC %</DataTable.Title>
                                <DataTable.Title style={{ width: 100 }}>TOTAL {icoMon}</DataTable.Title>
                                <DataTable.Title style={{ width: 250 }}>PRODUCTO</DataTable.Title>
                            </DataTable.Header>

                        </DataTable>
                        <ScrollView>
                            <View>
                                {renderItem}
                            </View>
                        </ScrollView>

                    </View>
                </ScrollView>
            </View>
            <View style={{ height: "10%", justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={[styles.btnsave, (sumar() > 0) ? styles.enable : styles.disabled]} onPress={() => validT()}>
                    <Text style={{ fontSize: 22 }}>Continuar</Text>
                    <Text style={{ fontSize: 22, borderWidth: 1, backgroundColor: '#00e277' }}>Total {icoMon}: {sumar()}</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'fff1',
    },
    element: {
        width: "100%",

    },
    btnsave: {
        backgroundColor: 'cyan',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        height: 43,
        justifyContent: 'space-between',
        paddingHorizontal: 30
    },
    enable: {
        opacity: 1,
    },
    disabled: {
        opacity: 0.5
    }

});
export default Carrito;