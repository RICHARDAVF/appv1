import React,{useContext} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import {Contex} from '../global/globalContex'
import Landing from '../../screens/landing'
import Login from '../../screens/login'

import MyDrawer from './drawer';
const Stack = createStackNavigator();
function Navigator(props){
    const globalContex = useContext(Contex);
    const {isLogin} = globalContex;
    
    return (
        <Stack.Navigator initialRouteName='Landing'>
            {(!isLogin)?
                <>
                    <Stack.Screen name='Landing' component={Landing} options={{headerShown:false}}/>
                    <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/> 
                </>
            :
            <Stack.Screen name='Inicio' component={MyDrawer} options={{headerShown:false}}/>

            }
        </Stack.Navigator>
    );
}
export default Navigator