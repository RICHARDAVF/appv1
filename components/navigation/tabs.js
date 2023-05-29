import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NotaPedido from '../../screens/notapedido/nota-pedido'

import Carrito from "../../screens/notapedido/carrito";
import Icon from 'react-native-vector-icons/FontAwesome';
const Tabs = createBottomTabNavigator()
export const NotaPedidoTabs=()=>{
    return (
        <Tabs.Navigator 
        screenOptions={({route})=>({
            headerShown:false,
            tabBarShowLabel:false,
            tabBarStyle:{backgroundColor:'black'},
            tabBarActiveTintColor:'green',
           
            tabBarIcon:({focused,color,size})=>{
                let iconName;
                if(route.name==='NotaPedido'){
                    iconName=focused?'toggle-on':'toggle-off'
                }
                else if(route.name==='Carrito'){
                    iconName=focused?'shopping-cart':'shopping-cart'
                }
                return <Icon name={iconName} size={focused? 35:size} color={color}/>
            }
            
        })}
        >
            
            <Tabs.Screen 
            name="NotaPedido" 
            component={NotaPedido}
            options={{title:'Lista De Productos'}}
            />
            <Tabs.Screen 
            name="Carrito" 
            component={Carrito}
            options={{title:'Carrito'}}
            />
            
        </Tabs.Navigator> 
    );
}