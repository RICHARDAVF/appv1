import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navOptions } from "./options";
import Home from "../../screens/home";
import ClientList from "../../screens/client/client";
import Select from "../../screens/select-product";
import { NotaPedidoTabs } from "./tabs";
import Carrito from "../../screens/notapedido/carrito";
import Modals from "../base/modal";
import Methods from "../../screens/notapedido/methods";
import StateP from "../../screens/estado-pedido/state";
import Aprobacion from "../../screens/estado-pedido/aprobacion-pedido";




const Stack = createStackNavigator()
export const HomeStack =()=>{
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={()=>navOptions(navigation)}>
            <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
    );
}

export const PedidoStack = ()=>{
    const navigation = useNavigation();
    return (
    <Stack.Navigator screenOptions={()=>navOptions(navigation)}>
            <Stack.Screen name="Pedido" component={NotaPedidoTabs} options={{title:'Nota de Pedido',headerTitleAlign:'center'}}/>
            <Stack.Screen name="Select" component={Select} options={{title:'Producto Seleccionado',headerTitleAlign:'center'}}/>
            <Stack.Screen name="Cliente" component={ClientList} options={{title:'Lista de  Clientes',headerTitleAlign:'center'}}/>
            <Stack.Screen name="Carrito" component={Carrito}  options={{title:'Carrito',headerTitleAlign:'center'}} />
            <Stack.Screen name="Edit" component={Modals} options={{title:'Edicion de un Item',headerTitleAlign:'center'}}/>
            <Stack.Screen name="Final" component={Methods} options={{title:'Paso Final',headerTitleAlign:'center'}}/>
    </Stack.Navigator>
    );
}
export const EstadoPstack = ()=>{
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={()=>navOptions(navigation)}>
            <Stack.Screen name = 'EstadoP' component={StateP} options={{title:'Estado de Pedido'}}/>
        </Stack.Navigator>
        
    );
}
export const AprobacionStack = ()=>{
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={()=>navOptions(navigation)}>
            <Stack.Screen name = 'Aprobacion' component={Aprobacion} options={{title:'Aprobacion de Pedido'}}/>
        </Stack.Navigator>
        
    );
}
