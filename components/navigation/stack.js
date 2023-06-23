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
import EditarPedido from "../../screens/estado-pedido/editar-pedido";
import EventAprobacion from "../../screens/estado-pedido/event-aprobacion";
import ListCuentas from "../../screens/cuentas-cobrar/cuentas";
import SelectCuenta from "../../screens/cuentas-cobrar/select-cuenta";
import ItemDetalleDoc from "../../screens/cuentas-cobrar/detalle-items";
import MyComponent from "../../screens/orden-reque/orden";

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
            <Stack.Screen name='EditarPedido' component={EditarPedido} options={{title:'Edicion de Pedido'}}/>
        </Stack.Navigator>
        
    );
}
export const AprobacionStack = ()=>{
    const navigation = useNavigation();
    
 
    return (
        <Stack.Navigator  screenOptions={()=>navOptions(navigation)}>
            <Stack.Screen name = 'Aprobacion' component={Aprobacion} options={{title:'Aprobacion de Pedido'}}/>
            <Stack.Screen name = 'EventApro' component={EventAprobacion} options={{title:'Aprobar'}}/>
        </Stack.Navigator>
        
    );
}
export const CuentaStack = ()=>{
    const navigation = useNavigation()
    return (
        <Stack.Navigator screenOptions={()=>navOptions(navigation)}>
            <Stack.Screen name="Cuentas" component={ListCuentas} options={{title:"Cuentas Por Cobrar"}}/>
            <Stack.Screen name="SelectCuenta" component={SelectCuenta} options={{title:"Detalles"}}/>
            <Stack.Screen name="DocumDetalle" component={ItemDetalleDoc} options={{title:"Detalle del Documento"}}/>
        </Stack.Navigator>
    )
}
export const OrderRequeStack =()=>{
    const navigation = useNavigation()
    return(
        <Stack.Navigator screenOptions={()=>navOptions(navigation)}>
            <Stack.Screen name="Orden" component={MyComponent} options={{title:'orden'}}/>

        </Stack.Navigator>
    )
}