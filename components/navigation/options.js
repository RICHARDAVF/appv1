import Icon from 'react-native-vector-icons/FontAwesome';
export const navOptions = (nav)=>{
    return{
        headerTintColor:'#cbd5e1',
        headerStyle:{
            backgroundColor:'#0f172a'
        },
        headerRight:()=>(
            <Icon
            name="bars"
            size={32}
            color="white"
            onPress={()=>nav.toggleDrawer()}
            />
        ),
        
        
       
    };
}