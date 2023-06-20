
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import  Icon  from 'react-native-vector-icons/FontAwesome';
import { Contex } from '../../components/global/globalContex';
function EditarPedido({route}){
    const {item} = route.params;
    const navigation = useNavigation()
    const globalContex = useContext(Contex)
    const {dominio,cred,setProductos,setAlm,setLocal,setCliente,setDatosEdit,setEditPedido,setTipoP} = globalContex
    async function EditItem(item){
        
        const url = `${dominio}/api/pedidos/edit/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}/${item}/`
        const res = await fetch(url,{method:'GET'})
        const data = await res.json({})
        setEditPedido(false)
        setProductos(data.message.articulos)
        setAlm(data.message.cabepedido.almacen)
        setLocal(data.message.cabepedido.local)
        setTipoP(data.message.cabepedido.tipo_pago)
        setDatosEdit(data.message)
        setCliente({"nombre":data.message.cabepedido.cliente,"codigo":data.message.cabepedido.codigo_cliente,"ruc":data.message.cabepedido.ruc,"direccion":data.message.cabepedido.direccion})
        navigation.navigate('PedidoStack')
        
    }
    return (
        <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            <View style={styles.main}>
                <Text style={styles.txt}>Cliente</Text>
                <Text>{item.cliente}</Text>
                <Text style={styles.txt}>Sub Total</Text>
                <Text>{item.subtotal}</Text>
                <Text style={styles.txt}>IGV</Text>
                <Text>{item.igv}</Text>
                <Text style={styles.txt}>Total</Text>
                <Text>{item.total}</Text>
                {/* <TouchableOpacity onPress={()=>navigation.navigate('PedidoStack',{screen:'Carrito'})} > */}
                {(item.status=='PENDIENTE')?
                 <TouchableOpacity onPress={()=>EditItem(item.codigo_pedido)}>
                 <Icon name='edit' size={26} color='green' ></Icon>
                
             </TouchableOpacity>
             :
             <></>}
            </View>
            
        </View>
    );
}
export default EditarPedido;
const styles = StyleSheet.create({
    main :{
        borderWidth:1,
        width:'90%',
        borderRadius:10,
        alignContent:'center',
        alignItems:'center'
    },
    txt:{
        fontWeight:'bold'
    }
})