import { useState,useEffect } from "react";
import { View ,StyleSheet,TextInput,TouchableOpacity,Text} from "react-native";

import ListClient from "../../components/base/list-client";
import { useContext } from "react";
import { Contex } from "../../components/global/globalContex";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ClientList(){
    const globalContex = useContext(Contex)
    const {clientes,setClientes} = globalContex;
    const [searchClient,setSearchClient] = useState('')
    const [datacopy,setDataCopy] = useState([])
    useEffect(()=>{
        setDataCopy([...clientes])
        if(searchClient.length==0){
            setClientes(clientes)
        }
    },[])
    function buscador(palabra){
        
        const dataresult = datacopy.filter(item => item.nombre.includes(palabra));

        setClientes(dataresult)
    }
    return (
        <View style={{flex:1}}>
            <View style={styles.panelClient}>
                <TextInput placeholder="Buscar Cliente" value={searchClient} onChangeText={setSearchClient} style={{paddingRight:30,borderBottomWidth:1,width:'50%'}}/>
                <TouchableOpacity style={{paddingRight:30}} onPress={()=>buscador(searchClient)}>
                    <Icon name="search" size={25}/>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingRight:30}} onPress={()=>buscador(searchClient)}>
                    <Text>
                        <Icon name="refresh" size={25} color='blue'/>
                    </Text>
                </TouchableOpacity>
            </View>

            <ListClient data={clientes}/>
        </View>
    );
}
const styles = StyleSheet.create({
    panelClient:{
        width:"100%",
        backgroundColor:'#e8f3ff',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:10,
        paddingBottom:10,
        paddingHorizontal:20
    }
});