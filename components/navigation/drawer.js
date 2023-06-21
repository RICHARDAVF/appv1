import { DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { Image, Linking, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useContext } from 'react';
import { Contex } from '../global/globalContex';
import { AprobacionStack, CuentaStack, EstadoPstack, HomeStack, PedidoStack } from './stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const globalContex = useContext(Contex)
  const {setIsLogin,userLogged,setData,setProductos,setCliente,setAprobacion} = globalContex;
  const handleLogout = ()=>{
    setIsLogin(false)
    setData([])
    setProductos([])
    setCliente({})
    AsyncStorage.removeItem('token')
  }
    return (

      <Drawer.Navigator
        drawerContent={(props)=>{
          return (
            <SafeAreaView style = {{flex:1,paddingTop:20}}>
              <ScrollView>
              <View>
                <Image style = {{resizeMode:'contain',width:'100%'}} source={require('../../assets/logo.png')} />
                <Text style={{marginLeft:10}}>Vendedor: {userLogged.usuario}</Text>
                <Text style={{marginLeft:10}}>Version: 1.17.05</Text>

              </View>
              <DrawerItemList {...props}/>
              <DrawerItem
              label='Informacion'
              onPress={()=>Linking.openURL('https://www.noisystems.com/')}
              icon={()=><Icon name='info-circle' size={22}/>}
              />
              <DrawerItem
              label='Logout'
              onPress={()=>handleLogout()}
              icon={()=><Icon name='sign-out' size={22}/>}
              />
              </ScrollView>
            </SafeAreaView>
          );
      }}
      screenOptions={{
        headerShown:false,
      }}
      >
      <Drawer.Screen
      name='HomeStack'
      component={HomeStack}
      options={{title:'Inicio',drawerIcon:()=><Icon name='home' size={22}/>}}
      />

      {/* <Drawer.Screen
      name='CotizacionStack'
      component={''}
      options={{title:'Cotizacion',drawerIcon:()=><Icon name="file" size={22} color="black" />}}
      /> */}
      <Drawer.Screen
      name='PedidoStack'
      component={PedidoStack}
      

      options={{title:'Nota de Pedido',drawerIcon:()=><Icon name='shopping-bag' size={22}/>}}
     
      />
      
    <Drawer.Screen
    name='EstadoPStack'
    component={EstadoPstack}
    options={{title:'Estado de Pedido',drawerIcon:()=><Icon name="truck" size={22} color="black" />}}
    />
 
    <Drawer.Screen
    name='AprobacionStack'
    component={AprobacionStack}
    options={{title:'Aprobacion de Pedido',drawerIcon:()=><Icon name='check-square-o' size={22}/>}}
    />
    <Drawer.Screen
    name='CuentasStack'
    component={CuentaStack}
    options={{title:'Cuentas por Cobrar',drawerIcon:()=><Icon name='fax' size={22}/>}}
    />
       {/*
    <Drawer.Screen
    name='Facturacion'
    component={''}
    options={{title:'Facturacion Electronica',drawerIcon:()=><Icon name='toggle-on' size={22}/>}}
    />
    <Drawer.Screen
    name='EstadoDocsStack'
    component={''}
    options={{title:'Estado de Documentos',drawerIcon:()=><Icon name='toggle-on' size={22}/>}}
    />
    
    <Drawer.Screen
    name='VentasStack'
    component={''}
    options={{title:'Registro de Ventas',drawerIcon:()=><Icon name='toggle-on' size={22}/>}}
    />
    <Drawer.Screen
    name='VentaSTabsStack'
    component={''}
    options={{title:'Ventas Tabuladas',drawerIcon:()=><Icon name='toggle-on' size={22}/>}}
    /> */}
      </Drawer.Navigator>
    );
  }
  export default MyDrawer;