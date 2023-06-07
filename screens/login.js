import React,{useContext,useEffect,useState} from "react";
import { View,Text,TextInput,TouchableOpacity, Alert } from "react-native";
import { Contex } from "../components/global/globalContex";
import styles from "../components/styles/style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Query from "../data/querys";

function Login({navigation,route,props}){
    const globalContex = useContext(Contex);
    const {setIsLogin,setTipoCambio,dominio,setClientes,setAlmacenes,
        setUserLogged,setUbicacion,setPrecios,setCred,setTipoPago,setLocal,setAlm,setP,setEstado,setAprobacion} = globalContex;
    const [securePassword,setSecurePassword] = useState(true);
    const [ruc,setRuc] = useState('');
    const [usuario,setUsuario]=  useState('');
    const [password,setPassword]=  useState('');
    const checkTipoCambio=async ()=>{
        try {
            const fecha = new Date();
            const mes = (fecha.getMonth()+1).toString().padStart(2,'0')
            const fmt = `${fecha.getFullYear()}-${mes}-${fecha.getDate().toString().padStart(2,'0')}`
            
            const response = await fetch(`https://api.apis.net.pe/v1/tipo-cambio-sunat?fecha=${fmt}`
            );
            const data = await response.json({});
           
           setTipoCambio(data['venta'])
            
           
            
          } catch (error) {
            Alert.alert(title='Error',message=error.message);
            ()=>{}
            
          }
    }
    useEffect(()=>{
        checkLogin();
        checkTipoCambio();
    },[])
    async function apiRequest(dominio,ruc,usuario,password){
        try{
        const response =  await fetch(`${dominio}/api/login/${ruc}/${usuario}/${password}/`,{
            method:'GET',
        });
      
        const data = await response.json()
        
        return data;
    }catch(error){
        return ;
    }
    
    }


    const requestbis = async (res)=>{
        const urlclient = `${dominio}/api/client/${res.creden.bdhost}/${res.creden.bdname}/${res.creden.bduser}/${res.creden.bdpassword}/`
        const resclient = await Query(urlclient)
        if('message' in resclient){
            return Alert.alert(resclient.error);
        }
        const url = `${dominio}/api/pedidos/${res.creden.bdhost}/${res.creden.bdname}/${res.creden.bduser}/${res.creden.bdpassword}/`
        const data = await Query(url)
        setEstado(data.states)
        const state = await Query(`${dominio}/api/pedidos/state/${res.creden.bdhost}/${res.creden.bdname}/${res.creden.bduser}/${res.creden.bdpassword}/`)
        setAprobacion(state)
       
        setUserLogged(res.user)
        setAlmacenes(res.alms)
        setAlm(res.alms[0].codigo)
        setUbicacion(res.ubicacion)
        setLocal(res.ubicacion[0].codigo)
        setPrecios(res.precios)
        setP(res.precios[0].codigo)
        setCred(res.creden)
        setTipoPago(res.tipo_pago)
        setClientes(resclient)
        setIsLogin(true)
    }
    const checkLogin=async ()=>{
        try{
            const value = await AsyncStorage.getItem('token')
            if(value!=null){
                const {user,ruc,password} = JSON.parse(value);
                const res = await apiRequest(dominio,ruc,user,password)
              
                if (res.creden.status == false){
                    return Alert.alert('Tiene una deuda pendiente');
                }
                requestbis(res)
            }
            
        }catch{
            setIsLogin(false)
            }
        }
    const login = async()=>{

       
        
        try{
           
            const res = await apiRequest(dominio,ruc,usuario,password)
            if ('message' in res){
                return Alert.alert(res.message);
            }
            requestbis(res)
        
            const dataAsync = {
                user: usuario,
                ruc: res.creden.ruc,
                password:password,
            }
            await AsyncStorage.setItem('token',JSON.stringify(dataAsync))
            setIsLogin(true);
            
            
        
        }catch(error){
           
            Alert.alert('Ingrese todos los campos')
        }


    }
  

    return(
      
        <View style={styles.container}>
            <Text style={styles.h1}>Login</Text>
            <TextInput style={styles.txtinput}  placeholder="RUC"
                value={ruc} onChangeText={text=>setRuc(text)}
            />
            <TextInput style={styles.txtinput} 
              placeholder="Usuario"
            value={usuario} onChangeText={text=>setUsuario(text)}
            />
            <TextInput style={styles.txtinput} 
             secureTextEntry={securePassword} textContentType="password" autoCompleteType={true} setSecurePassword={true}
                placeholder="Password"
                value={password} onChangeText={text=>setPassword(text)}
                />
           
            <TouchableOpacity style={[styles.btnlogin,{marginTop:10}]} onPress={()=>login()}>
                <Text style={styles.txt}>Iniciar Sesion</Text>
            </TouchableOpacity>


        </View>
      
    );
}


export default Login;
