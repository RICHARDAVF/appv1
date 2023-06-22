import { useState,useEffect } from "react";
import { View ,StyleSheet,TextInput,TouchableOpacity,Text} from "react-native";
import ListClient from "../../components/base/list-client";
import { useContext } from "react";
import { Contex } from "../../components/global/globalContex";
import Icon from 'react-native-vector-icons/FontAwesome';
import Query from "../../data/querys";
export default function ClientList(){
    const globalContex = useContext(Contex)
    const {clientes,setClientes,dominio,cred} = globalContex;
    const [searchClient,setSearchClient] = useState('')
    
    useEffect(()=>{
        requestData()
    },[])
    function buscador(palabra){
        
        const dataresult = clientes.filter(item => item.nombre.includes(palabra.toUpperCase()))
        setClientes(dataresult)
    }
    async function requestData(){
        const urlclient = `${dominio}/api/client/${cred.bdhost}/${cred.bdname}/${cred.bduser}/${cred.bdpassword}/`
        const resclient = await Query(urlclient)
        setClientes(resclient)
    } 
    return (
        <View style={{flex:1}}>
            <View style={styles.panelClient}>
                <TextInput placeholder="Buscar Cliente" value={searchClient} onChangeText={setSearchClient} style={{paddingRight:30,borderBottomWidth:1,width:'50%'}}/>
                <TouchableOpacity style={{paddingRight:30}} onPress={()=>buscador(searchClient)}>
                    <Icon name="search" size={25}/>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingRight:30}} onPress={()=>requestData()}>
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